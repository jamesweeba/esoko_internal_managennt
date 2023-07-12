import axios from 'axios';
import redisClient from '../utils/redis';

const API_BASE_URL = 'https://api.example.com'; // Replace with your transaction API base URL

const fetchFromEndpoint = async (endpointUrl) => {
  try {
    const response = await axios.get(endpointUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from endpoint:', error);
    throw new Error(`Failed to fetch data from ${endpointUrl}`);
  }
};

const cacheData = (key, data) => {
  redisClient.set(key, JSON.stringify(data), 'EX', 300); // Set expiration time (in seconds)
};

const retrieveDataFromCache = async (key) => {
  try {
    const cachedData = await redisClient.getAsync(key);
    return JSON.parse(cachedData);
  } catch (error) {
    console.error(`Error retrieving data from Redis cache (${key}):`, error);
    throw new Error(`Failed to retrieve data from cache (${key})`);
  }
};

const getTransactionData = async (req, res) => {
  try {
    const cachedData = await retrieveDataFromCache('transactionData');
    if (cachedData) {
      return res.json(cachedData);
    }

    const recentPayments = await fetchData(`${API_BASE_URL}/recentPayments`);
    const totalTransactions = await fetchData(`${API_BASE_URL}/totalTransactions`);
    const revenuePerQuarter = calculateRevenuePerQuarter(totalTransactions);

    const transactionData = {
      recentPayments,
      totalTransactions,
      revenuePerQuarter
    };

    cacheData('transactionData', transactionData);
    return res.json(transactionData);
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const fetchData = async (endpointUrl) => {
  try {
    const data = await fetchFromEndpoint(endpointUrl);
    const processedData = processData(data);
    return processedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};

const processData = (data) => {
  const processedData = data.map((item) => ({
    transactionId: item.transactionId,
    clientName: item.clientName,
    date: item.date,
    amount: item.amount,
    status: item.status,
    transactionStatus: item.transactionStatus,
    servicePaidFor: item.servicePaidFor
  }));

  return processedData;
};

const calculateRevenuePerQuarter = (transactions) => {
  const revenuePerQuarter = {};
  transactions.forEach((transaction) => {
    const { date, amount } = transaction;
    const quarter = getQuarterFromDate(date);
    if (revenuePerQuarter[quarter]) {
      revenuePerQuarter[quarter] += amount;
    } else {
      revenuePerQuarter[quarter] = amount;
    }
  });
  return revenuePerQuarter;
};

const getQuarterFromDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const quarter = Math.ceil(month / 3);
  return quarter;
};

export { getTransactionData };
