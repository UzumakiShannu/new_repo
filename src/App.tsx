import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PatientForm } from './components/layout/PatientForm';
import { Dashboard } from './components/layout/Dashboard';

interface PatientData {
  name: string;
  age: number;
}

function App() {
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const handlePatientSubmit = (data: PatientData) => {
    setPatientData(data);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <PatientForm onSubmit={handlePatientSubmit} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            patientData ? (
              <Dashboard 
                patientName={patientData.name} 
                patientAge={patientData.age} 
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;