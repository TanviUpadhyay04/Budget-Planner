import React from 'react';
import ParticleComponent from './components/ParticleComponent';
import BudgetForm from './components/BudgetForm';
import './App.css'; 

const App = () => {
  return (
    <div className="app-container">
      <ParticleComponent id="tsparticles" />
      <div className="card-container">
        <BudgetForm />
      </div>
    </div>
  );
};

export default App;
