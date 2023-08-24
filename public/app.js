const socket = io();

const messagesContainer = document.getElementById('messages');
const usernameInput = document.getElementById('usernameInput');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let username = '';

usernameInput.addEventListener('change', () => {
  username = usernameInput.value.trim();
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '' && username !== '') {
    socket.emit('message', { username, message }); // Send both username and message
    messageInput.value = '';
  }
});

socket.on('message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.textContent = `${data.username}: ${data.message}`; // Display username with the message
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
