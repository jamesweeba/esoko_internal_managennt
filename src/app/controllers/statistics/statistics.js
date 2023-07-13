import { cacheData,fetchDataFromEndpoint,retrieveDataFromCache } from '../../../utils/helper.js';

const API_BASE_URL = 'https://api.example.com'; 
const cacheKey = 'statistics';

const getStatistics = async (req, res) => {
  try {
    const cachedData = await retrieveDataFromCache(cacheKey);
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
    cacheData(aggregatedData);
    return res.json(aggregatedData);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default { getStatistics };
