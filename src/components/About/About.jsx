import Header from "../Header/Header";
import "./About.css";
function About({ onNavigate }) {
  return (
    <>
      <Header onNavigate={onNavigate} />
      <h1 className="about-title">About LetmeChat.</h1>
      <div className="about">
        <div className="about-contents">
          <p className="about-content">
            LetmeChat is a temporary group chat application designed to address
            a common challenge many of us face when organizing events or outings
            with friends or classmates. Often, we create group chats to
            coordinate activities, but these groups become inactive and
            cluttered after the event ends. On the other hand, not having a
            group chat can lead to disorganized communication, making planning
            difficult.
          </p>
          <p className="about-content">
            To solve these issues, I created LetmeChat. This application allows
            users to create event-specific chatrooms with an expiration time.
            The event organizer can generate a chatroom, set an expiration time,
            and receive a unique Room ID. Other participants can then join the
            chatroom using the Room ID, where they can communicate with the
            group and stay informed about the event details.
          </p>
          <p className="about-content">
            Within the chatroom, participants can see a list of members, view
            chat messages, and share updates—essentially creating a central hub
            for event communication. Once the expiration time is reached, the
            chatroom automatically deletes itself, eliminating the hassle of
            manually removing unused groups and preventing the accumulation of
            inactive chats.
          </p>
          <p className="about-content">
            LetmeChat streamlines communication, ensures better coordination,
            and keeps group discussions focused and temporary. It’s the perfect
            solution for hassle-free event planning!
          </p>
        </div>
        <button className="about-button" onClick={() => onNavigate("main")}>
          Back to Home
        </button>
      </div>
    </>
  );
}
export default About;
