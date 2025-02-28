# Loading and displaying a very large list

This project presents a `React` frontend and a `Node.js`/`Express` backend for efficiently displaying a large, alphabetically sorted list of user names.

## Features

*   **Virtualized List:** Employs the `react-virtualized` library to render only the visible portion of the user list, ensuring smooth scrolling performance.
*   **Alphabetical Filtering:** An A-Z menu allows users to quickly filter the list to show only users whose names start with the selected letter.
*   **Loading Indicator:**  Displays a loading spinner while data is being fetched from the backend.
*   **"No Results" Message:**  Shows a "No users found" message when a filter selection returns no matching users.
*   **Scroll-to-Top on Filter Change:** Automatically scrolls the list back to the top when a new letter is selected from the alphabet menu, enhancing the user experience.
*   **Error Handling (ErrorBoundary):** Includes an `ErrorBoundary` component to gracefully handle unexpected JavaScript errors within the React component tree, preventing full application crashes.
*   **Tailwind CSS Styling:** Uses Tailwind CSS for a clean, consistent, and responsive UI.
*   **Backend API (Node.js/Express):**
    *   Serves user data in chunks to the frontend.
    *   Reads user data from a text file (`usernames.txt`).
    *   Filters data based on the starting character provided by the frontend.
    *   Uses `fs.promises` for asynchronous file operations.


## Prerequisites

*   **Node.js:** 
*   **npm:** (or yarn)

## Project Structure
```
large-list-app/
├── backend/ # Node.js/Express backend
│ ├── server.js # Backend server code
│ └── usernames.txt
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── App.js # Main React component
│ │ ├── index.css
│ │ └── ...
│ ├── package.json
│ └── ...
└── README.md
```
## Setup and Installation

### 1. Backend Setup (Node.js/Express)

1.  **Navigate to the backend directory:**

    ```bash
    cd large-list-app/backend
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### 2. Frontend Setup (React)

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Install Tailwind CSS:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
      Configure `tailwind.config.js`:
      ```
      // frontend/tailwind.config.js
      module.exports = {
        content: ["./src/**/*.{js,jsx,ts,tsx}"],
        theme: {
          extend: {},
        },
        plugins: [],
      };
      ```

### 3. Running the Application

1.  **Start the backend server:**

    ```bash
    cd large-list-app/backend
    node server.js
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm start  # Or yarn start
    ```

3.  **Open your browser:** The application should open automatically at `http://localhost:3000`.

## API Endpoint

The backend provides a single API endpoint:

*   **`GET /users`:**
    *   **Query Parameters:**
        *   `startChar` (required): The starting letter to filter users by (case-insensitive).
    *   **Response:** A JSON array of user names (strings) that start with the specified letter.  The response is limited to `CHUNK_SIZE` (defined in `server.js`, default 100).
    *   **Example:** `http://localhost:5000/users?startChar=A`
