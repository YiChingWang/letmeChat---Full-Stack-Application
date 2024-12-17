import { useState, useEffect } from "react";
import "./Chatroom.css";
import {
  leaveGroup,
  cancelGroup,
  logout,
  sendMessage,
  fetchMessages,
  checkChatroomStatus,
  checkRoomExpiration,
} from "../../services";

function Chatroom({
  roomId,
  username,
  userList: initialUserList,
  expirationTime,
  onBackToMain,
}) {
  const [userList, setUserList] = useState(initialUserList || []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isExpired, setIsExpired] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const checkRoomStatus = () => {
      checkChatroomStatus(roomId)
        .then(() => {
          setIsCancelled(false);
        })
        .catch((error) => {
          if (error.message === "Chatroom not found or cancelled.") {
            setIsExpired(true);
          } else {
            console.error(error.message);
          }
        });
    };

    const interval = setInterval(checkRoomStatus, 5000);
    return () => clearInterval(interval);
  }, [roomId]);

  useEffect(() => {
    if (isCancelled) {
      onBackToMain();
    }
  }, [isCancelled, onBackToMain]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(roomId)
        .then((data) => {
          setMessages(data.data || []);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkRoomExpiration(roomId)
        .then((data) => {
          if (data && data.data.userList) {
            setUserList(data.data.userList);
          }
        })
        .catch((error) => {
          if (error.message === "Room has expired.") {
            setIsExpired(true);
          } else {
            console.error("Error checking room expiration:", error);
          }
        });
    }, 5000);

    return () => clearInterval(interval);
  }, [roomId]);

  useEffect(() => {
    if (isExpired) {
      setMessage("Room Expired");
      setTimeout(() => {
        onBackToMain();
      }, 3000);
    }
  }, [isExpired, onBackToMain]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!currentMessage.trim()) {
      setStatusMessage("Message cannot be empty.");
      return;
    }

    sendMessage(username, roomId, currentMessage)
      .then(() => {
        setCurrentMessage("");
        setStatusMessage("");
        return fetchMessages(roomId);
      })
      .then((updatedMessages) => setMessages(updatedMessages))
      .catch((error) => {
        console.error("Error sending message:", error);
        setStatusMessage(`Error: ${error.message}`);
      });
  };

  const handleLeaveGroup = () => {
    leaveGroup(username, roomId)
      .then((data) => {
        setMessage("You have left the group.");
        setUserList(data.data.userList);
        onBackToMain();
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        setMessage("Logged out successfully.");
        onBackToMain();
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        setMessage(`Error: ${error.message}`);
      });
  };

  const handleCancelGroup = () => {
    cancelGroup(username, roomId)
      .then(() => {
        setTimeout(() => onBackToMain(), 2000);
      })
      .catch((error) => {
        console.error("Error cancelling group:", error);
        setMessage(`Error: ${error.message}`);
      });
  };

  if (isExpired) {
    return (
      <div className="roomexpire">
        <div className="roomexpire-contents">
          <h1 className="roomexpire-title">Room Expired</h1>
          <p className="roomexpire-content">Redirecting to the main page...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="chatroom">
      <button
        className="chatroom-toggle-menu"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? "Hide Menu" : "Show Menu"}
      </button>
      <div className={`chatroom-leftside ${showMenu ? "visible" : "hidden"}`}>
        <h1 className="chatroom-leftside-title">Welcome to Chatroom!</h1>

        <div className="chatroom-buttons">
          <p className="chatroom-subtitle">Account setting</p>
          {username === userList[0] && (
            <button
              className="chatroom-button-cancelgroup"
              onClick={handleCancelGroup}
            >
              Delete Group
            </button>
          )}
          <button
            className="chatroom-button-leavegroup"
            onClick={handleLeaveGroup}
          >
            Exit Group
          </button>
          <button className="chatroom-button-logout" onClick={handleLogout}>
            Logout
          </button>
          <button
            className="chatroom-button-backtomainpage"
            onClick={onBackToMain}
          >
            Back to Home
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
      <div className={`chatroom-middleside ${showMenu ? "visible" : "hidden"}`}>
        <div className="chatroom-middleside-info">
          <p className="chatroom-middleside-title">Room Information</p>
          <p className="chatroom-middleside-roomid">Room ID: {roomId}</p>
        </div>
        <div className="chatroom-middleside-showtime">
          <p className="chatroom-middleside-time">
            Room Expiration Time: {new Date(expirationTime).toLocaleString()}
          </p>
        </div>
        <div className="chatroom-middleside-members">
          <p className="chatroom-middleside-members-title">Member List</p>
          <ul className="chatroom-middleside-members-users">
            {userList.map((user, index) => (
              <li className="chatroom-middleside-members-member" key={index}>
                <div className="chatroom-middleside-members-icon"></div>
                <p className="chatroom-middleside-members-user">{user}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="chatroom-rightside">
        <h2 className="chatroom-rightside-title">Messages</h2>
        <div className="chatroom-rightside-messages">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg, index) => (
              <div className="chatroom-rightside-message" key={index}>
                <p className="chatroom-rightside-message-sender">
                  {msg.sender}
                </p>
                <p className="chatroom-rightside-message-content">
                  {msg.content}
                </p>
                <p className="chatroom-rightside-message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))
          ) : Array.isArray(messages) && messages.length === 0 ? (
            <p>No messages available</p>
          ) : (
            <p>Loading messages...</p>
          )}
        </div>
        <form className="chatroom-rightside-form" onSubmit={handleSendMessage}>
          <input
            className="chatroom-rightside-form-input"
            type="text"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
              setStatusMessage("");
            }}
            placeholder="Type your message"
          />
          <button
            className="chatroom-rightside-form-button-submit"
            type="submit"
          >
            Send
          </button>
          {statusMessage && (
            <p className="chatroom-rightside-form-button-error">
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Chatroom;
