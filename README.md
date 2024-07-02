# Node version number : v20.12.2

# Installation

- npm install

# development

$ npm run start

# watch mode

$ npm run start:dev

# unit tests

$ npm run test

## Endpoints

### Parse Data Endpoint

- **GET** `/parse-data`

  JSON data tarnsformed

  **Example:**

- http://localhost:3000/parse-data

### Parse Mail Endpoints

#### Endpoint example 1

- **GET** `/parse-mail`

  - **Query Parameters:**
    - `filePath`: Path to the email file. Example: `src/emails/test-mail-json.eml`.

  Description: Endpoint for JSON file in email attachments.

  **Example:**

  - http://localhost:3000/parse-mail?filePath=src/emails/test-mail-json.eml

#### Endpoint example 2

- **GET** `/parse-mail`

- **Query Parameters:**
  - `filePath`: Path to the email file. Example: `src/emails/test-mail-url-json.eml`.

Description: Endpoint for JSON file in email body as a URL.

**Example:**

- http://localhost:3000/parse-mail?filePath=src/emails/test-mail-url-json.eml
