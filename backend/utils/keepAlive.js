import axios from 'axios';

/**
 * Keep-Alive Service for Render Cold Start Prevention
 * Pings the /api/warmup endpoint every 14 minutes to keep the server warm
 */

const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? process.env.RENDER_EXTERNAL_URL || 'http://localhost:5000'
  : 'http://localhost:5000';

const WARMUP_INTERVAL = 14 * 60 * 1000; // 14 minutes

export const startKeepAlive = () => {
  setInterval(async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/warmup`, { timeout: 5000 });
      console.log('Keep-alive ping sent at', new Date().toISOString());
    } catch (error) {
      console.log('Keep-alive ping failed (expected in development):', error.message);
    }
  }, WARMUP_INTERVAL);

  console.log('Keep-alive service started - will ping every 14 minutes');
};