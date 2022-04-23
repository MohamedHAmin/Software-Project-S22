import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Signup';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    )
}
it.skip('Testing Next button', () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "Next" });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
});

it.skip('Testing input field of signup', () => {
    render(<MockLogin />);
    const input1Element = screen.getByTestId("UNs");
    expect(input1Element).toBeInTheDocument();
});

it.skip('Testing title exist', () => {
    render(<MockLogin />);
    const titleElement = screen.getByText(/Signup form/i);
    expect(titleElement).toBeInTheDocument();
});

it.skip('check that the user entered correct input', () => {

    render(<MockLogin />);

    //check that user entered a value for username
    const usernameElement = screen.getByTestId("UNs")
    expect(usernameElement).toBeInTheDocument();
    fireEvent.change(usernameElement, { target: { value: "nada" } });
    expect(usernameElement.value).toBe("nada");


    //check that user entered a value for password
    const passwordElement = screen.getByTestId("PWs")
    expect(passwordElement).toBeInTheDocument();
    fireEvent.change(passwordElement, { target: { value: "karim" } });
    expect(passwordElement.value).toBe("karim");

    //check that user entered a value for Tag
    const TagElement = screen.getByTestId("Tag")
    expect(TagElement).toBeInTheDocument();
    fireEvent.change(TagElement, { target: { value: "nody" } });
    expect(TagElement.value).toBe("nody");

    //check that user entered a value for E-mail
    const EmailElement = screen.getByTestId("EM")
    expect(EmailElement).toBeInTheDocument();
    fireEvent.change(EmailElement, { target: { value: "karim" } });
    expect(EmailElement.value).toBe("karim");

});
