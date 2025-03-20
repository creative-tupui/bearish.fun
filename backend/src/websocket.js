const axios = require('axios');
const { handleBetTransaction } = require('./services/solanaService');
const config = require('./config');
const logger = require('./utils/logger');
const Result = require('./models/Result');

let latestPrice = null;
let periodStartTime = Date.now();
let cycleStartPrice = 0;
const periodDuration = 30000; // 30 seconds
let remainingTime = periodDuration / 1000;
async function fetchBitcoinPrices() {
  try {
    const response = await axios.get(config.binanceApiUrl);
    const prices = response.data.map(price => parseFloat(price[4]));
    return prices;
  } catch (error) {
    logger.error('Error fetching Bitcoin price:', error);
    return null;
  }
}

function setupWebSocket(io) {
  io.on('connection', async (socket) => {
    logger.info('Client connected');
    
    // Handle betting
    socket.on('bet', async (data) => {
      try {
        const { direction, amount, wallet } = data;
        const result = await handleBetTransaction(direction, amount, wallet);
        socket.emit('betResult', result);
      } catch (error) {
        logger.error('Bet error:', error);
        socket.emit('betError', { message: 'Failed to process bet' });
      }
    });

    socket.on('startNewPeriod', (currentPrice) => {
      cycleStartPrice = currentPrice;
      periodStartTime = Date.now();
      socket.emit('periodStarted', { remainingTime: periodDuration / 1000, result: null }); // Send initial remaining time and result
    });

    socket.on('disconnect', () => {
      logger.info('Client disconnected');
    });
  });
  setInterval(async () => {
    const prices = await fetchBitcoinPrices();
    io.emit('prices', prices);
    latestPrice = prices[prices?.length - 1];
    if(remainingTime > 0){
      io.emit('updateRemainingTime', { remainingTime: Math.floor(remainingTime) }); // Send as an integer
    }
  }, 100);
  setInterval(async () => {
    const data = await Result.find().sort({ timestamp: -1 }).limit(10).select('result');
    const betResult = data.map(item => item.result);
    io.emit('betResultStartPrice', {betResult, cycleStartPrice});
  }, 1000);
  // Start price updates
  setInterval(() => {
  
      const timeElapsed = Date.now() - periodStartTime;
      remainingTime = Math.max((periodDuration - timeElapsed) / 1000, 0);
      if (remainingTime <= 0) {
        const result = latestPrice >= cycleStartPrice ? 'up' : 'down';
        // Save result to MongoDB
        const newResult = new Result({ result });
        newResult.save()
          .then(() => logger.info('Result saved to MongoDB'))
          .catch(err => logger.error('Error saving result to MongoDB', err));

        // Reset for the next period
        cycleStartPrice = latestPrice;
        periodStartTime = Date.now();
      }
  }, 1000); // Set interval to 1000 milliseconds (1 second)
  
}

module.exports = { setupWebSocket };