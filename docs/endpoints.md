# API Endpoints

## Generate Task

**POST** `/generate-task`

- **Description**: Generates a new task using Azure AI Foundry and stores it in Azure Cosmos DB.
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

- **Description**: Updates an existing task in Azure Cosmos DB.
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

- **Description**: Retrieves all tasks from Azure Cosmos DB.
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

- **Description**: Retrieves a single task by ID from Azure Cosmos DB.
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

- **Description**: Deletes a task by ID from Azure Cosmos DB.
- **Response**:
  ```json
  {
    "id": "string"
  }
  ```
