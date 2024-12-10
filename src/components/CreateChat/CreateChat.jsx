import React, { useState } from "react";
import Chatroom from "../Chatroom/Chatroom";
import { createChat } from "../../services";
import "./createchat.css";

function CreateChat({ onBackToMain }) {
  const [username, setUsername] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [message, setMessage] = useState("");
  const [chatroomData, setChatroomData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    createChat(username, expireTime)
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
    <>
      <div className="createchat">
        <div className="createchat-content">
          <div className="creatchat-leftside">
            <p className="creatchat-logo">LetmeChat.</p>
          </div>
          <div className="creatchat-rightside">
            <form className="creatchat-form" onSubmit={handleSubmit}>
              <h1 className="creatchat-title">Create Chat</h1>
              <div className="creatchat-form-username">
                <label className="creatchat-form-username-label">
                  Username
                </label>
                <input
                  className="creatchat-form-username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Type your username"
                  required
                />
              </div>
              <div className="creatchat-form-time">
                <label className="creatchat-form-time-label">
                  Expiration Time
                </label>
                <input
                  type="datetime-local"
                  value={expireTime}
                  onChange={(e) => setExpireTime(e.target.value)}
                  required
                />
              </div>
              {message && (
                <p className="creatchat-form-errormessage">{message}</p>
              )}
              <button
                className="creatchat-form-button-createchat"
                type="submit"
              >
                Create Chat
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
    </>
  );
}

export default CreateChat;
