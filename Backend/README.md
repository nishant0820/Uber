# API Documentation

## User Registration

### `POST /users/register`

This endpoint allows a new user to register in the system.

### Request Body

The following fields are required in the request body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Field Validation:**

*   `fullname.firstname`: Must be at least 3 characters long.
*   `email`: Must be a valid email address.
*   `password`: Must be at least 6 characters long.

### Example Response

Below is a sample of the full HTTP response returned when a user registers successfully:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "User registered successfully",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "60f5a9b3e4b3f8a3c4b5e6d7"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY1YTliM2U0YjNmOGEzYzRiNWU2ZDciLCJpYXQiOjE2MjY3ODEzNjN9..."
}
```

#### `400 Bad Request`

Returned if the provided data is invalid.

**Body:**

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### `500 Internal Server Error`

Returned if there is a server-side error, for example, if the email is already in use.

## User Login

### `POST /users/login`

This endpoint authenticates an existing user and returns a JSON Web Token (JWT).

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Field Validation:**

*   `email`: Must be a valid email address.
*   `password`: Must be at least 6 characters long.

### Responses

#### `200 OK`

Returned on successful login.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "User logged in successfully",
  "user": {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "_id": "60f5a9b3e4b3f8a3c4b5e6d7"
  },
  "token": "<jwt-token>"
}
```

#### `400 Bad Request`

Returned if validation fails or credentials are incorrect.

```json
{ "message": "Invalid credentials" }
```

Validation errors:

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### `404 Not Found`

Returned if no user is found with the given email.

```json
{ "message": "Invalid email or password" }
```

## User Profile

### `GET /users/profile`

Protected endpoint to retrieve the authenticated user’s profile. Requires a valid JWT in `Authorization: Bearer <token>` header or `token` cookie.

#### `200 OK`
```json
{
  "_id": "60f5a9b3e4b3f8a3c4b5e6d7",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "socketId": null
}
```

#### `401 Unauthorized`
```json
{ "message": "Access denied" }
```

## User Logout

### `GET /users/logout`

Protected endpoint to log out the authenticated user by clearing cookie and blacklisting the JWT.

#### `200 OK`
```json
{ "message": "User logged out successfully" }
```

#### `401 Unauthorized`
```json
{ "message": "Access denied" }
```

## Captain Registration

### `POST /captains/register`

This endpoint allows a new captain to register in the system.

### Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Field Validation:**

*   `fullname.firstname`: Must be at least 3 characters long.
*   `email`: Must be a valid email address.
*   `password`: Must be at least 6 characters long.
*   `vehicle.color`: Must be at least 3 characters long.
*   `vehicle.plate`: Must be at least 3 characters long.
*   `vehicle.capacity`: Must be at least 1.
*   `vehicle.vehicleType`: Must be one of: `car`, `motorcycle`, `auto`.

### Responses

#### `201 Created`

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Captain registered successfully",
  "captain": {
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "vehicle": { "color": "Red", "plate": "ABC123", "capacity": 4, "vehicleType": "car" },
    "_id": "60f5abcd1234efgh5678ijkl"
  },
  "token": "<jwt-token>"
}
```

#### `400 Bad Request`

Returned on validation failure or if email already exists.

```json
{ "message": "Captain with this email already exists" }
```

#### `500 Internal Server Error`

Returned on server error.

```json
{ "message": "An unexpected error occurred" }
```

## Captain Login

### `POST /captains/login`

This endpoint authenticates an existing captain and returns a JSON Web Token (JWT).

### Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "password123"
}
```

#### `200 OK`

Returned on successful login.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Captain logged in successfully",
  "captain": {
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "_id": "60f5abcd1234efgh5678ijkl"
  },
  "token": "<jwt-token>"
}
```

#### `401 Unauthorized`

Returned if the credentials are invalid.

```json
{ "message": "Invalid email or password" }
```

## Captain Profile

### `GET /captains/profile`

Protected endpoint to retrieve the authenticated captain’s profile. Requires a valid JWT in `Authorization: Bearer <token>` header or `token` cookie.

#### `200 OK`

Returned with the captain’s profile data.

```json
{
  "message": "Captain profile fetched successfully",
  "captain": {
    "_id": "60f5abcd1234efgh5678ijkl",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "vehicle": { "color": "Red", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }
}
```

#### `401 Unauthorized`

Returned if the request is not authenticated.

```json
{ "message": "Access denied" }
```

## Captain Logout

### `GET /captains/logout`

Protected endpoint to log out the authenticated captain by clearing cookie and blacklisting the JWT.

#### `200 OK`

Returned on successful logout.

```json
{ "message": "Captain logged out successfully" }
```

#### `401 Unauthorized`

Returned if the request is not authenticated.

```json
{ "message": "Access denied" }
```
