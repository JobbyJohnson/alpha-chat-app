const socket = io();

const messagesContainer = document.getElementById('messages');
const usernameInput = document.getElementById('usernameInput');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let username = '';

usernameInput.addEventListener('change', () => {
  username = usernameInput.value.trim();
});

// ... (previous code) ...

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      sendButton.click();
    }
  });
  
  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '' && username !== '') {
      const messageWithEmojis = replaceEmojis(message);
      socket.emit('message', { username, message: messageWithEmojis });
      messageInput.value = '';
    }
  });
  
socket.on('message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = `<strong>${data.username}:</strong> ${replaceEmojis(data.message)}`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

function replaceEmojis(message) {
  const emojiMap = {
    react: "⚛",
    woah: "😮",
    hey: "👋",
    lol: "😂",
    like: "❤️",
    congratulations: "🎉",
  };

  return message.replace(/\b(react|woah|hey|lol|like|congratulations)\b/gi, (match) => emojiMap[match.toLowerCase()] || match);
}
