import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../services/firebase';
import { format } from 'date-fns';

interface SensorData {
  temperature: number;
  heartRate: number;
  hrv: number;
  emg: number;
  temperatureHistory: number[];
  heartRateHistory: number[];
  hrvHistory: number[];
  emgHistory: number[];
  timeLabels: string[];
  lastUpdate: string;
}

export function useSensorData() {
  const [data, setData] = useState<SensorData>({
    temperature: 0,
    heartRate: 0,
    hrv: 0,
    emg: 0,
    temperatureHistory: Array(10).fill(0),
    heartRateHistory: Array(10).fill(0),
    hrvHistory: Array(10).fill(0),
    emgHistory: Array(10).fill(0),
    timeLabels: Array(10).fill(''),
    lastUpdate: format(new Date(), 'HH:mm:ss')
  });

  useEffect(() => {
    console.log('Setting up Firebase listener...');
    const sensorsRef = ref(db, 'sensors');
    
    const unsubscribe = onValue(sensorsRef, (snapshot) => {
      console.log('Received Firebase update:', snapshot.val());
      const sensorData = snapshot.val();
      
      if (sensorData) {
        const fahrenheit = (sensorData.temperature * 9/5) + 32;
        const now = format(new Date(), 'HH:mm:ss');

        setData(prevData => {
          const newHrv = Math.abs(sensorData.heartRate - prevData.heartRate) * 10;
          
          return {
            temperature: parseFloat(fahrenheit.toFixed(1)),
            heartRate: sensorData.heartRate,
            hrv: Math.round(newHrv),
            emg: sensorData.emg,
            temperatureHistory: [...prevData.temperatureHistory.slice(1), fahrenheit],
            heartRateHistory: [...prevData.heartRateHistory.slice(1), sensorData.heartRate],
            hrvHistory: [...prevData.hrvHistory.slice(1), newHrv],
            emgHistory: [...prevData.emgHistory.slice(1), sensorData.emg],
            timeLabels: [...prevData.timeLabels.slice(1), now],
            lastUpdate: now
          };
        });
      }
    }, (error) => {
      console.error('Firebase error:', error);
    });

    return () => {
      console.log('Cleaning up Firebase listener...');
      unsubscribe();
    };
  }, []);

  const exportData = () => {
    const csvContent = [
      ['Timestamp', 'Temperature (°F)', 'Heart Rate (BPM)', 'HRV (ms)', 'EMG (μV)'],
      ...data.timeLabels.map((time, index) => [
        time,
        data.temperatureHistory[index],
        data.heartRateHistory[index],
        data.hrvHistory[index],
        data.emgHistory[index]
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sensor-data-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return { data, exportData };
}