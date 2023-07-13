import { cacheData,fetchDataFromEndpoint,retrieveDataFromCache ,handleRejectedResponse} from '../../../utils/helper.js';

const API_BASE_URL = 'https://api.example.com'; 
const cacheKey = 'organizationData';

const fetchOrganizationData = async () => {
  try {
    const [usersResponse, organizationResponse, smsBalanceResponse, formsResponse] = await Promise.allSettled([
      fetchDataFromEndpoint(`${API_BASE_URL}/users`),
      fetchDataFromEndpoint(`${API_BASE_URL}/organization`),
      fetchDataFromEndpoint(`${API_BASE_URL}/sms/balance`),
      fetchDataFromEndpoint(`${API_BASE_URL}/forms?status=active`)
    ]);

    const usersResult = handleRejectedResponse(usersResponse);
    const organizationResult = handleRejectedResponse(organizationResponse);
    const smsBalanceResult = handleRejectedResponse(smsBalanceResponse);
    const formsResult = handleRejectedResponse(formsResponse);

    const totalUsers = usersResult.data.length;
    const activeUsers = usersResult.data.filter((user) => user.status === 'active').length;
    const disabledUsers = usersResult.data.filter((user) => user.status === 'disabled').length;
    const userList = usersResult.data;
    const organizationInfo = organizationResult.data;
    const smsBalance = smsBalanceResult.data.balance;
    const activeForms = formsResult.data.length;

    const organizationData = {
      totalUsers,
      activeUsers,
      disabledUsers,
      userList,
      organizationInfo,
      smsBalance,
      activeForms
    };

    cacheData(cacheKey, organizationData);
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
