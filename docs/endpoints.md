# API Endpoints

## Generate Task

**POST** `/generate-task`

- **Description**: Generates a new task using OpenAI and stores it in Firestore.
- **Request Body**:
  ```json
  {
    "prompt": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "prompt": "string",
    "description": "string",
    "createdAt": "string"
  }
  ```

## Update Task

**PUT** `/update-task/:id`

- **Description**: Updates an existing task in Firestore.
- **Request Params**:
  - `id`: Task ID to update.
- **Request Body**:
  ```json
  {
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "description": "string"
  }
  ```
