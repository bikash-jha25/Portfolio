import "./styles/Landing.css";

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            BIKASH <span>JHA</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>A Creative</h3>
          <h2 className="landing-role-title">
            <span className="role-word word-dev">Developer</span>
            <span className="role-word word-eng">Engineer</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
