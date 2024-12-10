import { useState } from "react";
import Chatroom from "../Chatroom/Chatroom";
import { joinChat } from "../../services";
import "./JoinChat.css";

function JoinChat({ onBackToMain }) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [chatroomData, setChatroomData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    joinChat(username, roomId)
      .then((data) => {
        setMessage("");
        setChatroomData({
          roomId: data.data.roomId,
          username,
          userList: data.data.userList,
          expirationTime: data.data.expirationTime,
        });
      })
      .catch((err) => {
        if (err.message === "auth-insufficient") {
          setMessage("'dog' is not valid.");
        } else if (err.message === "required-username") {
          setMessage("Invalid username, please type again.");
        } else {
          setMessage(err.message || "An unexpected error occurred.");
        }
      });
  };
  if (chatroomData) {
    return (
      <Chatroom
        roomId={chatroomData.roomId}
        username={chatroomData.username}
        userList={chatroomData.userList}
        expirationTime={chatroomData.expirationTime}
        onBackToMain={onBackToMain}
      />
    );
  }

  return (
    <div className="joinchat">
      <div className="joinchat-content">
        <div className="joinchat-leftside">
          <p className="joinchat-logo">LetmeChat.</p>
        </div>
        <div className="joinchat-rightside">
          <form className="joinchat-form" onSubmit={handleSubmit}>
            <h1 className="joinchat-title">Join Chat</h1>
            <div className="joinchat-form-username">
              <label className="joinchat-form-username-label">Username</label>
              <input
                className="joinchat-form-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Type your name"
                required
              />
            </div>
            <div className="joinchat-form-roomid">
              <label className="joinchat-form-roomid-label">Room ID </label>
              <input
                className="joinchat-form-roomid-input"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Type your room id"
                required
              />
            </div>
            {message && <p className="joinchat-form-errormessage">{message}</p>}
            <button className="joinchat-form-button-joinchat" type="submit">
              Join Chat
            </button>
            <button
              className="creatchat-form-button-backtomain"
              type="button"
              onClick={onBackToMain}
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JoinChat;
