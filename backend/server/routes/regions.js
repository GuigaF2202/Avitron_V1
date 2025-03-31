const express = require('express');
const router = express.Router();
const regionsController = require('../controllers/regionsController');
const { authenticate, authorize } = require('../middleware/auth');

// Get all regions
router.get('/', authenticate, regionsController.getAllRegions);

// Get single region
router.get('/:id', authenticate, regionsController.getRegionById);

// Create new region
router.post('/', authenticate, authorize(['admin']), regionsController.createRegion);

// Update region
router.put('/:id', authenticate, authorize(['admin']), regionsController.updateRegion);

// Delete region
router.delete('/:id', authenticate, authorize(['admin']), regionsController.deleteRegion);

// Restart region
router.post('/:id/restart', authenticate, authorize(['admin']), regionsController.restartRegion);

// Get region users
router.get('/:id/users', authenticate, regionsController.getRegionUsers);

// Get region stats
router.get('/:id/stats', authenticate, regionsController.getRegionStats);

module.exports = router;