// Navigation.test.jsx

import { expect, test } from "vitest";
import Navigation from "../src/navigation/Navigation.jsx";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

test("check that home, shop, cart links are present", () => {
    render (<MemoryRouter><Navigation cartCount={0} /></MemoryRouter>);
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Shop")).toBeTruthy();
    expect(screen.getByText(/Cart/)).toBeTruthy();
});

test("links have correct href attributes", () => {
    render (<MemoryRouter><Navigation cartCount={0} /></MemoryRouter>);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/home");
    expect(screen.getByText("Shop").closest("a")).toHaveAttribute("href", "/shop");
    expect(screen.getByText(/Cart/).closest("a")).toHaveAttribute("href", "/cart");
})

test("cartCount should display total items in cart", () => {
    render (<MemoryRouter><Navigation cartCount={0} /></MemoryRouter>);
    expect(screen.getByText("Cart (0)")).toBeTruthy();
    render (<MemoryRouter><Navigation cartCount={5} /></MemoryRouter>);
    expect(screen.getByText("Cart (5)")).toBeTruthy();
})