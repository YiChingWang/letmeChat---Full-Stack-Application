import express from "express";
import cookieParser from "cookie-parser";
import chatrooms from "./data/chatroom.js";
import sessions from "./data/sessions.js";
import users from "./data/user.js";

const app = express();
const port = 3000;

app.use(express.static("./dist"));
app.use(express.json());
app.use(cookieParser());

app.post("/api/createChat", (req, res) => {
  const { username, expireTime } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username.toLowerCase() === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  if (!expireTime || new Date(expireTime) <= new Date()) {
    res.status(400).json({ error: "Invalid or expired time." });
    return;
  }

  let userData = users.getUserData(username);
  if (!userData) {
    users.addUserData(username, { username });
    userData = users.getUserData(username);
  }

  let sid = req.cookies.sid;
  if (!sid || !sessions.getSessionUser(sid)) {
    sid = sessions.addSession(username);
    res.cookie("sid", sid);
  }

  const roomId = chatrooms.generateUniqueChatroomId();

  chatrooms.addChatroom(roomId, {
    creator: username,
    expirationTime: expireTime,
    userList: [username],
  });

  res.status(200).json({
    message: "Chatroom created successfully.",
    data: {
      roomId,
      userList: chatrooms.getChatroom(roomId).userList,
      expirationTime: expireTime,
      userData,
    },
  });
});

app.post("/api/joinChat", (req, res) => {
  const { username, roomId } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: "Invalid username." });
    return;
  }

  if (username.toLowerCase() === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  let userData = users.getUserData(username);
  if (!userData) {
    users.addUserData(username, { username });
    userData = users.getUserData(username);
  }

  let sid = req.cookies.sid;
  if (!sid || !sessions.getSessionUser(sid)) {
    sid = sessions.addSession(username);
    res.cookie("sid", sid, { httpOnly: true });
  }

  if (!chatrooms.isChatroomValid(roomId)) {
    res.status(404).json({ error: "Room ID does not exist or is expired." });
    return;
  }

  const chatroom = chatrooms.getChatroom(roomId);
  if (!chatroom) {
    res.status(404).json({ error: "Room does not exist." });
    return;
  }

  if (!chatroom.userList.includes(username)) {
    chatroom.userList.push(username);
  }

  res.status(200).json({
    message: "Successfully joined chatroom.",
    data: {
      roomId,
      userList: chatroom.userList,
      expirationTime: chatroom.expirationTime,
      userData,
    },
  });
});

app.post("/api/leaveGroup", (req, res) => {
  const { username, roomId } = req.body;

  if (!username || username.trim() === "") {
    res.status(400).json({ error: "Invalid username." });
    return;
  }

  const chatroom = chatrooms.getChatroom(roomId);
  if (!chatroom || new Date(chatroom.expirationTime) <= new Date()) {
    res.status(404).json({ error: "Room does not exist or is expired." });
    return;
  }

  if (!chatroom.userList.includes(username)) {
    res.status(400).json({ error: "User is not a member of the chatroom." });
    return;
  }

  chatrooms.removeUserFromChatroom(roomId, username);
  res.status(200).json({
    message: "Successfully left the chatroom.",
    data: {
      roomId,
      userList: chatroom.userList,
    },
  });
});

app.post("/api/cancelGroup", (req, res) => {
  const { username, roomId } = req.body;

  const chatroom = chatrooms.getChatroom(roomId);
  if (!chatroom) {
    res.status(404).json({ error: "Room does not exist." });
    return;
  }

  if (chatroom.creator !== username) {
    res.status(403).json({ error: "Only the creator can cancel the group." });
    return;
  }

  chatrooms.removeChatroom(roomId);

  res.status(200).json({
    message: "Chatroom cancelled successfully.",
  });
});

app.post("/api/logout", (req, res) => {
  const { sid } = req.cookies;

  if (!sid || !sessions.getSessionUser(sid)) {
    res.status(401).json({ error: "No active session to logout." });
    return;
  }

  sessions.deleteSession(sid);

  res.clearCookie("sid");

  res.status(200).json({
    message: "Successfully logged out.",
  });
});

app.post("/api/sendMessage", (req, res) => {
  const { username, roomId, message } = req.body;

  if (!message || message.trim() === "") {
    res.status(400).json({ error: "Message cannot be empty." });
    return;
  }

  const chatroom = chatrooms.getChatroom(roomId);
  if (!chatroom) {
    res.status(404).json({ error: "Chatroom does not exist." });
    return;
  }

  if (!chatroom.userList.includes(username)) {
    res.status(403).json({ error: "User is not a member of this chatroom." });
    return;
  }

  chatrooms.addMessageToChatroom(roomId, username, message);

  res.status(200).json({
    message: "Message sent successfully.",
    data: {
      roomId,
      username,
      message,
    },
  });
});

app.get("/api/chatrooms/:roomId", (req, res) => {
  const { roomId } = req.params;

  const chatroom = chatrooms.getChatroom(roomId);

  if (!chatroom) {
    res.status(404).json({ error: "Room does not exist." });
    return;
  }

  if (new Date(chatroom.expirationTime) <= new Date()) {
    res.status(410).json({ error: "Room expired." });
    return;
  }

  res.status(200).json({
    message: "Chatroom details fetched successfully.",
    data: {
      roomId,
      userList: chatroom.userList,
      expirationTime: chatroom.expirationTime,
    },
  });
});

app.get("/api/chatrooms/:roomId/messages", (req, res) => {
  const { roomId } = req.params;

  const chatroom = chatrooms.getChatroom(roomId);
  if (!chatroom) {
    res.status(404).json({ error: "Chatroom does not exist." });
    return;
  }

  res.status(200).json({
    message: "Messages fetched successfully.",
    data: chatrooms.getChatroomMessages(roomId),
  });
});

app.get("/api/chatroomStatus/:roomId", (req, res) => {
  const { roomId } = req.params;

  const chatroom = chatrooms.getChatroom(roomId);
  if (!chatroom) {
    res
      .status(404)
      .json({ error: "Room does not exist or has been cancelled." });
    return;
  }

  res.status(200).json({
    message: "Chatroom is active.",
  });
});

app.listen(port, (req, res) => {
  console.log(`Listening on http://localhost:${port}`);
});
