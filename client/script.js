// this file provides the functioning for the application (doing the work based on input)

// importing logos from our assets folder
import bot from './assets/bot.svg';
import user from './assets/user.svg';

// getting our HTML elements
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// FUNCTION: cycle dots while our answer is loading
function loader(element) {
  element.textContent = '';
  // load another dot every 300 ms
  loadInterval = setInterval(() => {
    element.textContent += '.';

    // reset the string once it has 4 dots
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)
}

// FUNCTION: type out our response letter-by-letter for a better UX
function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    // if we are still typing
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++; 
    }
    // if we are done typing
    else {
      clearInterval(interval);
    }
  }, 20)
}

// FUNCTION: need to generate a unique ID for every message
function generateUniqueId() {
  // getting 3 unique/random numbers to ensure it is truly random
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// FUNCTION: need to change the background color based on whose message is displaying (us or AI)
//isAi tells us who is speaking, value is what is being said, uniqueId is the Id
// needs to return a template string so that we can include spaces/new lines
function chatStripe (isAi, value, uniqueId) {
  // first we check if it is an ai, put it in the ai class
  // then we check if it is an ai again, pass bot (and bot string), else pass user (and user string)
  // then we render the message with a unique ID
  return (
    `
      <div class = "wrapper ${isAi && 'ai'}">
        <div class = "chat">
          <div class = "profile">
            <img
              src = "${isAi ? bot : user}"
              alt = "${isAi ? 'bot' : 'user'}"
            />
          </div>
          <div class = "message" id = ${uniqueId}>${value}</div>
        </div>
      </div>
    `
  )
}

// FUNCTION: trigger to get the AI response
const handleSubmit = async (e) => {
  // prevents the page from automatically reloading (default behavior for submitting a form)
  e.preventDefault();

  // form element from our HTML
  const data = new FormData(form);

  // user's chatstripe (no uniqueId)
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // bot's chatstripe (empty string because we are filling it in the loader function)
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  // puts the new message in view
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // fetching the new div
  const messageDiv = document.getElementById(uniqueId);

  //loading the message
  loader(messageDiv);

  // fetch data from the server (get the bot's response)
  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  // want to clear the interval and the message so that we can add in our method
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  // if we have a successful API request
  if (response.ok) {
    // we get the response from the API
    const data = await response.json();
    // we parse it
    const parsedData = data.bot.trim();
    // we pass it to typeText
    typeText(messageDiv, parsedData);
  }
  // if we have an unsuccessful API request, we print that and run an alert
  else {
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong.";
    alert(err);
  }
}

// if the user clicks submit or enter, we call the handleSubmit function
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
})