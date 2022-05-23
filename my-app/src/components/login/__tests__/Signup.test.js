import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Signup';

const Mocksignup = () => {
    return (
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    )
}
test('Testing title exists in signup form', () => {
    render(<Mocksignup />);
    const titleElement = screen.getByText(/Signup form/i);
    expect(titleElement).toBeInTheDocument();
});
test('Testing the existence of screenName input field in signup form', () => {
    render(<Mocksignup />);
    const usernameElement = screen.getByPlaceholderText("screenName")
    expect(usernameElement).toBeInTheDocument();
});
test('Testing the existence of password input field in signup form', () => {
    render(<Mocksignup />);
    const passwordElement = screen.getByPlaceholderText("password")
    expect(passwordElement).toBeInTheDocument();
});
test('Testing the existence of Tag input field in signup form', () => {
    render(<Mocksignup />);
    const TagElement = screen.getByPlaceholderText("Tag")
    expect(TagElement).toBeInTheDocument();
});
test('Testing the existence of email input field in signup form', () => {
    render(<Mocksignup />);
    const EmailElement = screen.getByPlaceholderText("Email")
    expect(EmailElement).toBeInTheDocument();
});
test('Testing the existence of next button in signup form', () => {
    render(<Mocksignup />);
    const buttonElement = screen.getByRole("button", { name: "Next" });
    expect(buttonElement).toBeInTheDocument();
});
test('Testing the existence of Addpic button in signup form', () => {
    render(<Mocksignup />);
    const buttonElement = screen.getByRole("button", { name: "Next" });
    fireEvent.click(buttonElement);
    waitFor(() => {
        const btn = screen.getByRole("button", { name: "Add photo" });
        expect(btn).toBeInTheDocument();
    })
});
test('check that the exit button works', async () => {
    render(<Mocksignup />);
    const buttonElement = screen.getByRole("button", { name: "Next" });
    fireEvent.click(buttonElement);
    waitFor(() => {
        const btn = screen.getByRole("button", { name: "Add photo" });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        const buttonElement = screen.getByRole("button", { name: "X" });
        expect(buttonElement).toBeInTheDocument();
        fireEvent.click(buttonElement);
        const titleElement = screen.getByText(/Pick a profile picture/i);
        expect(titleElement).not.toBeInTheDocument();
    })
});
test('check that the user entered correct input', () => {
    render(<Mocksignup />);
    //check that user entered a value for username
    const usernameElement = screen.getByPlaceholderText("screenName")
    fireEvent.change(usernameElement, { target: { value: "nada" } });
    expect(usernameElement.value).toEqual("nada");

    ///////////////////////////////////////////////////////////////////////////////////////////
    //check that user entered a value for password
    const passwordElement = screen.getByPlaceholderText("password")
    fireEvent.change(passwordElement, { target: { value: "123456" } });
    expect(passwordElement.value).toEqual("123456");

    /////////////////////////////////////////////////////////////////////////////////////
    //check that user entered a value for Tag
    const TagElement = screen.getByPlaceholderText("Tag")
    fireEvent.change(TagElement, { target: { value: "nody" } });
    expect(TagElement.value).toEqual("nody");

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //check that user entered a value for E-mail
    const EmailElement = screen.getByPlaceholderText("Email")
    fireEvent.change(EmailElement, { target: { value: "nada@yahoo.com" } });
    expect(EmailElement.value).toEqual("nada@yahoo.com");

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const buttonElement = screen.getByRole("button", { name: "Next" });
    fireEvent.click(buttonElement);

    waitFor(() => {
        //check that user entered a value for Birthdate
        const BirthdateElement = screen.queryByTestId("BD")
        expect(BirthdateElement).toBeInTheDocument();
        fireEvent.change(BirthdateElement, { target: { value: "09-30-2001" } });
        expect(BirthdateElement.value).toEqual("09-30-2001");

        //check that user entered a value for phonenumber
        const phoneNumElement = screen.getByPlaceholderText("Phone Number")
        expect(phoneNumElement).toBeInTheDocument();
        fireEvent.change(phoneNumElement, { target: { value: "01125499361" } });
        expect(phoneNumElement.value).toEqual("01125499361");

        //check that user entered a value for Bio
        const bioElement = screen.getByPlaceholderText("Biography")
        expect(bioElement).toBeInTheDocument();
        fireEvent.change(bioElement, { target: { value: "hello" } });
        expect(bioElement.value).toEqual("hello");

        //check that user entered a value for location
        const LocationElement = screen.getByPlaceholderText("Location")
        expect(LocationElement).toBeInTheDocument();
        fireEvent.change(LocationElement, { target: { value: "giza" } });
        expect(LocationElement.value).toEqual("giza");

        //check that user entered a value for a link
        const LinkElement = screen.getByPlaceholderText("You can put any website link here")
        expect(LinkElement).toBeInTheDocument();
        fireEvent.change(LinkElement, { target: { value: "www.larry.com" } });
        expect(LinkElement.value).toEqual("www.larry.com");

        // click on Add photo button
        const btn = screen.getByRole("button", { name: "Add photo" });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        const testElement = screen.getByText(/Pick a profile picture/i);
        expect(testElement).toBeInTheDocument();

        // click on sign up button
        const btnElement = screen.getByRole("button", { name: "Signup" });
        expect(btnElement).toBeInTheDocument();
        fireEvent.click(btnElement);

        // navigate to login page
        waitFor(() => {
            const titleElement = screen.getByText(/Login form/i);
            expect(titleElement).toBeInTheDocument();
        })
    })
});

test('check that the user entered wrong input', () => {
    render(<Mocksignup />);

    //check that user entered a value for username
    const usernameElement = screen.getByPlaceholderText("screenName")
    fireEvent.change(usernameElement, { target: { value: "na" } });
    waitFor(() => {
        const error = screen.getByText('screenName must be at least 3 characters ')
        expect(error.toBeInTheDocument())
    })

    fireEvent.change(usernameElement, { target: { value: "" } });
    waitFor(() => {
        const error = screen.getByText('Enter Your screenName')
        expect(error.toBeInTheDocument())
    })

    ///////////////////////////////////////////////////////////////////////////////////////////
    //check that user entered a value for password
    const passwordElement = screen.getByPlaceholderText("password")
    fireEvent.change(passwordElement, { target: { value: "1" } });
    waitFor(() => {
        const passerror = screen.getByText('password must be at least 6 characters')
        expect(passerror.toBeInTheDocument())
    })

    fireEvent.change(passwordElement, { target: { value: "" } });
    waitFor(() => {
        const passerror = screen.getByText('Enter Your Password')
        expect(passerror.toBeInTheDocument())
    })

    /////////////////////////////////////////////////////////////////////////////////////
    //check that user entered a value for Tag
    const TagElement = screen.getByPlaceholderText("Tag")
    fireEvent.change(TagElement, { target: { value: "" } });
    waitFor(() => {
        const tagerror = screen.getByText('Tag is required')
        expect(tagerror.toBeInTheDocument())
    })

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //check that user entered a value for E-mail
    const EmailElement = screen.getByPlaceholderText("Email")
    fireEvent.change(EmailElement, { target: { value: "" } });
    waitFor(() => {
        const emailerror = screen.getByText('Email is required')
        expect(emailerror.toBeInTheDocument())
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const buttonElement = screen.getByRole("button", { name: "Next" });
    fireEvent.click(buttonElement);

    waitFor(() => {
        //check that user didn't enter the second page with wrong input 
        const phoneNumElement = screen.getByPlaceholderText("Phone Number")
        expect(phoneNumElement).not.toBeInTheDocument();
    });
})

