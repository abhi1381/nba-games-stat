/* eslint-disable no-undef */
import React from "react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("should render an input field", () => {
    cy.mount(<SearchBar setSearchQuery={() => {}} searchQuery="" />);
    cy.get("input").should("have.class", "search-input");
  });

  it("should display the search query in the input field", () => {
    cy.mount(<SearchBar setSearchQuery={() => {}} searchQuery="test" />);
    cy.get("input").should("have.value", "test");
  });
});
