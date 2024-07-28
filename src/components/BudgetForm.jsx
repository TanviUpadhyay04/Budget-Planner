import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import IncomeExpenses from './IncomeExpenses';
import BudgetSummary from './BudgetSummary';
import Review from './Review';

const BudgetForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem('budgetData')) || {
      name: '',
      email: '',
      preferredCurrency: 'USD',
      monthlyIncome: 0,
      expenses: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleChange = (data) => setFormData((prev) => ({ ...prev, ...data }));

  return (
    <div className="budget-form">
      <div className="steps">
        <div className={`step ${step === 1 ? 'active' : ''}`}>STEP 1<br/>YOUR INFO</div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>STEP 2<br/>INCOME & EXPENSES</div>
        <div className={`step ${step === 3 ? 'active' : ''}`}>STEP 3<br/>BUDGET SUMMARY</div>
        <div className={`step ${step === 4 ? 'active' : ''}`}>STEP 4<br/>REVIEW</div>
      </div>
      <div className="form-content">
        {step === 1 && <UserInfo nextStep={nextStep} handleChange={handleChange} formData={formData} />}
        {step === 2 && <IncomeExpenses nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
        {step === 3 && <BudgetSummary nextStep={nextStep} prevStep={prevStep} formData={formData} />}
        {step === 4 && <Review formData={formData} prevStep={prevStep} />}
      </div>
    </div>
  );
};

export default BudgetForm;
