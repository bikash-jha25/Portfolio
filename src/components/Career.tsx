import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Education */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech — Information Technology</h4>
                <h5>Netaji Subhash Engineering College, Kolkata</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Pursuing B.Tech in Information Technology (Aug 2023 – May 2027)
              with a CGPA of 8.6/10. Coursework includes DSA, DBMS, Operating
              Systems, Computer Networks, OOP, and Software Engineering.
            </p>
          </div>

          {/* Competitive Programming */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Competitive Programmer</h4>
                <h5>LeetCode &amp; GeeksforGeeks</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Solved 500+ DSA problems across LeetCode and GeeksforGeeks.
              Strong problem-solving skills in Graphs, Trees, Dynamic
              Programming, Greedy Algorithms, and Binary Search.
            </p>
          </div>

          {/* Full Stack Experience */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>College Management Platform</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Jan 2024 – Aug 2024 · Built responsive React.js interfaces,
              RESTful APIs with Node.js &amp; Express.js, MongoDB CRUD with
              JWT-based authentication. Followed clean coding practices using
              Git/GitHub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
