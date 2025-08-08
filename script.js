// Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBjkfyIFZl_qRJBzKn9o1c8aOQtned_1Sk",
  authDomain: "real-time-chat-a8f81.firebaseapp.com",
  databaseURL: "https://real-time-chat-a8f81-default-rtdb.firebaseio.com",
  projectId: "real-time-chat-a8f81",
  storageBucket: "real-time-chat-a8f81.firebasestorage.app",
  messagingSenderId: "464983298559",
  appId: "1:464983298559:web:0bfbbc3f1cdddf947497ca",
  measurementId: "G-VHQPQTE3RR"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Send Message
function sendMessage() {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;

    if (username && message) {
        let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        db.ref("messages").push({
            name: username,
            text: message,
            time: time
        });

        document.getElementById("message").value = "";
    }
}

// function sendMessage() {
//     let username = document.getElementById("username").value;
//     let message = document.getElementById("message").value;

//     if (username && message) {
//         db.ref("messages").push({
//             name: username,
//             text: message
//         });
//         document.getElementById("message").value = "";
//     }
// }
// Store username color mapping
let userColors = {};

function getUserColor(username) {
    if (!userColors[username]) {
        // Generate a random color
        userColors[username] = "#" + Math.floor(Math.random()*16777215).toString(16);
    }
    return userColors[username];
}


// Listen for new messages
// db.ref("messages").on("child_added", (snapshot) => {
//     let data = snapshot.val();
//     let chatBox = document.getElementById("chat-box");
//     chatBox.innerHTML += `<div class="message"><strong>${data.name}:</strong> ${data.text}</div>`;
//     chatBox.scrollTop = chatBox.scrollHeight;
// });
db.ref("messages").on("child_added", (snapshot) => {
    let data = snapshot.val();
    let chatBox = document.getElementById("chat-box");
    let color = getUserColor(data.name);

    chatBox.innerHTML += `
        <div class="message">
            <strong style="color:${color}">${data.name}:</strong> 
            ${data.text} 
            <span class="timestamp">${data.time}</span>
        </div>`;
    
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
});
