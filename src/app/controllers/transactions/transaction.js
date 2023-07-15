import { cacheData,fetchDataFromEndpoint,retrieveDataFromCache } from '../../../utils/helper.js';

const API_BASE_URL = 'https://api.example.com'; 
const cacheKey = 'transactionData';

const getTransactionData = async (req, res) => {
  try {
    const cachedData = await retrieveDataFromCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const recentPayments = await fetchDataFromEndpoint(`${API_BASE_URL}/recentPayments`);
    const totalTransactions = await fetchDataFromEndpoint(`${API_BASE_URL}/totalTransactions`);
    const revenuePerQuarter = calculateRevenuePerQuarter(totalTransactions);

    const transactionData = {
      recentPayments,
      totalTransactions,
      revenuePerQuarter
    };

    cacheData(cacheKey, transactionData);
    return res.json(transactionData);
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    return res.status(500).json({ error: 'Internal server error' });
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
