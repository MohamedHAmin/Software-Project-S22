import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Login from '../Login'
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}
test('Testing title exists in login form', () => {
    render(<MockLogin />);
    const titleElement = screen.getByText(/Login form/i);
    expect(titleElement).toBeInTheDocument();
});
test('Testing the existence of Tag input field in login form', () => {
    render(<MockLogin />);
    const usernameElement = screen.getByPlaceholderText("Email or Tag")
    expect(usernameElement).toBeInTheDocument();
});
test('Testing the existence of password input field in login form', () => {
    render(<MockLogin />);
    const passwordElement = screen.getByPlaceholderText("password")
    expect(passwordElement).toBeInTheDocument();
});
test('Testing the existence of Login button in login form', () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "Login" });
    expect(buttonElement).toBeInTheDocument();
});
test('Testing the existence of Forgotpassword? button in login form', () => {
    render(<MockLogin />);
    const button = screen.getByRole("button", { name: "Forgot password?" });
    expect(button).toBeInTheDocument();
});
test('Testing the existence of Login with google button in login form', () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "Google" });
    expect(buttonElement).toBeInTheDocument();
});

test('check that the user entered correct input', async () => {
    render(<MockLogin />);

    //check that user entered a value for username or tag
    const usernameElement = screen.getByPlaceholderText("Email or Tag")
    fireEvent.change(usernameElement, { target: { value: "dody" } });
    expect(usernameElement.value).toBe("dody");

    ///////////////////////////////////////////////////////////////////////////

    //check that user entered a value for password
    const passwordElement = screen.getByPlaceholderText("password")
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    expect(passwordElement.value).toBe("123456");

    /////////////////////////////////////////////////////////////////////////////

    const buttonElement = screen.getByRole("button", { name: "Login" });
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
    fireEvent.change(passwordElement, { target: { value: "123456789123456789456" } });
    waitFor(() => {
        const passerror = screen.getByText('password must be at most 16 characters')
        expect(passerror.toBeInTheDocument())
    })
    /////////////////////////////////////////////////////////////////////////////

    const buttonElement = screen.getByRole("button", { name: "Login" });
    fireEvent.click(buttonElement); // then you  don't go to home page
    waitFor(() => {
        const testElement = screen.getByText(/LAR/i);
        expect(testElement).not.toBeInTheDocument();
    })
});
test('full app rendering/navigating', () => {
    const history = createMemoryHistory()
    render(
        <BrowserRouter history={history}>
            <Login />
        </BrowserRouter>
    )
})
test('Testing when login with google button is clicked,,, it navigates to another page', () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "Google" });
    fireEvent.click(buttonElement); // then you go to another page
    waitFor(() => {
        const testElement = screen.getByText(/This site can’t be reached/i);
        expect(testElement).toBeInTheDocument();
    })
});
test('Testing when Forgotpassword? button is clicked,,, it navigates to popup', () => {
    render(<MockLogin />);
    const button = screen.getByRole("button", { name: "Forgot password?" });
    fireEvent.click(button); // then you go to popup
    const testElement = screen.getByText(/Find your Larry account/i);
    expect(testElement).toBeInTheDocument();
});



