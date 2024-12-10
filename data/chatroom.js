import crypto from "crypto";

const chatrooms = {};

export function generateUniqueChatroomId() {
  return crypto.randomBytes(4).toString("hex");
}

export function addChatroom(roomId, data) {
  if (chatrooms[roomId]) {
    throw new Error(`Chatroom with ID '${roomId}' already exists.`);
  }
  chatrooms[roomId] = {
    userList: [data.creator],
    expirationTime: data.expirationTime || null,
    creator: data.creator,
    messages: [],
  };
}

export function getChatroom(roomId) {
  return chatrooms[roomId] || null;
}

export function isChatroomValid(roomId) {
  const chatroom = getChatroom(roomId);
  if (!chatroom) return false;
  return new Date(chatroom.expirationTime) > new Date();
}

export function addUserToChatroom(roomId, username) {
  const chatroom = getChatroom(roomId);
  if (!chatroom) {
    throw new Error(`Chatroom with ID '${roomId}' does not exist.`);
  }

  chatroom.userList = chatroom.userList || [];

  if (!chatroom.userList.includes(username)) {
    chatroom.userList.push(username);
  }
}

export function removeUserFromChatroom(roomId, username) {
  const chatroom = chatrooms[roomId];
  if (!chatroom) {
    throw new Error(`Chatroom with ID '${roomId}' does not exist.`);
  }

  chatroom.userList = chatroom.userList || [];

  chatroom.userList = chatroom.userList.filter((user) => user !== username);
}

export function addMessageToChatroom(roomId, username, message) {
  const chatroom = getChatroom(roomId);
  if (!chatroom) {
    throw new Error(`Chatroom with ID '${roomId}' does not exist.`);
  }

  chatroom.messages = chatroom.messages || [];

  chatroom.messages.push({
    sender: username,
    content: message,
    timestamp: new Date(),
  });
}

export function getChatroomMessages(roomId) {
  const chatroom = getChatroom(roomId);
  if (!chatroom) return [];
  return chatroom.messages;
}

export function cleanExpiredChatrooms() {
  const now = new Date();
  Object.keys(chatrooms).forEach((roomId) => {
    if (new Date(chatrooms[roomId].expirationTime) <= now) {
      delete chatrooms[roomId];
    }
  });
}

export function removeChatroom(roomId) {
  if (chatrooms[roomId]) {
    delete chatrooms[roomId];
  }
}

export default {
  generateUniqueChatroomId,
  addChatroom,
  getChatroom,
  isChatroomValid,
  addUserToChatroom,
  removeUserFromChatroom,
  addMessageToChatroom,
  getChatroomMessages,
  cleanExpiredChatrooms,
  removeChatroom,
};
