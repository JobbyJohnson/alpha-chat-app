const socket = io();

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    socket.emit('message', message);
    messageInput.value = '';
  }
});

socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
