import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom';
import Addpic from "../Addpic"

const MockAddpic = () => {
    return (
        <BrowserRouter>
            <Addpic />
        </BrowserRouter>
    )
}

it('Testing title exists in the popup', () => {
    render(<MockAddpic />);
    const titleElement = screen.getByText(/Pick a profile picture/i);
    expect(titleElement).toBeInTheDocument();
});
test('check that the skip button exists', () => {
    render(<MockAddpic />);
    const buttonElement = screen.getByRole("button", { name: "Skip for now" });
    expect(buttonElement).toBeInTheDocument();
});
test('check that the exit button exists', () => {
    render(<MockAddpic />);
    const buttonElement = screen.getByRole("button", { name: "X" });
    expect(buttonElement).toBeInTheDocument();
});
test('check that Banner component exists', () => {
    render(<MockAddpic />);
    const InputElement = screen.getByTestId('image');
    expect(InputElement).toBeInTheDocument();
});
test('check that profile picture component exists', () => {
    render(<MockAddpic />);
    const InputElement = screen.getByTestId('profile');
    expect(InputElement).toBeInTheDocument();
});