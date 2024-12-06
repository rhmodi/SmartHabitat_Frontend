# SmartHabitat_Frontend

The application features an interactive UI with three main pages: a Home page for preference selection, a Results page showcasing the top 5 matching communities, and a Detailed View page displaying in-depth metrics for environmental and crime factors of selected neighborhoods.

Welcome to the `SmartHabitat Application`! This document provides instructions for setting up and running the application locally as well as deploying it for production.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Running Production Build Locally](#running-production-build-locally)
- [Deployment](#deployment)
- [Contributors](#contributors)
- [Technologies Used](#technologies-used)

---

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

---

## Setup
1. Clone the Repository:
    ```python
    git clone https://github.com/rhmodi/SmartHabitat_Frontend.git
    ```
2. Go the App folder:
    ```python
    cd SmartHabitat_Frontend/habitat-finder
    ```
3. Install Dependencies:
    ```python
    npm install
    ```

---

## Running Locally
1. Start Backend Server Locally. Redirect to:
    ```python
    https://github.com/rhmodi/SmartHabitat_Backend/blob/main/README.md
    ```
2. Start the Developement Server:
    ```python
    npm start
    ```
3. Open your browser and Navigate to:
    ```python
    http://localhost:3000
    ```

---

## Building for Production
1. Generate the production build:
    ```python
    npm run build
    ```
2. The production-ready files will be available in the build/ directory.

---

## Running Production Build Locally
1. Install a static server:
    ```python
    npm install -g serve
    ```
2. Serve the build directory:
    ```python
    serve -s build
    ```
3. Open your browser and Navigate to:
    ```python
    http://localhost:3000
    ```

---

## Deployment

This application has been deployed as a `Static Web App` on `Microsoft Azure` using a `CI/CD pipeline` with `GitHub Actions`.

### Deployment Process

1. **CI/CD Configuration:**
   - The CI/CD pipeline is configured to automatically deploy the application whenever changes are pushed to the `cloud-deployment` branch on GitHub.

2. **Static Web App Setup:**
   - Azure Static Web Apps service is used to host the application.
   - The build and deployment process is managed through a pre-configured GitHub Actions workflow.

3. **Deployment Workflow:**
   - On every push to the `cloud-deployment` branch:
     - GitHub Actions triggers the build process.
     - The React application is built using the `npm run build` command.
     - The build output in the `build/` directory is deployed to Azure Static Web Apps.

4. **Live Deployment URL:**
   - The application is accessible at: [Smart Habitat Finder](purple-mushroom-050a3aa1e.4.azurestaticapps.net)

### Notes

- Ensure that the `cloud-deployment` branch contains the latest code changes for successful deployment.
- The deployment workflow file is located in `.github/workflows/` and follows the YAML configuration provided by Azure.

---

## Contributors

This project was built and maintained with contributions from the following team members:

- **RakshilKumar Modi** - [GitHub Profile](https://github.com/rakshil14-2)
- **Akshata Vijay Kulkarni** - [GitHub Profile](https://github.com/akulka89)
- **Kaumudi Degekar Gulbarga** - [GitHub Profile](https://github.com/kgulbarg)
- **Shloka Pandya** - [GitHub Profile](https://github.com/shloka23)
- **Anuj Kapoor** - [GitHub Profile](https://github.com/anujkap)


--- 


## Technologies Used

- **React.js**: Frontend library
- **React Router**: For Routing
- **TailwindCSS**: For styling
- **Axios**: For Api Requests
- **Create React App**: For project setup

