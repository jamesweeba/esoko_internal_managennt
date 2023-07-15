import axios from 'axios'
import {fetchDataFromEndpoint} from  './helper.js'
// const API_BASE_URL = 'http://insyt-api.qa.esoko.com:1900/api/v1'; 
// curl --location --request GET 'http://insyt-api.qa.esoko.com:1900/api/v1/staticstics' \
// --header 'Authorization: Bearer 3dd0f76c-3838-43cd-b362-38c9cdd2ae82' \
// --header 'Cookie: dev_apiVersion=3.1.6'

// const sampleData = () => { 
//     try {
//         let data = fetchDataFromEndpoint(`${API_BASE_URL}/staticstics`)
//      console.log(first)
//     } catch (error) {
//         console.log(error)
//     }
// }

// axios.get('http://insyt-api.qa.esoko.com:1900/api/v1/staticstics', {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// })
//   .then(response => {
//     console.log(response.data);
//   })
//     .catch(error => {  
//     console.log(error.response.data.message);
//     });


  const token = '3dd0f76c-3838-43cd-b362-38c9cdd2ae82';
  const url = 'http://insyt-api.qa.esoko.com:1900/api/v1/staticstics'
  const method = 'GET'
  
fetchDataFromEndpoint(url, method, token)
   .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });