import axios from 'axios';
import redisClient from '../utils/redis';

export const fetchDataFromEndpoint = async (endpointUrl) => {
    try {
      const response = await axios.get(endpointUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from endpoint:', error);
      throw new Error(`Failed to fetch data from ${endpointUrl}`);
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
      console.error('Error retrieving data from Redis cache:', error);
      throw new Error('Failed to retrieve data from cache');
    }
  };