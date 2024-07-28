import React from 'react';

const Review = ({ formData, prevStep }) => {
  return (
    <div className="form-content">
      <h2>Review Your Information</h2>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Preferred Currency: {formData.preferredCurrency}</p>
      <p>Monthly Income: {formData.monthlyIncome}</p>
      <h3>Expenses:</h3>
      <ul>
        {formData.expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: {expense.amount}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={prevStep} className="prev-button">Back</button>
        <button onClick={() => alert('Budget data saved!')} className="save-button">Save</button>
      </div>
    </div>
  );
};

export default Review;
