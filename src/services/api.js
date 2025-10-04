// API service to connect React frontend to Python backend
const API_BASE_URL = 'http://localhost:8000';

class RetirementAPI {
  // Health check
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'unhealthy', error: error.message };
    }
  }

  // Analyze retirement readiness
  async analyzeRetirement(userData) {
    try {
      // Ensure all required fields have default values and handle NaN values
      const requestData = {
        age: userData.age || 30,
        retirement_age: userData.retirementAge || 65,
        annual_income: (userData.monthlyIncome || 0) * 12,
        monthly_expenses: userData.monthlyExpenses || 0,
        current_savings: userData.currentSavings || 0,
        monthly_savings: userData.monthlySavings || 0,
        retirement_goal: userData.retirementGoal || 1000000,
        expected_inflation: userData.expectedInflation || 3.0,
        expected_returns: userData.expectedReturns || 6.0,
        employer_match: userData.employerMatch || 0,
        social_security_estimate: userData.socialSecurity || 0,
        other_income: userData.otherIncome || 0
      };

      // Convert any NaN values to 0
      Object.keys(requestData).forEach(key => {
        if (isNaN(requestData[key])) {
          requestData[key] = 0;
        }
      });

      console.log('Sending data to backend:', requestData);

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Analysis failed:', error);
      console.error('User data sent:', userData);
      throw error;
    }
  }

  // Get strategy suggestions
  async getSuggestions(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: userData.age,
          retirement_age: userData.retirementAge,
          annual_income: userData.monthlyIncome * 12,
          monthly_expenses: userData.monthlyExpenses,
          current_savings: userData.currentSavings,
          monthly_savings: userData.monthlySavings,
          retirement_goal: userData.retirementGoal,
          expected_inflation: userData.expectedInflation || 3.0,
          expected_returns: userData.expectedReturns || 6.0,
          employer_match: userData.employerMatch || 0,
          social_security_estimate: userData.socialSecurity || 0,
          other_income: userData.otherIncome || 0
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Suggestions failed:', error);
      throw error;
    }
  }

  // Run simulation
  async runSimulation(userData, modifiedParams) {
    try {
      const response = await fetch(`${API_BASE_URL}/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: {
            age: userData.age,
            retirement_age: userData.retirementAge,
            annual_income: userData.monthlyIncome * 12,
            monthly_expenses: userData.monthlyExpenses,
            current_savings: userData.currentSavings,
            monthly_savings: userData.monthlySavings,
            retirement_goal: userData.retirementGoal,
            expected_inflation: userData.expectedInflation || 3.0,
            expected_returns: userData.expectedReturns || 6.0,
            employer_match: userData.employerMatch || 0,
            social_security_estimate: userData.socialSecurity || 0,
            other_income: userData.otherIncome || 0
          },
          modified_parameters: modifiedParams,
          simulation_type: 'parameter_modification'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Simulation failed:', error);
      throw error;
    }
  }
}

export default new RetirementAPI();
