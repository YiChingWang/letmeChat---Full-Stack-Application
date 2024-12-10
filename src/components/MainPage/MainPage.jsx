import { useState } from "react";
import JoinChat from "../JoinChat/JoinChat";
import CreateChat from "../CreateChat/CreateChat";
import Header from "../Header/Header";
import About from "../About/About";
import HowToWork from "../HowToWork/HowToWork";

import "../MainPage/MainPage.css";

function MainPage() {
  const [currentPage, setCurrentPage] = useState("main");

  return (
    <div className="main">
      {currentPage === "joinChat" && (
        <JoinChat onBackToMain={() => setCurrentPage("main")} />
      )}
      {currentPage === "createChat" && (
        <CreateChat onBackToMain={() => setCurrentPage("main")} />
      )}
      {currentPage === "about" && (
        <About
          onBackToMain={() => setCurrentPage("main")}
          onNavigate={setCurrentPage}
        />
      )}
      {currentPage === "howtowork" && (
        <HowToWork
          onBackToMain={() => setCurrentPage("main")}
          onNavigate={setCurrentPage}
        />
      )}
      {currentPage === "main" && (
        <>
          <Header onNavigate={setCurrentPage} />
          <div className="mainpage">
            <div className="mainpage-content">
              <p className="mainpage-title">
                A time-limited hub for instant, meaningful, and impactful group
                connections.
              </p>
              <p className="mainpage-subtitle">
                It's time to Chat with LetmeChat!
              </p>
              <div className="mainpage-buttons">
                <button
                  className="mainpage-button-createchat"
                  onClick={() => setCurrentPage("createChat")}
                >
                  Create Chat
                </button>
                <button
                  className="mainpage-button-joinchat"
                  onClick={() => setCurrentPage("joinChat")}
                >
                  Join Chat
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;
