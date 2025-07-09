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
