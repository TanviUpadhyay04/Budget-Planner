import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const BudgetSummary = ({ nextStep, prevStep, formData }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [convertedIncome, setConvertedIncome] = useState(formData.monthlyIncome);
  const [convertedExpenses, setConvertedExpenses] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(formData.preferredCurrency);

  useEffect(() => {
    const total = formData.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(total);
  }, [formData]);

  const remainingBudget = convertedIncome - convertedExpenses;

  const fetchConversionRate = useCallback(async (currency) => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${formData.preferredCurrency}`);
      const rate = response.data.rates[currency];
      return rate;
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      return 1; 
    }
  }, [formData.preferredCurrency]);

  const handleCurrencyChange = async (event) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
    const rate = await fetchConversionRate(currency);
    setConvertedIncome(formData.monthlyIncome * rate);
    setConvertedExpenses(totalExpenses * rate);
  };

  useEffect(() => {
    const initializeConversion = async () => {
      const initialRate = await fetchConversionRate(selectedCurrency);
      setConvertedIncome(formData.monthlyIncome * initialRate);
      setConvertedExpenses(totalExpenses * initialRate);
    };
    initializeConversion();
  }, [formData, selectedCurrency, totalExpenses, fetchConversionRate]);

  return (
    <div className="form-content">
      <h2>Budget Summary</h2>
      <label>
        Select Currency:
        <select value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          
        </select>
      </label>
      <p>Total Income: {convertedIncome.toFixed(2)} {selectedCurrency}</p>
      <p>Total Expenses: {convertedExpenses.toFixed(2)} {selectedCurrency}</p>
      <p>Remaining Budget: {remainingBudget.toFixed(2)} {selectedCurrency}</p>

      <div className="button-container">
        <button onClick={prevStep} className="prev-button">Back</button>
        <button onClick={nextStep} className="next-button">Next</button>
      </div>
    </div>
  );
};

export default BudgetSummary;
