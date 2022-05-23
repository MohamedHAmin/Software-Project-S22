import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom';
import Addpic from "../Addpic"
import { shallow } from 'enzyme';
import UploaderBanner from '../utils/UploaderBanner';
import Signup from '../Signup';


const MockLogin = () => {
    return (
        <BrowserRouter>
            <Addpic />
        </BrowserRouter>
    )
}

it('Testing title exists in the popup', () => {
    render(<MockLogin />);
    const titleElement = screen.getByText(/Pick a profile picture/i);
    expect(titleElement).toBeInTheDocument();
});
test('check that the skip button exists', () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "Skip for now" });
    expect(buttonElement).toBeInTheDocument();
});
test('check that the exit button exists', () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "X" });
    expect(buttonElement).toBeInTheDocument();
});
test('check that Banner component exists', () => {
    render(<MockLogin />);
    const InputElement = screen.getByTestId('image');
    expect(InputElement).toBeInTheDocument();
});
test('check that profile picture component exists', () => {
    render(<MockLogin />);
    const InputElement = screen.getByTestId('profile');
    expect(InputElement).toBeInTheDocument();
});