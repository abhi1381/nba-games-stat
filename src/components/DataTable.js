import React, { useState, useEffect } from "react";
import { Table, Pagination, Col } from "react-bootstrap";
import SideDrawer from "./SideDrawer";

const TEAMS_API_URL = "https://www.balldontlie.io/api/v1/teams";
const GAMES_API_URL = "https://www.balldontlie.io/api/v1/games";

function DataTable({ searchQuery }) {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamGame, setSelectedTeamGame] = useState([]);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const teamsPerPage = 10;

  useEffect(() => {
    fetch(`${TEAMS_API_URL}?page=${currentPage}&per_page=${teamsPerPage}`)
      .then((response) => response.json())
      .then((data) => setTeams(data.data))
      .catch((error) => console.log(error));
  }, [currentPage]);

  useEffect(() => {
    if (selectedTeamId) {
      fetch(`${GAMES_API_URL}?team_ids[]=${selectedTeamId}&seasons[]=2021`)
        .then((response) => response.json())
        .then((data) =>
          setSelectedTeamGame({
            ...data.data[Math.floor(Math.random() * data.data.length)],
            total_games: data.meta.total_count,
          })
        )
        .catch((error) => console.log(error));
    }
  }, [selectedTeamId]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
    setShowTeamDetails(true);
  };

  const handleClose = () => {
    setShowTeamDetails(false);
    setSelectedTeamId(null);
  };

  const getFilteredTeams = () => {
    let filteredTeams = teams;

    if (searchQuery.length > 1) {
      filteredTeams = filteredTeams.filter((team) =>
        team.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "name") {
      filteredTeams.sort((a, b) => {
        if (a.name < b.name) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a.name > b.name) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    } else if (sortBy === "city") {
      filteredTeams.sort((a, b) => {
        if (a.city < b.city) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a.city > b.city) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    } else if (sortBy === "conference") {
      filteredTeams.sort((a, b) => {
        if (a.conference < b.conference) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a.conference > b.conference) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    } else if (sortBy === "division") {
      filteredTeams.sort((a, b) => {
        if (a.division < b.division) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a.division > b.division) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredTeams;
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prevSortDirection) =>
        prevSortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  return (
    <Col className="mt-5" xs="10" md="10">
      <Table hover borderless responsive className="table">
        <thead className="t-head">
          <tr>
            <th onClick={() => handleSort("name")}>
              Team Name
              {sortBy === "name" && (
                <span>
                  {sortDirection === "asc" ? (
                    <img
                      src="ArrowUpSolid.svg"
                      alt="arrow-up"
                      width="20px"
                      height="20px"
                      className="arrow"
                    />
                  ) : (
                    <img
                      src="ArrowDownSolid.svg"
                      alt="arrow-down"
                      width="20px"
                      height="20px"
                      className="arrow"
                    />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("city")}>
              City
              {sortBy === "city" && (
                <span>
                  {sortDirection === "asc" ? (
                    <img
                      src="ArrowUpSolid.svg"
                      alt="arrow-up"
                      width="20px"
                      height="20px"
                    />
                  ) : (
                    <img
                      src="ArrowDownSolid.svg"
                      alt="arrow-down"
                      width="20px"
                      height="20px"
                    />
                  )}
                </span>
              )}
            </th>
            <th>Abbreviation</th>
            <th onClick={() => handleSort("conference")}>
              Conference
              {sortBy === "conference" && (
                <span>
                  {sortDirection === "asc" ? (
                    <img
                      src="ArrowUpSolid.svg"
                      alt="arrow-up"
                      width="20px"
                      height="20px"
                    />
                  ) : (
                    <img
                      src="ArrowDownSolid.svg"
                      alt="arrow-down"
                      width="20px"
                      height="20px"
                    />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("division")}>
              Division
              {sortBy === "division" && (
                <span>
                  {sortDirection === "asc" ? (
                    <img
                      src="ArrowUpSolid.svg"
                      alt="arrow-up"
                      width="20px"
                      height="20px"
                    />
                  ) : (
                    <img
                      src="ArrowDownSolid.svg"
                      alt="arrow-down"
                      width="20px"
                      height="20px"
                    />
                  )}
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {getFilteredTeams().map((team) => (
            <tr
              key={team.id}
              onClick={() => handleTeamClick(team.id)}
              className={`${team.id === selectedTeamId ? "selected" : ""}`}
            >
              <td>{team.name}</td>
              <td>{team.city}</td>
              <td>{team.abbreviation}</td>
              <td>{team.conference}</td>
              <td>{team.division}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="pagination-container">
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
        <Pagination.Item
          active={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
        <Pagination.Item
          active={currentPage === 2}
          onClick={() => handlePageChange(2)}
        >
          2
        </Pagination.Item>
        <Pagination.Item
          active={currentPage === 3}
          onClick={() => handlePageChange(3)}
        >
          3
        </Pagination.Item>
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
      </Pagination>
      {selectedTeamGame?.id ? (
        <SideDrawer
          teamDetails={selectedTeamGame}
          showTeamDetails={showTeamDetails}
          handleClose={handleClose}
          isScrollable
          placement="end"
        />
      ) : null}
    </Col>
  );
}

export default DataTable;
