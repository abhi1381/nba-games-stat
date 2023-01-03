import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "./components/SearchBar/SearchBar";
import DataTable from "./components/DataTable/DataTable";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Container fluid className="mx-5">
      <h1 className="mt-4 fs-1 fw-semibold header">NBA TEAMS</h1>
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <DataTable searchQuery={searchQuery} />
    </Container>
  );
}

export default App;
