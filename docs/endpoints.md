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

## Tasks CRUD

### List Tasks
**GET** `/tasks`

- **Description**: Retrieves all tasks.
- **Response**:
  ```json
  [
    {
      "id": "string",
      "prompt": "string",
      "description": "string",
      "createdAt": "string"
    }
  ]
  ```

### Get Task
**GET** `/tasks/:id`

- **Description**: Retrieves a single task by ID.
- **Response**:
  ```json
  {
    "id": "string",
    "prompt": "string",
    "description": "string",
    "createdAt": "string"
  }
  ```

### Delete Task
**DELETE** `/tasks/:id`

- **Description**: Deletes a task by ID.
- **Response**:
  ```json
  {
    "id": "string"
  }
  ```
