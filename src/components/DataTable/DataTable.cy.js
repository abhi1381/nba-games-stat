/* eslint-disable no-undef */
import React from "react";
import DataTable from "./DataTable";

describe("DataTable", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/teams",
    }).as("getTeams");
  });

  it("should fetch and display a list of teams on mount", () => {
    cy.mount(<DataTable searchQuery="" />);
    cy.get("table td").first().should("have.text", "Bulls");
    cy.get("table td").last().should("have.text", "Pacific");
  });

  it("should filter the list of teams by search query", () => {
    cy.mount(<DataTable searchQuery="de" />);
    cy.get("table td").should("not.have.text", "Bulls");
  });
});
