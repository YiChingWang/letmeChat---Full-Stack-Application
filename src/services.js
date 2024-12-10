const BASE_URL = "/api";

export function createChat(username, expireTime) {
  return fetch(`${BASE_URL}/createChat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, expireTime }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.error || "Failed to create chatroom.");
      });
    }
    return response.json();
  });
}
export function joinChat(username, roomId) {
  return fetch(`${BASE_URL}/joinChat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, roomId }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.error || "Failed to join chatroom.");
      });
    }
    return response.json();
  });
}
export function leaveGroup(username, roomId) {
  return fetch(`${BASE_URL}/leaveGroup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, roomId }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((data) => {
        throw new Error(data.error);
      });
    }
    return response.json();
  });
}
export function logout() {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((data) => {
        throw new Error(data.error || "Failed to logout.");
      });
    }
    return response.json();
  });
}
export function sendMessage(username, roomId, message) {
  return fetch(`${BASE_URL}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, roomId, message }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((data) => {
        throw new Error(data.error || "Failed to send message.");
      });
    }
    return response.json();
  });
}
export function fetchMessages(roomId) {
  return fetch(`${BASE_URL}/chatrooms/${roomId}/messages`, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((data) => {
        throw new Error(data.error || "Failed to fetch messages.");
      });
    }
    return response.json();
  });
}
export function getChatroomDetails(roomId) {
  return fetch(`${BASE_URL}/chatrooms/${roomId}`, {
    method: "GET",
    credentials: "include",
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((data) => {
        throw new Error(data.error || "Failed to fetch chatroom details.");
      });
    }
    return response.json();
  });
}
export function cancelGroup(username, roomId) {
  return fetch(`${BASE_URL}/cancelGroup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, roomId }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    }
    return response.json();
  });
}
export function checkChatroomStatus(roomId) {
  return fetch(`${BASE_URL}/chatroomStatus/${roomId}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Chatroom not found or cancelled.");
        }
        throw new Error("Failed to fetch chatroom status.");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error checking room status:", error);
      throw error;
    });
}
export function checkRoomExpiration(roomId) {
  return fetch(`${BASE_URL}/chatrooms/${roomId}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 410) {
        throw new Error("Room has expired.");
      } else if (!response.ok) {
        throw new Error("Failed to fetch chatroom details.");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching room details:", error);
      throw error;
    });
}
