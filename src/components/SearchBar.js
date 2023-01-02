import React from "react";
import { Col, Form, FormControl, InputGroup } from "react-bootstrap";

function SearchBar({ setSearchQuery, searchQuery }) {
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Col className="mt-5" xs="10" md="6">
      <Form>
        <InputGroup className="search">
          <InputGroup.Text className="search-icon">
            <img src="Search.svg" alt="search icon" />
          </InputGroup.Text>
          <FormControl
            type="text"
            value={searchQuery}
            onChange={handleChange}
            className="search-input"
          />
        </InputGroup>
      </Form>
    </Col>
  );
}

export default SearchBar;
