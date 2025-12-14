import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import editor from "../../Assets/Projects/codeEditor.png";
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
              title="Online Complaint Registration And Management System"
              description="A web-based Complaint Management System that allows users to register and track complaints, while admins can manage and resolve them. Built using Node.js, Express, and MongoDB, enabling efficient handling of complaint data with a backend API for database operations."
              ghLink="https://github.com/Adityajamdade1/MY-Project"
              demoLink="https://github.com/Adityajamdade1/MY-Project/blob/main/Video.mp4"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Tic-Tac-Toe-Game"
              description="Interactive Tic-Tac-Toe game developed using HTML, CSS, and JavaScript — featuring responsive UI, real-time win detection, and reset functionality."
              ghLink="https://github.com/Adityajamdade1/Tic-Tac-Toe-Game"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
