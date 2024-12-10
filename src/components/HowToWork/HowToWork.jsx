import Header from "../Header/Header";
import "./HowToWork.css";
function HowToWork({ onNavigate }) {
  return (
    <>
      <Header onNavigate={onNavigate} />
      <div className="howtowork-title">
        <h1 className="howtowork-title-content">How to use LemeChat?</h1>
        <p className="howtowork-title-content">
          Learn how to create, join, and manage chat groups effortlessly.
        </p>
      </div>
      <div className="howtowork">
        <div className="howtowork-section">
          <h2 className="howtowork-section-rightside-title">
            Create a Chat Room
          </h2>
          <img
            className="howtowork-section-rightside-img"
            src="/section1.gif"
          ></img>
          <div className="howtowork-section-rightside">
            <p>
              To start a new chat, click the
              <span className="howtowork-point"> "Create Chat" </span>
              button on the main page. You will need to enter your username and
              set a group expiration time.
            </p>
          </div>
          <img
            className="howtowork-section-rightside-img"
            src="/roomid.png"
          ></img>
          <div className="howtowork-section-rightside">
            <p>
              After creating the chat room, you will see a unique
              <span className="howtowork-point"> Room ID</span>. Share this ID
              with your friends so they can join your group.
            </p>
          </div>
          <img
            className="howtowork-section-rightside-img"
            src="/cancelgroup.png"
          ></img>
          <div className="howtowork-section-rightside">
            <p>
              As the creator, you will also see a
              <span className="howtowork-point"> "Delete Group" </span> button,
              allowing you to cancel the group at any time. Only the group
              creator has this ability.
            </p>
          </div>
        </div>
        <div className="howtowork-section">
          <h2 className="howtowork-section-rightside-title">
            Join an Existing Chat Room
          </h2>
          <img
            className="howtowork-section-rightside-img"
            src="/section2.gif"
          ></img>
          <div className="howtowork-section-rightside">
            <p>
              If someone has shared a{" "}
              <span className="howtowork-point">Room ID </span>
              with you, you can join their chat room.
            </p>
            <p>
              Simply click the{" "}
              <span className="howtowork-point">"Join Chat" </span>
              button on the main page, then fill in the form with your username
              and the provided Room ID.
            </p>
            <p>
              Once inside, you'll be able to see the member list, send messages,
              and participate in the group chat.
            </p>
          </div>
        </div>
        <div className="howtowork-section">
          <h2 className="howtowork-section-rightside-title">
            Buttons and Their Functions
          </h2>
          <img
            className="howtowork-section-rightside-img"
            src="button.png"
          ></img>
          <div className="howtowork-section3-rightside">
            <p className="howtowork-section3-rightside-content">
              Here is an overview of the main buttons and their actions:
            </p>
            <ul>
              <li className="howtowork-section3-rightside-button">
                <span className="howtowork-point">Delete Group </span>:
                Available only to the group creator, this button allows the
                creator to cancel the group entirely.
              </li>
              <li className="howtowork-section3-rightside-button">
                <span className="howtowork-point">Exit Group </span>: Use this
                to leave the current group chat. Your username will be removed
                from the
                <span className="howtowork-point"> Member List </span>, and you
                will no longer participate in the group.
              </li>
              <li className="howtowork-section3-rightside-button">
                <span className="howtowork-point">Logout </span>: Click this to
                log out of the application completely.
              </li>
              <li className="howtowork-section3-rightside-button">
                <span className="howtowork-point">Back to Home </span>: This
                will return you to the main page where you can create or join
                another chat room.
              </li>
            </ul>
          </div>
        </div>
        <div className="howtowork-section4">
          <div className="howtowork-section4-rightside">
            <h2 className="howtowork-section-rightside-title">
              You're Ready to Chat!
            </h2>
            <p>
              Now that you understand how to create and join chats, as well as
              manage group settings, you're ready to start connecting with
              friends. Enjoy using the application!
            </p>
          </div>
        </div>
        <button className="howtowork-button" onClick={() => onNavigate("main")}>
          Back to Home
        </button>
      </div>
    </>
  );
}
export default HowToWork;
