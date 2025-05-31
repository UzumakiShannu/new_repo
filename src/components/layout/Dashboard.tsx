import React from 'react';
import { SensorCard } from '../cards/SensorCard';
import { useSensorData } from '../../hooks/useSensorData';
import { Download, Sun, Moon } from 'lucide-react';

interface DashboardProps {
  patientName: string;
  patientAge: number;
}

export function Dashboard({ patientName, patientAge }: DashboardProps) {
  const { data, exportData } = useSensorData();
  const [darkMode, setDarkMode] = React.useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HARMONIC AURA
              </h1>
              <div className="mt-4 bg-gray-800 rounded-lg p-4 text-white">
                <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">Name</p>
                    <p className="font-medium">{patientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Age</p>
                    <p className="font-medium">{patientAge} years</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Updated</p>
                    <p className="font-medium">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors text-white"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Export Data
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SensorCard
            title="Temperature"
            value={data.temperature}
            unit="°F"
            data={data.temperatureHistory}
            labels={data.timeLabels}
            color="#4361EE"
          />
          <SensorCard
            title="Heart Rate"
            value={data.heartRate}
            unit="bpm"
            data={data.heartRateHistory}
            labels={data.timeLabels}
            color="#F72585"
          />
          <SensorCard
            title="HRV"
            value={data.hrv}
            unit="ms"
            data={data.hrvHistory}
            labels={data.timeLabels}
            color="#7209B7"
          />
          <SensorCard
            title="EMG"
            value={data.emg}
            unit="μV"
            data={data.emgHistory}
            labels={data.timeLabels}
            color="#4CC9F0"
          />
        </div>
      </div>
    </div>
  );
}