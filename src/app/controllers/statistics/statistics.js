import { cacheData,fetchDataFromEndpoint,retrieveDataFromCache ,handleRejectedResponse} from '../../../utils/helper.js';

const API_BASE_URL = 'https://api.example.com'; 
const cacheKey = 'statistics';
const token = '3dd0f76c-3838-43cd-b362-38c9cdd2ae82';
const url = 'http://insyt-api.qa.esoko.com:1900/api/v1/staticstics'
const method = 'GET'

// fetchDataFromEndpoint(url, method, token)
//   .then(data => {
//     const insytFormsResult = handleRejectedResponse(data);
//     const totalInsytForms = insytFormsResult.total;
//     console.log(totalInsytForms);
// })
// .catch(error => {
//   console.error(error);
// });


export const getStatistics = async (req, res) => {
  try {
    const cachedData = await retrieveDataFromCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const [pushVoicesResponse, pushSmsResponse, insytFormsResponse] = await Promise.allSettled([
      fetchDataFromEndpoint(`${API_BASE_URL}/push/voices`),
      fetchDataFromEndpoint(`${API_BASE_URL}/push/sms`),
      fetchDataFromEndpoint(`${API_BASE_URL}/insyt/forms`)
    ]);

    const pushVoicesResult = handleRejectedResponse(pushVoicesResponse);
    const pushSmsResult = handleRejectedResponse(pushSmsResponse);
    const insytFormsResult = handleRejectedResponse(smsBalanceResponse);

    const totalPushVoicesSent = pushVoicesResult.total;
    const totalPushSmsSent = pushSmsResult.total;
    const totalInsytForms = insytFormsResult.total;

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

