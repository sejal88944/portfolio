import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import chatify from "../../Assets/Projects/chatify.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="prescipto-Website"
              description="This project is a responsive Bootstrap web application that provides health, wellness, or yoga-related information with interactive text-to-speech audio playback and custom styling. Designed to be visually appealing, mobile-friendly, and easy to navigate."
              ghLink="https://github.com/sejal88944/prescipto_clientside"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Portfolio website"
              description="Full Stack Developer skilled in React, Node.js, Express, MongoDB, and MySQL.
                I build responsive web applications with clean UI, efficient backend logic, and real-world functionality."
              ghLink="https://github.com/sejal88944/portfolio.git"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
