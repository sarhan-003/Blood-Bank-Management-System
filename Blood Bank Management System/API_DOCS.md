# API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Get Blood Stock
Retrieve all blood group inventory

**Endpoint:** `GET /stock`

**Request:**
```bash
curl http://localhost:5000/stock
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blood stock retrieved successfully",
  "data": [
    {
      "id": 1,
      "group": "A+",
      "units": 25,
      "color": "#E53E3E",
      "donated": 0,
      "requested": 0
    },
    {
      "id": 2,
      "group": "A-",
      "units": 12,
      "color": "#C53030",
      "donated": 0,
      "requested": 0
    },
    ...
  ]
}
```

---

### 2. Donate Blood
Record a blood donation and add units to inventory

**Endpoint:** `POST /donate`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "bloodGroup": "A+",
  "quantity": 2
}
```

**Example with cURL:**
```bash
curl -X POST http://localhost:5000/donate \
  -H "Content-Type: application/json" \
  -d '{"bloodGroup": "A+", "quantity": 2}'
```

**Example with JavaScript (Fetch):**
```javascript
fetch('http://localhost:5000/donate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    bloodGroup: 'A+',
    quantity: 2
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

**Example with Axios:**
```javascript
axios.post('http://localhost:5000/donate', {
  bloodGroup: 'A+',
  quantity: 2
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully donated 2 units of A+",
  "new_units": 27
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Maximum donation is 5 units at a time"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Blood group not found"
}
```

**Validation Rules:**
- `bloodGroup`: Required, must exist in inventory
- `quantity`: Required, must be positive number, max 5 units

---

### 3. Request Blood
Request blood units from inventory (reduces stock)

**Endpoint:** `POST /request`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "bloodGroup": "O+",
  "quantity": 3
}
```

**Example with cURL:**
```bash
curl -X POST http://localhost:5000/request \
  -H "Content-Type: application/json" \
  -d '{"bloodGroup": "O+", "quantity": 3}'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully requested 3 units of O+",
  "new_units": 32
}
```

**Insufficient Stock Response (400):**
```json
{
  "success": false,
  "message": "Insufficient stock. Available: 2 units, Requested: 3 units",
  "available": 2
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Blood group and quantity are required"
}
```

**Validation Rules:**
- `bloodGroup`: Required, must exist in inventory
- `quantity`: Required, must be positive number
- Must not exceed available units

---

## Error Handling

All endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### Common Status Codes
- **200**: Success
- **400**: Bad request (validation error)
- **404**: Resource not found
- **500**: Server error

---

## Rate Limiting

Currently, there is no rate limiting. For production, consider implementing:
- Request throttling
- Authentication tokens
- Usage quotas

---

## CORS Configuration

CORS is enabled for all origins. For production, update in `backend/server.js`:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

## Testing the API

### Using Postman

1. Open Postman
2. Create new request
3. Set method to GET/POST
4. Enter URL: `http://localhost:5000/[endpoint]`
5. Add JSON body for POST requests
6. Send request

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Configure and send

### Using Command Line

**Unix/Mac:**
```bash
# Install curl (usually pre-installed)
curl -X GET http://localhost:5000/stock
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/stock -Method Get
```

---

## Data Persistence

All data is stored in `backend/data/blood_stock.json` and persisted automatically.

To reset data:
1. Delete `backend/data/blood_stock.json`
2. Restart the server (it will recreate the file with default data)

---

## Security Notes (For Production)

- Add authentication (JWT tokens)
- Validate all inputs server-side
- Use HTTPS instead of HTTP
- Add rate limiting
- Implement logging
- Use environment variables for sensitive data
- Add input sanitization
- Implement request size limits

---

## Future Enhancements

- Add pagination to stock endpoint
- Add filtering and sorting
- Add batch operations
- Add transaction history
- Add user authentication
- Add audit logging
- Add webhooks for real-time updates
