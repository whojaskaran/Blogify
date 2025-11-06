# BlogApp

A simple blogging application built with Node.js, Express, and MongoDB.

## Technologies Used

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   EJS (Embedded JavaScript templates)
*   Multer (for handling file uploads)
*   JSON Web Token (for authentication)
*   Cookie Parser
*   Dotenv
*   OpenAI (for potential future AI integrations)

## Getting Started

### Prerequisites

Make sure you have the following installed:

*   Node.js (v14 or higher)
*   npm (Node Package Manager)
*   MongoDB

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd BlogApp
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory and add the following environment variables:

    ```
    PORT=8000
    MONGO_URL="your_mongodb_connection_string"
    SECRET_KEY="your_secret_key_for_jwt"
    ```

4.  Start the application:

    ```bash
    npm start
    ```

    Or for development with hot-reloading:

    ```bash
    npm run dev
    ```

The application will be running on `http://localhost:8000` (or your specified PORT).