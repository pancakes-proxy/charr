let currentUsername = '';
let connectedUsers = [];
let drone;

// Function to generate a random username
function generateUsername() {
  return `user-${Math.floor(Math.random() * 1000) + 1}`;
}

// Function to connect a user
function connectUser(username) {
  currentUsername = username;
  if (!connectedUsers.includes(username)) {
    connectedUsers.push(username);
  }
}

// Function to disconnect a user
function disconnectUser() {
  connectedUsers = connectedUsers.filter(user => user !== currentUsername);
}

// Function to check if the user is kicked
function checkIfKicked() {
  const kicked = localStorage.getItem('kicked');
  if (kicked) {
    window.location.href = 'https://www.google.com';
  } else {
    initializeChat();
  }
}

// Initialize ScaleDrone chat if user is not kicked
function initializeChat() {
  drone = new ScaleDrone('gn2OTiC1LG19oX5n', {
    data: {
      username: currentUsername
    }
  });

  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }

    const room = drone.subscribe('chat-room');

    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      console.log('Connected to chat room');
      document.getElementById('chat').style.display = 'block';
      document.getElementById('moderation-menu').style.display = 'block';
    });

    room.on('data', (message, member) => {
      // Process incoming messages
      const chatBox = document.getElementById('chat-box');
      const newMessage = document.createElement('div');
      newMessage.textContent = `${member.clientData.username}: ${message}`;
      chatBox.appendChild(newMessage);

      // Check for /acc command to access moderation menu
      if (message === '/acc' && member.clientData.username === currentUsername) {
        authenticateAdmin();
      }
    });
  });
}

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById('message');
  const message = messageInput.value;
  if (message) {
    drone.publish({
      room: 'chat-room',
      message: message
    });
    messageInput.value = '';
  }
}

// Function to authenticate admin
function authenticateAdmin() {
  const username = prompt('Enter username:');
  const password = prompt('Enter password:');

  if (username === 'admin' && password === 'learnhelp.ccadmin134') {
    showModerationMenu();
  } else {
    alert('Incorrect credentials!');
  }
}

// Function to show moderation menu
function showModerationMenu() {
  const action = prompt(`Current user: ${currentUsername}\nEnter action: (kick [username], warn [username] [reason], list)`);

  if (action.startsWith('kick')) {
    const kickedUsername = action.split(' ')[1];
    if (currentUsername === kickedUsername) {
      localStorage.setItem('kicked', 'true');
      window.location.href = 'https://www.google.com';
    }
  }

  if (action.startsWith('warn')) {
    const parts = action.split(' ');
    const warnedUsername = parts[1];
    const reason = parts.slice(2).join(' ');
    if (currentUsername === warnedUsername) {
      alert(`A moderator has warned you for: ${reason}`);
    }
  }

  if (action === 'list') {
    alert(`Connected users: ${connectedUsers.join(', ')}`);
  }
}

// Check if the user is kicked on page load
checkIfKicked();

// Generate a username and connect the user
const username = generateUsername();
connectUser(username);
