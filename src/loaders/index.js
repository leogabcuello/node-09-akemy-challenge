const ExpressServer = require('./server/expressServer');
const mongoose = require('./mongoose');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {
    
    await mongoose();
    logger.info('DB loader and connected');

    const server = new ExpressServer();
    logger.info('Express loader');

    server.start();
    logger.info(`server listening on port ${config.port}`);

}