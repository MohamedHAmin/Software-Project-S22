import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react"
import Login from '../Login'
import { BrowserRouter } from 'react-router-dom';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}
it.skip('Testing login button', () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "Login" });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
});

it.skip('Testing input field', () => {
    render(<MockLogin />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
});

it.skip('Testing title exist', () => {
    render(<MockLogin />);
    const titleElement = screen.getByText(/Login form/i);
    expect(titleElement).toBeInTheDocument();
});

it.skip('check that the user entered correct input', () => {

    render(<MockLogin />);

    //check that user entered a value for username
    const usernameElement = screen.getByTestId("UN")
    expect(usernameElement).toBeInTheDocument();
    fireEvent.change(usernameElement, { target: { value: "nada" } });
    expect(usernameElement.value).toBe("nada");


    //check that user entered a value for username
    const passwordElement = screen.getByTestId("PW")
    expect(passwordElement).toBeInTheDocument();
    fireEvent.change(passwordElement, { target: { value: "karim" } });
    expect(passwordElement.value).toBe("karim");

});




