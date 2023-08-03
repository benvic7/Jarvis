# Jarvis

## Description
Jarvis is an interactive web application that uses OpenAI's API to create an AI-powered language model. It allows users to interact with an advanced language model to receive responses to their prompts. The application features a user-friendly front-end interface that simulates a chat-like conversation, providing an engaging and seamless user experience.

Author: **Ben Vicinelli**

Date: **August 2023**

Langauges: **HTML, CSS, JavaScript**

Dependencies: **Vite, Node.js, Express.js, OpenAI API**


## Features

- **AI Language Model Integration:** the program leverages OpenAI's API to provide a seamless and powerful language processing experience. The application uses the "text-davinci-003" model to generate responses based on the user's input prompt.
- **Front-End User Interface:** the application boasts an intuitive and aesthetically pleasing front-end interface. Users can interact with Jarvis through a chat-like interface, making the conversation feel natural and engaging.
- **Realistic Chat Experience:** includes both dynamic loading animation, displaying while the AI model processes the query, and a typing animation that presents AI-generated responses letter-by-letter, simulating human-like typing.
- **Unique Message IDs:** to manage and organize the chat history, each message is assigned a unique ID. This feature ensures that new messages are added correctly, making it easier for users to follow the conversation flow.
- **Error Handling:** Jarvis has robust error handling to manage any issues that may arise during communication with OpenAI's API. If there is an unsuccessful API request, Jarvis displays an error message, alerting the user to the problem.


## How to Use

1. Clone this repository: https://github.com/benvic7/Jarvis.git.
2. Navigate to the project directory and install the required dependencies by running `npm install`.
3. Create a `.env` file and add your OpenAI API key as `OPENAI_API_KEY = "YOUR_KEY_HERE"`.
4. Start the backend server by moving to the server file with `cd server` and running with `npm run server`.
5. Start the frontend by moving to the client file with `cd ..` and `cd client` and running with `npm run dev`.
7. Open the application in your browser by navigating to the localhost link in the terminal.


## Note
Please note that you need an OpenAI API key to use the language model. You can sign up for an API key on the OpenAI website.
