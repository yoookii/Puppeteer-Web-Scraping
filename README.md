# Feature Testing Instructions

This document will guide you on how to test and run the feature to retrieve housing listings. You need to follow these steps:

**Run the following command in the project root directory:**

## Install Dependencies

Before running the program, you need to install the necessary dependencies. Make sure Node.js and npm are installed on your computer.

```
npm install
```

This will install the required dependencies, including Puppeteer and Express.

## Run the Program

Once the dependencies are installed, you can run the program using the following command:

```
npm start
```

This will start the Express server and listen for requests from clients on port 3000.

## Test the Feature

You can test this feature using any HTTP client tool (such as Postman or cURL). Here's an example of how to test it using cURL:

```
curl -X GET "http://localhost:3000/api/houses?city=Herndon"
```

This will send a GET request to the server with the query parameter city=Herndon. The server will fetch housing listings for the Herndon area from the Trulia website and return them as a JSON-formatted response.

## End the Program

When you have finished testing, you can stop the npm start command by pressing `Ctrl + C` or closing the terminal window to end the program's execution.

This concludes the testing and running process for retrieving housing listings feature. If you encounter any issues, feel free to contact me.
