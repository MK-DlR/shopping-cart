// Items.test.jsx

import { expect, test, vi } from "vitest";
import Items from "../src/shop/Items.jsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockHandleIncrement = vi.fn();
const mockHandleDecrement = vi.fn();
const mockHandleManualChange = vi.fn();

vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useOutletContext: () => ({
            items: [{ id: 1, title: "Test Item", price: 10.99, image: "test.jpg" }],
            quantities: { 1: 5},
            setCartArray: vi.fn(),
            handleIncrement: mockHandleIncrement,
            handleDecrement: mockHandleDecrement,
            handleManualChange: mockHandleManualChange,
        })
    };
});

test("check that items display correctly", async () => {
    render(<Items />);
    expect(screen.getByText("Test Item")).toBeTruthy();
    expect(screen.getByText("$10.99")).toBeTruthy();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.jpg");
});

test("check that increment and decrement buttons work", async () => {
    const user = userEvent.setup();
    render(<Items />);
    const decrementButton = screen.getByRole("button", { name: "-" });
    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(decrementButton);
    await user.click(incrementButton);
    expect(mockHandleDecrement).toHaveBeenCalled();
    expect(mockHandleIncrement).toHaveBeenCalled();
});

test("check that manual quantity changes work", async () => {
    const user = userEvent.setup();
    render(<Items />);
    const inputField = screen.getByRole("textbox");
    await user.clear(inputField);
    await user.type(inputField, "10");
    expect(mockHandleManualChange).toHaveBeenCalled();
});

test("check that quantities displayed match quantities value from object", () => {
    render(<Items />);
    screen.getByDisplayValue("5").toBeTruthy;
});