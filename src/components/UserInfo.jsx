import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ nextStep, handleChange, formData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="user-info-form">
      <h2 className="form-title">Personal info</h2>
      <p className="form-subtitle">Please provide your name, email address, and preferred currency.</p>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Vanessa Mint"
          value={formData.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="e.g. vanessamint@domain.com"
          value={formData.email}
          onChange={(e) => handleChange({ email: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="currency">Preferred Currency</label>
        <select
          id="currency"
          value={formData.preferredCurrency}
          onChange={(e) => handleChange({ preferredCurrency: e.target.value })}
          required
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        
        </select>
      </div>
      <div className="button-container">
        <button type="submit" className="next-button">Next Step</button>
      </div>
    </form>
  );
};

UserInfo.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    preferredCurrency: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfo;
