// Cart.test.jsx

import { expect, test, vi } from "vitest";
import Cart from "../src/cart/Cart.jsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockHandleIncrement = vi.fn();
const mockHandleDecrement = vi.fn();
const mockHandleManualChange = vi.fn();
const mockSetCartArray = vi.fn();

vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useOutletContext: () => ({
            cartArray: [{ id: 1, title: "Test Item", price: 10.99, image: "test.jpg", quantity: 5 }],
            quantities: { 1: 5 },
            cartQuantity: 5,
            setCartArray: mockSetCartArray,
            handleIncrement: mockHandleIncrement,
            handleDecrement: mockHandleDecrement,
            handleManualChange: mockHandleManualChange,
        })
    };
});

test("check that cart displays items and subtotal correctly", () => {
    render(<Cart />);
    expect(screen.getByText("Test Item")).toBeTruthy();
    expect(screen.getByText("$10.99")).toBeTruthy();
    expect(screen.getByText("$54.95")).toBeTruthy();
});

test("check that cart buttons call handlers", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    const decrementButton = screen.getByRole("button", { name: "-" });
    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(decrementButton);
    await user.click(incrementButton);
    expect(mockHandleDecrement).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
    expect(mockHandleIncrement).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
})

test("check delete button calls setCartArray", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    expect(screen.getByText("Test Item")).toBeTruthy();
    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);
    expect(mockSetCartArray).toHaveBeenCalled();
})

test("check checkout button opens modal", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    const checkoutButton = screen.getByRole("button", { name: "Checkout"});
    expect(screen.queryByText("Would you like that warmed up?")).toBeFalsy();
    await user.click(checkoutButton);
    expect(screen.getByText("Would you like that warmed up?")).toBeTruthy();
})