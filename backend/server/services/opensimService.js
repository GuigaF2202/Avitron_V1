const axios = require('axios');
const { logger } = require('../utils/logger');

class OpenSimService {
  constructor() {
    this.baseUrl = process.env.OPENSIM_API_URL;
    this.apiKey = process.env.OPENSIM_API_KEY;
  }
  
  async makeRequest(endpoint, method = 'GET', data = null) {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const config = {
        method,
        url,
        headers: {
          'X-API-Key': this.apiKey,
          'Content-Type': 'application/json'
        },
        data: data ? JSON.stringify(data) : undefined
      };
      
      const response = await axios(config);
      return response.data;
    } catch (error) {
      logger.error(`OpenSim API error: ${error.message}`);
      throw new Error(`OpenSim service error: ${error.message}`);
    }
  }
  
  // Get grid status
  async getGridStatus() {
    return this.makeRequest('grid/status');
  }
  
  // Get online users
  async getOnlineUsers() {
    return this.makeRequest('grid/users/online');
  }
  
  // Get region info
  async getRegionInfo(regionId) {
    return this.makeRequest(`grid/region/${regionId}`);
  }
  
  // Get all regions
  async getAllRegions() {
    return this.makeRequest('grid/regions');
  }
  
  // Restart region
  async restartRegion(regionId) {
    return this.makeRequest(`grid/region/${regionId}/restart`, 'POST');
  }
  
  // Get user profile
  async getUserProfile(userId) {
    return this.makeRequest(`grid/user/${userId}/profile`);
  }
  
  // Ban user
  async banUser(userId, reason, duration) {
    const data = { reason, duration };
    return this.makeRequest(`grid/user/${userId}/ban`, 'POST', data);
  }
  
  // Get economy stats
  async getEconomyStats() {
    return this.makeRequest('grid/economy/stats');
  }
  
  // Add currency to user
  async addCurrency(userId, amount, description) {
    const data = { amount, description };
    return this.makeRequest(`grid/economy/user/${userId}/add`, 'POST', data);
  }
}

module.exports = new OpenSimService();