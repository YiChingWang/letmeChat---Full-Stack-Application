# LetmeChat 📱💬

**LetmeChat** is a lightweight web application designed for temporary group chats. It enables users to create event-specific chatrooms with expiration times, ensuring efficient communication during events or activities and eliminating clutter from inactive group chats.

## 🚀 About LetmeChat

### Purpose

LetmeChat addresses the common problem of inactive group chats that remain after events or projects end. By allowing users to create temporary chatrooms with automatic expiration, it ensures seamless communication while keeping chat history focused and manageable.

## ✨ Features

### Create Temporary Chatrooms:

- Users can set an expiration time for the chatroom.
- A unique Room ID is generated for sharing with participants.

### Join Chatrooms:

- Use the Room ID to join an existing chatroom.
- Participants can view the member list and participate in group discussions.

### Automatic Expiration:

- Chatrooms automatically expire at the set time and are deleted, redirecting all participants to the main page.

### Management Options:

- **Delete Group:** The creator can manually delete the chatroom.
- **Exit Group:** Participants can leave the chatroom (removing their name from the member list).
- **Logout:** Users can log out without leaving the group.
- **Back to Home:** Redirect to the main page.

### Responsive Design:

- Fully optimized for desktop and mobile devices.

## 🎯 Use Cases

1. **Event Planning:**  
   Organize temporary chatrooms for event coordination. Automatically clean up chats after the event ends.
2. **Short-Term Projects:**  
   Ideal for temporary project teams requiring focused communication.
3. **Streamlined Communication:**  
   Ensure that only active participants remain in discussions while automatically handling cleanup.

## 🛠 Technology Stack

### Frontend

- **React.js**: For building interactive and dynamic UI.
- **CSS Modules**: For modular and scoped styling.
- **Responsive Design**: Ensures usability across devices.
- **JavaScript**:The core programming language used for logic, interactivity, and dynamic rendering.

### Backend

- **Node.js (Express)**: For RESTful API services.

### Tools and Libraries

- **npm**: For dependency management.

## 📦 Application Workflow

### User Flow

1. **Main Page:**  
   Choose to **Create Chat** or **Join Chat**.
2. **Create Chat:**
   - Enter a username and set an expiration time.
   - Receive a unique Room ID and enter the chatroom.
3. **Join Chat:**
   - Enter a username and Room ID to join an existing chatroom.
4. **Chatroom:**
   - View and send messages.
   - Access member lists and manage group settings (leave, logout, or delete group).

## 🛠 Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/letmechat.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd final
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Build the Project:**

   ```bash
   npm run build
   ```

5. **Start the Application:**

   ```bash
   npm start
   ```

Your site will be available at http://localhost:3000 (or another port specified in your configuration).

## 🧑‍💻 Contributor

- Name: Yi Ching Wang
- Contact: yichingwang0713@gmail.com

## 📜 License

LetmeChat is released under the MIT License. Feel free to use and contribute to the project.
