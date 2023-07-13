# esoko-internal-api
# API Documentation

## Login
- Authenticate a user and generate a JWT token.

**Route:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "example@email.com",
  "password": "password"
}
```
**200 Response:**
```json
{
  "token": "sample_jwt_token"
}
```
**400 Response:**
```json
{
  "code": "invalid_credentials",
  "error": "Invalid credentials"
}
```
## Get Administrators
- Retrieve information about administrators.

**Route:** `GET /auth/admins`

**200 Response:**
```json
{
  "admins": [
    {
      "adminId": "admin_id",
      "name": "admin_name",
      "email": "admin_email"
    }
  ]
}
```
## Get Service Totals
- Retrieve service usage statistics.

  
**Route:**  `GET /reports?type=service-totals`

**200 Response:** 
```json
{
  "push": {
    "totalVoiceMessages": "number_of_voice_messages_per_month",
    "totalSMSMessages": "number_of_sms_messages_per_month",
    "totalUsersSMS": "number_of_users_using_sms",
    "totalUsersVoice": "number_of_users_using_voice"
  },
  "Insyt": {
    "forms": "total_number_of_active_forms_per_month",
    "totalUsers": "number_of_users_on_insyt"
  },
  "totalUsers": "number_of_users_on_all_platforms",
  "activeUsers": "number_of_active_users_on_all_platforms",
  "disabledUsers": "number_of_disabled_users_on_all_platforms"
}

```
**400 Response:**
```json
{
  "errorCode": "unauthenticated_user",
  "message": "You are not authenticated"
}
```
**500 Response:**
 ```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}
```
## Get All Transactions
- Retrieve all transaction records.

**Route:** `GET /reports?type=all-transactions`

**200 Response:**
```json
{
  "transactions": [
    {
      "transactionId": "id",
      "clientName": "name",
      "transactionDate": "date",
      "amount": "float",
      "status": "Failed or Succeeded",
      "service": "push or insyt"
    }
  ],
  "revenuePerQtr": {
    "firstQTR": "float",
    "secondQTR": "float",
    "thirdQTR": "float",
    "fourthQTR": "float"
  }
}
```
**500 Response:**
```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}
```
## Get All Farmers
- Retrieve information about all farmers.

**Route:** `GET /reports?type=all-farmers`

**200 Response:**
```json
{
  "farmers": [
    {
      "farmerId": "id",
      "name": "string",
      "district": "string",
      "region": "string",
      "category": "string",
      "contact": "integer"
    }
  ],
  "countriesCovered": "integer",
  "totalFemaleFarmers": "integer",
  "totalMaleFarmers": "integer"
}
```
**500 Response:**
```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}

```
## Get All Clients
- Retrieve information about all clients.

**Route:** `GET /clients?type=all`

**200 Response:**
```json
{
  "clients": [
    {
      "clientId": "id",
      "dateJoined": "date",
      "clientName": "string",
      "smsBalance": "float",
      "totalForms": "integer"
    }
  ]
}
```
**500 Response:**
```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}

```
Get Client Profile
- Retrieve the profile of a specific client.

**Route:** `GET /clients/profile?clientId=id`

**200 Response:**
```json
{
  "clientName": "string",
  "dateJoined": "date",
  "address": "string",
  "contact": "string",
  "email": "string"
}
```
**404 Response:**
```json
{
  "errorCode": "not_found",
  "message": "Client not found"
}
```
**500 Response:**
```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}

```
## Get Client Insyt Data
- Retrieve Insyt data for a specific client.
**Route:** `GET /clients/insyt-data?clientId=id`

**200 Response:**
```json
{
  "forms": [
    {
      "formId": "id",
      "dateCreated": "date",
      "formName": "string",
      "status": "active or inactive",
      "responses": "integer"
    }
  ],
  "activeForms": "integer",
  "inactiveForms": "integer"
}

````
**500 Response:**
```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}

```
## Get Client Push Data
- Retrieve Push data for a specific client.

  
**Route:** `GET /clients/push-data?clientId=id`

**200 Response:**
```json
{
  "messages": [
    {
      "messageId": "id",
      "senderId": "string",
      "dateCreated": "date",
      "Recipients": [
        {
          "number": "integer",
          "status": "delivered, scheduled, or failed"
        }
      ]
    }
  ],
  "status": {
    "scheduled": "integer",
    "delivered": "integer",
    "failed": "integer"
  },
  "totalScheduled": "integer",
  "totalDelivered": "integer"
}

```
**500 Response:**
```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}

```
Get Client Transactions
- Retrieve transaction records for a specific client.

  
**Route:** `GET /clients/transactions?clientId=id`

**200 Response:**
```json
{
  "transactions": [
    {
      "transactionId": "id",
      "transactionDate": "date",
      "amount": "float",
      "status": "Failed or Succeeded",
      "service": "push or insyt"
    }
  ]
}
```
**500 Response:**
```json
{
  "errorCode": "server_error",
  "errorMessage": "Internal server error"
}

```
