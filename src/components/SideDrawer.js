import React from "react";
import { Col, Row } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

function SideDrawer({
  teamDetails,
  showTeamDetails,
  handleClose,
  isScrollable,
  placement
}) {
  return (
    <Offcanvas
      show={showTeamDetails}
      onHide={handleClose}
      scroll={isScrollable}
      placement={placement}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{teamDetails.home_team.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          <Col xs="6">Team Full Name</Col>
          <Col xs="6">{teamDetails.home_team.full_name}</Col>
        </Row>
        <Row>
          <Col xs="6">Total Games in 2021</Col>
          <Col xs="6">{teamDetails.total_games}</Col>
        </Row>
        <Row>
          <Col xs="10" className="bold">Random Game Details:</Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">Date</Col>
          <Col xs="6" className="bold">{teamDetails.date.split("T")[0]}</Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">Home Team</Col>
          <Col xs="6" className="bold">{teamDetails.home_team.full_name}</Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">Home Team Score</Col>
          <Col xs="6" className="bold">{teamDetails.home_team_score}</Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">Visitor Team</Col>
          <Col xs="6" className="bold">{teamDetails.visitor_team.full_name}</Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">Visitor Team Score</Col>
          <Col xs="6" className="bold">{teamDetails.visitor_team_score}</Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideDrawer;
