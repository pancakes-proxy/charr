let currentUsername = '';
let connectedUsers = [];

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
  const drone = new ScaleDrone('gn2OTiC1LG19oX5n');

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
    });

    room.on('data', (message, member) => {
      // Process incoming messages
      console.log(member.id, message);
    });
  });
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

// Event listener for ";+/"
document.addEventListener('keydown', (event) => {
  if (event.key === ';') {
    document.addEventListener('keydown', (event) => {
      if (event.key === '/') {
        authenticateAdmin();
      }
    }, { once: true });
  }
});

// Check if the user is kicked on page load
checkIfKicked();

// Connect user on page load (replace 'username' with actual username handling logic)
connectUser('username');
