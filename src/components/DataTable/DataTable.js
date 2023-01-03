import React, { useState, useEffect, useMemo } from "react";
import { Table, Pagination, Col } from "react-bootstrap";
import orderBy from "lodash.orderby";
import SideDrawer from "../SideDrawer/SideDrawer";

const TEAMS_API_URL = "https://www.balldontlie.io/api/v1/teams";
const GAMES_API_URL = "https://www.balldontlie.io/api/v1/games";

function DataTable({ searchQuery }) {
  const [teams, setTeams] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamGame, setSelectedTeamGame] = useState([]);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const teamsPerPage = 10;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `${TEAMS_API_URL}?page=${currentPage}&per_page=${teamsPerPage}`
        );
        const data = await response.json();
        setTeams(data.data);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchTeams();
  }, [currentPage]);

  useEffect(() => {
    const fetchTeamGame = async () => {
      try {
        const response = await fetch(
          `${GAMES_API_URL}?team_ids[]=${selectedTeamId}&seasons[]=2021`
        );
        const data = await response.json();
        setSelectedTeamGame({
          ...data.data[Math.floor(Math.random() * data.data.length)],
          total_games: data.meta.total_count,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    if (selectedTeamId) {
      fetchTeamGame();
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

  const getFilteredTeams = useMemo(() => {
    let filteredTeams = teams;

    if (searchQuery.length > 1) {
      filteredTeams = filteredTeams.filter((team) =>
        team.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "name":
        filteredTeams = orderBy(filteredTeams, "name", sortDirection);
        break;
      case "city":
        filteredTeams = orderBy(filteredTeams, "city", sortDirection);
        break;
      case "conference":
        filteredTeams = orderBy(filteredTeams, "conference", sortDirection);
        break;
      case "division":
        filteredTeams = orderBy(filteredTeams, "division", sortDirection);
        break;
      default:
        break;
    }

    return filteredTeams;
  }, [teams, searchQuery, sortBy, sortDirection]);

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
          {getFilteredTeams.map((team) => (
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
        {Array.from({ length: totalPages }).map((_, i) => (
          <Pagination.Item
            // eslint-disable-next-line react/no-array-index-key
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
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
