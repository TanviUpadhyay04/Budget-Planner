import React, { useState } from 'react';

const IncomeExpenses = ({ nextStep, prevStep, handleChange, formData }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const addExpense = (e) => {
    e.preventDefault();
    if (expenseName && expenseAmount) {
      handleChange({ expenses: [...formData.expenses, { name: expenseName, amount: Number(expenseAmount) }] });
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const removeExpense = (index) => {
    const updatedExpenses = formData.expenses.filter((_, i) => i !== index);
    handleChange({ expenses: updatedExpenses });
  };

  return (
    <div className="form-content">
      <h2>Income and Expenses</h2>
      <div className="form-group">
        <label htmlFor="monthlyIncome">Monthly Income</label>
        <input
          type="number"
          id="monthlyIncome"
          placeholder="Monthly Income"
          value={formData.monthlyIncome}
          onChange={(e) => handleChange({ monthlyIncome: Number(e.target.value) })}
          required
        />
      </div>
      <form onSubmit={addExpense} className="expense-form">
        <div className="form-group">
          <label htmlFor="expenseName">Expense Name</label>
          <input
            type="text"
            id="expenseName"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expenseAmount">Expense Amount</label>
          <input
            type="number"
            id="expenseAmount"
            placeholder="Expense Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-button">Add Expense</button>
      </form>
      <ul>
        {formData.expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: {expense.amount}
            <button onClick={() => removeExpense(index)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={prevStep} className="prev-button">Back</button>
        <button onClick={nextStep} className="next-button">Next</button>
      </div>
    </div>
  );
};

export default IncomeExpenses;
