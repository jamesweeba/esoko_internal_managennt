import axios from 'axios';
import redisClient from '../utils/redis';

const API_BASE_URL = 'https://api.example.com'; 
const cacheKey = 'statistics';

const fetchDataFromEndpoint = async (endpointUrl) => {
  try {
    const response = await axios.get(endpointUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from endpoint:', error);
    throw new Error(`Failed to fetch data from ${endpointUrl}`);
  }
};

const cacheStatistics = (data) => {
  redisClient.set(cacheKey, JSON.stringify(data), 'EX', 300);
};

const getStatisticsFromCache = async () => {
  try {
    const cachedData = await redisClient.getAsync(cacheKey);
    return JSON.parse(cachedData);
  } catch (error) {
    console.error('Error retrieving data from Redis cache:', error);
    throw new Error('Failed to retrieve data from cache');
  }
};

const getStatistics = async (req, res) => {
  try {
    const cachedData = await getStatisticsFromCache();
    if (cachedData) {
      return res.json(cachedData);
    }

    const [pushVoicesResponse, pushSmsResponse, insytFormsResponse] = await Promise.all([
      fetchDataFromEndpoint(`${API_BASE_URL}/push/voices`),
      fetchDataFromEndpoint(`${API_BASE_URL}/push/sms`),
      fetchDataFromEndpoint(`${API_BASE_URL}/insyt/forms`)
    ]);

    const totalPushVoicesSent = pushVoicesResponse.total;
    const totalPushSmsSent = pushSmsResponse.total;
    const totalInsytForms = insytFormsResponse.total;

    const aggregatedData = {
      totalPushVoicesSent,
      totalPushSmsSent,
      totalInsytForms
    };
    // Store aggregated data in cache
    cacheStatistics(aggregatedData);
    return res.json(aggregatedData);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default { getStatistics };
