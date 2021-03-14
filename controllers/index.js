const router = require('express').Router();

const apiRoutes = require('./api/');
const homePageRoutes = require('./homepage-routes.js');
const dashboardPageRoutes = require('./dashboardpage-routes.js');

router.use('/', homePageRoutes);
router.use('/dashboard', dashboardPageRoutes);
router.use('/api', apiRoutes);

module.exports = router;
