import { cacheData,fetchDataFromEndpoint,retrieveDataFromCache } from '../../../utils/helper.js';

const API_BASE_URL = 'https://api.example.com'; 
const cacheKey = 'organizationData';

const fetchOrganizationData = async () => {
  try {
    const [usersResponse, organizationResponse, smsBalanceResponse, formsResponse] = await Promise.all([
      fetchDataFromEndpoint(`${API_BASE_URL}/users`),
      fetchDataFromEndpoint(`${API_BASE_URL}/organization`),
      fetchDataFromEndpoint(`${API_BASE_URL}/sms/balance`),
      fetchDataFromEndpoint(`${API_BASE_URL}/forms?status=active`)
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

    cacheData(cacheKey,aggregatedData);
    return organizationData;
  } catch (error) {
    console.error('Error fetching organization data:', error);
    throw new Error('Failed to fetch organization data');
  }
};

const getOrganizationData = async (req, res) => {
  try {
    const cachedData = await retrieveDataFromCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }
      
    const organizationData = await fetchOrganizationData();
    return res.json(organizationData);
  } catch (error) {
    console.error('Error fetching organization data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { getOrganizationData };
