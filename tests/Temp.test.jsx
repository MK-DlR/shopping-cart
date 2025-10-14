// Temp.test.jsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Temp from "./Temp";

describe("Temp component", () => {
  it("renders correct heading", () => {
    render(<Temp />);
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
  });
});