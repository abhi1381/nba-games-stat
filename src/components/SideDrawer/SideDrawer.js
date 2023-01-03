import React from "react";
import { Col, Row } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

function SideDrawer({
  teamDetails,
  showTeamDetails,
  handleClose,
  isScrollable,
  placement,
}) {
  const {
    home_team: { name: teamName, full_name: teamFullName } = {},
    total_games: totalGames,
    date,
    home_team_score: homeTeamScore,
    visitor_team: { full_name: visitorTeamName } = {},
    visitor_team_score: visitorTeamScore,
  } = teamDetails || {};

  const formattedDate = date?.split("T")[0];

  return (
    <Offcanvas
      show={showTeamDetails}
      onHide={handleClose}
      scroll={isScrollable}
      placement={placement}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{teamName}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          <Col xs="6">Team Full Name</Col>
          <Col xs="6">{teamFullName}</Col>
        </Row>
        <Row>
          <Col xs="6">Total Games in 2021</Col>
          <Col xs="6">{totalGames}</Col>
        </Row>
        <Row>
          <Col xs="10" className="bold">
            Random Game Details:
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">
            Date
          </Col>
          <Col xs="6" className="bold">
            {formattedDate}
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">
            Home Team
          </Col>
          <Col xs="6" className="bold">
            {teamFullName}
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">
            Home Team Score
          </Col>
          <Col xs="6" className="bold">
            {homeTeamScore}
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">
            Visitor Team
          </Col>
          <Col xs="6" className="bold">
            {visitorTeamName}
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="bold">
            Visitor Team Score
          </Col>
          <Col xs="6" className="bold">
            {visitorTeamScore}
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideDrawer;
