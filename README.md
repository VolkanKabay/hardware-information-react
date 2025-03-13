# System Information Dashboard

A React-based web application that provides detailed system information about your hardware and software components, including CPU, memory, storage, operating system, graphics, battery, processes, and more. The app displays real-time data, allows searching for more information, and links to related resources on Google and Amazon.

## Features

- View system information like CPU, memory, OS, battery, GPU, and more.
- Real-time data fetching from your system.
- Detailed specifications displayed with helpful information chips.
- Search for system components on Google and Amazon directly from the UI.
- Responsive design for desktop and mobile devices.

## Technologies Used

- **React**: The frontend framework for building the user interface.
- **Material-UI**: A popular React UI framework for building beautiful and responsive layouts.
- **Redux**: For state management to handle system information and loading states.
- **TypeScript**: Provides static typing to catch errors early and improve development productivity.
- **Redux Toolkit**: Simplifies Redux usage and optimizes code for better maintainability.
- **Axios**: To fetch system information from the backend or local API.
- **Google & Amazon Search APIs**: Links to search for system components on external sites.
- **Node.js Backend: Local Backend for retrieving system information of current user (MANDATORY)

## Installation

To run the app locally, follow these steps:

### Prerequisites

- Node.js (>= v14.x)
- npm (>= v6.x) or yarn

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/VolkanKabay/hardware-information-react.git
    cd hardware-information-react
    ```

2. Install dependencies:

    ```bash
    npm install
    # or if using yarn:
    yarn install
    ```

3. Start the development server (frontend and backend):

    ```bash
    npm run dev
    cd ./backend
    node server.js
    # or if using yarn:
    yarn start
    cd ./backend
    node server.js
    ```

4. Open the app in your browser:

    ```bash
    http://localhost:5173
    ```

## How It Works

### System Information Fetching

- The application fetches system information using Node JS as a local backend that gathers details such as CPU, memory, battery, graphics, etc.
- The information is then displayed in an organized and user-friendly manner with cards and chips.
- If the information is unavailable, the app shows a helpful message explaining the possible issue.

### Search Functionality

- Users can click the search buttons to look for more information about a component on Google or find relevant products on Amazon.
- The search functionality is dynamic, based on the component type (e.g., CPU, GPU, memory) and searches using the most relevant terms for better results.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes.
5. Create a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
