import axios from 'axios';
import redisClient from '../utils/redis';

const API_BASE_URL = 'https://api.example.com'; 
const cacheKey = 'organizationData';

const fetchOrganizationData = async () => {
  try {
    const [usersResponse, organizationResponse, smsBalanceResponse, formsResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/users`),
      axios.get(`${API_BASE_URL}/organization`),
      axios.get(`${API_BASE_URL}/sms/balance`),
      axios.get(`${API_BASE_URL}/forms?status=active`)
    ]);

    const totalUsers = usersResponse.data.length;
    const activeUsers = usersResponse.data.filter((user) => user.status === 'active').length;
    const disabledUsers = usersResponse.data.filter((user) => user.status === 'disabled').length;
    const userList = usersResponse.data;
    const organizationInfo = organizationResponse.data;
    const smsBalance = smsBalanceResponse.data.balance;
    const activeForms = formsResponse.data.length;

    const organizationData = {
      totalUsers,
      activeUsers,
      disabledUsers,
      userList,
      organizationInfo,
      smsBalance,
      activeForms
    };

    redisClient.set(cacheKey, JSON.stringify(organizationData), 'EX', 300);
    return organizationData;
  } catch (error) {
    console.error('Error fetching organization data:', error);
    throw new Error('Failed to fetch organization data');
  }
};

const getOrganizationData = async (req, res) => {
  try {
    const cachedData = await redisClient.getAsync(cacheKey);
    if (cachedData) {
      const organizationData = JSON.parse(cachedData);
      return res.json(organizationData);
    }
      
    const organizationData = await fetchOrganizationData();
    return res.json(organizationData);
  } catch (error) {
    console.error('Error fetching organization data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { getOrganizationData };
