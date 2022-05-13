import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Login from '../Login'
import { BrowserRouter } from 'react-router-dom';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}


it('Testing title exist in login form', () => {
    render(<MockLogin />);
    const titleElement = screen.getByText(/Login form/i);
    expect(titleElement).toBeInTheDocument();
});

test('check that the user entered correct input', async () => {

    render(<MockLogin />);

    //check that user entered a value for username or tag
    const usernameElement = screen.getByPlaceholderText("Email or Tag")
    expect(usernameElement).toBeInTheDocument();
    fireEvent.change(usernameElement, { target: { value: "dody" } });
    expect(usernameElement.value).toBe("dody");

    //////////////////////////////////////////////////////////////////////////////////////////

    //check that user entered a value for password
    const passwordElement = screen.getByPlaceholderText("password")
    expect(passwordElement).toBeInTheDocument();
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    expect(passwordElement.value).toBe("123456");

    /////////////////////////////////////////////////////////////////////////////

    const buttonElement = screen.getByRole("button", { name: "Login" });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement); // then you go to home page
    waitFor(() => {
        const testElement = screen.getByText(/LAR/i);
        expect(testElement).toBeInTheDocument();
    })
});

test('check that the user entered wrong input', async () => {

    render(<MockLogin />);

    //check that user entered a value for username or tag
    const usernameElement = screen.getByPlaceholderText("Email or Tag")
    expect(usernameElement).toBeInTheDocument();

    fireEvent.change(usernameElement, { target: { value: "" } });
    waitFor(() => {
        const Emailerror = screen.getByText('Enter Your Email or Tag.')
        expect(Emailerror.toBeInTheDocument())
    })

    fireEvent.change(usernameElement, { target: { value: "ds" } });
    waitFor(() => {
        const Emailerror = screen.getByText('email_or_username must be at least 3 characters')
        expect(Emailerror.toBeInTheDocument())
    })

    //////////////////////////////////////////////////////////////////////////////////////////

    //check that user entered a value for password
    const passwordElement = screen.getByPlaceholderText("password")
    expect(passwordElement).toBeInTheDocument();

    fireEvent.change(passwordElement, { target: { value: "" } });
    waitFor(() => {
        const passerror = screen.getByText('Enter Your Password')
        expect(passerror.toBeInTheDocument())
    })

    fireEvent.change(passwordElement, { target: { value: "12" } });
    waitFor(() => {
        const passerror = screen.getByText('password must be at least 6 characters')
        expect(passerror.toBeInTheDocument())
    })

    fireEvent.change(passwordElement, { target: { value: "12111111111111" } });
    waitFor(() => {
        const passerror = screen.getByText('password must be at most 12 characters')
        expect(passerror.toBeInTheDocument())
    })

    /////////////////////////////////////////////////////////////////////////////

    const buttonElement = screen.getByRole("button", { name: "Login" });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement); // then you  don't go to home page
    waitFor(() => {
        const testElement = screen.getByText(/LAR/i);
        expect(testElement).not.toBeInTheDocument();
    })
});



