import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "./components/SearchBar/SearchBar";
import DataTable from "./components/DataTable/DataTable";
import Loader from "./components/Loader/Loader";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Container fluid className={isLoading ? "mx-5 blur" : "mx-5"}>
      {isLoading && <Loader />}
      <h1 className="mt-4 fs-1 fw-semibold header">NBA TEAMS</h1>
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <DataTable searchQuery={searchQuery} setIsLoading={setIsLoading} />
    </Container>
  );
}

export default App;
