
# Catalogs API

## Overview

This is a backend service for managing catalogs of products for clients. Each catalog contains metadata like name, vertical, locales, and a flag indicating whether it's the primary catalog for a particular vertical. 

The API is built using **NodeJS** with **NestJS** and **MongoDB** as the database.

## Requirements

- **Node.js**: Version 16.x or above.
- **MongoDB**: Local MongoDB instance running on `mongodb://localhost:27017/catalogsDB`.

## Installation

### 1. Clone the repository
```bash
git clone <repository_url>
```

### 2. Install dependencies
Navigate to the project folder and install the required dependencies:
```bash
cd catalogs-api
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory of the project and add the following:
```
MONGO_URI=mongodb://localhost:27017/catalogsDB
```

### 4. Start MongoDB
Ensure your local MongoDB instance is running:
```bash
mongod --dbpath=/path/to/your/data
```

### 5. Run the application
Start the application in development mode:
```bash
npm run start:dev
```

### 6. Build the project
To build the project for production:
```bash
npm run build
npm run start:prod
```

## API Endpoints

### 1. Add a new catalog
- **Endpoint**: `POST /catalogs`
- **Body**:
```json
{
  "name": "summer_collection",
  "vertical": "fashion",
  "locales": ["en_US", "es_ES"],
  "isPrimary": true
}
```
- **Description**: Adds a new catalog. If the catalog is primary, any existing primary catalog with the same vertical will be switched to non-primary.

### 2. Get all catalogs
- **Endpoint**: `GET /catalogs`
- **Response**:
```json
[
  {
    "_id": "12345",
    "name": "summer_collection",
    "vertical": "fashion",
    "locales": ["en_US", "es_ES"],
    "isPrimary": true,
    "isMultiLocale": true
  }
]
```
- **Description**: Retrieves all catalogs.

### 3. Get a catalog by ID
- **Endpoint**: `GET /catalogs/:id`
- **Response**:
```json
{
  "_id": "12345",
  "name": "summer_collection",
  "vertical": "fashion",
  "locales": ["en_US", "es_ES"],
  "isPrimary": true,
  "isMultiLocale": true
}
```
- **Description**: Retrieves a specific catalog by its ID.

### 4. Update a catalog
- **Endpoint**: `PUT /catalogs/:id`
- **Body**:
```json
{
  "name": "summer_collection_updated",
  "vertical": "fashion",
  "locales": ["en_US"],
  "isPrimary": true
}
```
- **Description**: Updates a catalog. If the catalog is set as primary, any existing primary catalog with the same vertical will be switched to non-primary.

### 5. Delete a catalog
- **Endpoint**: `DELETE /catalogs/:id`
- **Description**: Deletes a catalog by its ID.

### 6. Delete multiple catalogs (bulk)
- **Endpoint**: `DELETE /catalogs/bulk`
- **Body**:
```json
{
  "ids": ["12345", "67890"]
}
```
- **Description**: Deletes multiple catalogs at once.

## Testing

To run the tests, use the following command:
```bash
npm run test
```

This will run the unit tests using **Jest**. You can also run tests in watch mode using:
```bash
npm run test:watch
```

## API Documentation with Swagger

Once the server is running, the Swagger UI will be available at:

```
http://localhost:3000/api
```

You can interact with the API directly through this interface.

## License

This project is licensed under the **UNLICENSED** license.
