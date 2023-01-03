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

  const teamDetailRows = [
    {
      label: "Team Full Name",
      value: teamFullName,
    },
    {
      label: "Total Games in 2021",
      value: totalGames,
    },
    {
      label: "Random Game Details:",
    },
    {
      label: "Date",
      value: formattedDate,
    },
    {
      label: "Home Team",
      value: teamFullName,
    },
    {
      label: "Home Team Score",
      value: homeTeamScore,
    },
    {
      label: "Visitor Team",
      value: visitorTeamName,
    },
    {
      label: "Visitor Team Score",
      value: visitorTeamScore,
    },
  ];

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
        {teamDetailRows.map(({ label, value }) => {
          if (!value) {
            return (
              <Row>
                <Col xs="10" className="bold">
                  {label}
                </Col>
              </Row>
            );
          }
          return (
            <Row>
              <Col xs="6">{label}</Col>
              <Col xs="6">{value}</Col>
            </Row>
          );
        })}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideDrawer;
