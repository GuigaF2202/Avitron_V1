const { query } = require('../config/database');
const { logger } = require('../utils/logger');
const opensimService = require('../services/opensimService');

// Get dashboard stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get online users count
    const onlineUsersResult = await query('SELECT COUNT(*) FROM users WHERE online = true');
    const onlineUsers = parseInt(onlineUsersResult.rows[0].count);
    
    // Get active regions count
    const activeRegionsResult = await query('SELECT COUNT(*) FROM regions WHERE status = \'online\'');
    const activeRegions = parseInt(activeRegionsResult.rows[0].count);
    
    // Get economy stats
    const economyResult = await query('SELECT SUM(balance) FROM accounts');
    const currency = parseInt(economyResult.rows[0].sum);
    
    // Get assets count
    const assetsResult = await query('SELECT COUNT(*) FROM assets');
    const totalAssets = parseInt(assetsResult.rows[0].count);
    
    // Get regions with most users
    const regionsQuery = `
      SELECT r.id, r.name, r.x, r.y, COUNT(u.id) as user_count
      FROM regions r
      LEFT JOIN users u ON u.region_id = r.id AND u.online = true
      WHERE r.status = 'online'
      GROUP BY r.id, r.name
      ORDER BY user_count DESC
      LIMIT 20
    `;
    const regionsResult = await query(regionsQuery);
    
    // Get recent activities
    const activitiesQuery = `
      SELECT a.id, a.activity_type, a.description, a.created_at, u.firstname, u.lastname
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `;
    const activitiesResult = await query(activitiesQuery);
    
    // Get user trends (last 7 days)
    const userTrendsQuery = `
      SELECT 
        DATE(login_time) as date,
        COUNT(DISTINCT user_id) as unique_users
      FROM user_sessions
      WHERE login_time > NOW() - INTERVAL '7 days'
      GROUP BY date
      ORDER BY date
    `;
    const userTrendsResult = await query(userTrendsQuery);
    
    // Get system health
    const systemHealth = [
      { name: 'CPU Usage', percentage: 45, status: 'good' },
      { name: 'Memory Usage', percentage: 62, status: 'good' },
      { name: 'Database', percentage: 38, status: 'good' },
      { name: 'Network', percentage: 85, status: 'warning' },
      { name: 'Storage', percentage: 70, status: 'good' }
    ];
    
    // Mock data for change percentages
    const userChange = 5.2;
    const regionChange = 1.8;
    const economyChange = -2.5;
    const assetChange = 10.3;
    
    res.status(200).json({
      onlineUsers,
      activeRegions,
      currency,
      totalAssets,
      userChange,
      regionChange,
      economyChange,
      assetChange,
      regions: regionsResult.rows,
      recentActivities: activitiesResult.rows,
      userTrends: userTrendsResult.rows,
      systemHealth
    });
  } catch (error) {
    logger.error(`Error fetching dashboard stats: ${error.message}`);
    next(error);
  }
};

// Get grid status
exports.getGridStatus = async (req, res, next) => {
  try {
    const status = await opensimService.getGridStatus();
    res.status(200).json(status);
  } catch (error) {
    logger.error(`Error fetching grid status: ${error.message}`);
    next(error);
  }
};