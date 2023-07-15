import axios from 'axios';
import redisClient from '../utils/redis.js';

export const fetchDataFromEndpoint = async (url, method, token) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const config = {
    method: method,
    url: url,
    headers: headers,
  };
  try {
      const response = await axios(config)
      return response.data;
    } catch (error) {
      console.log('Error fetching data from endpoint:', error.response.data.message);
      throw new Error(`Failed to fetch data from ${url}`);
    }
  };

  export const cacheData = (cacheKey,data) => {
    redisClient.set(cacheKey, JSON.stringify(data), 'EX', 300);
  };

  export const retrieveDataFromCache = async (cacheKey) => {
    try {
      const cachedData = await redisClient.getAsync(cacheKey);
      return JSON.parse(cachedData);
    } catch (error) {
      console.debug('Error retrieving data from Redis cache:', error);
      throw new Error('Failed to retrieve data from cache');
    }
  };

  export const handleRejectedResponse = (response) => {
    if (response.status === 'rejected') {
      throw new Error('Failed to fetch data');
    }
    return response.value;
  };