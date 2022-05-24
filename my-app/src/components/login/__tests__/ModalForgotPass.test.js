import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom';
import Modal from "../ModalForgotPass"

const Mockforgotpass = () => {
    return (
        <BrowserRouter>
            <Modal closeModal={true} />
        </BrowserRouter>
    )
}
it('Testing title exists in the popup', () => {
    render(<Mockforgotpass />);
    const titleElement = screen.getByText(/Find your Larry account/i);
    expect(titleElement).toBeInTheDocument();
});

test('check that the input field exists', () => {
    render(<Mockforgotpass />);

    const emailElement = screen.getByPlaceholderText("Please enter your Email")
    expect(emailElement).toBeInTheDocument();
});
test('check that the user entered correct input', async () => {
    render(<Mockforgotpass />);

    const emailElement = screen.getByPlaceholderText("Please enter your Email")
    fireEvent.change(emailElement, { target: { value: "nada@gmail.com" } });
    expect(emailElement.value).toBe("nada@gmail.com");
});
test('check that the search button exists', () => {
    render(<Mockforgotpass />);

    const buttonElement = screen.getByRole("button", { name: "Search" });
    expect(buttonElement).toBeInTheDocument();
});
test('check that the exit button exists', () => {
    render(<Mockforgotpass />);
    const buttonElement = screen.getByRole("button", { name: "X" });
    expect(buttonElement).toBeInTheDocument();
});
test('check that it renders the right alert message when user enters valid email', async () => {
    render(<Mockforgotpass />);
    const emailElement = screen.getByPlaceholderText("Please enter your Email")
    fireEvent.change(emailElement, { target: { value: "nada@gmail.com" } });
    expect(emailElement.value).toBe("nada@gmail.com");
    const buttonElement = screen.getByRole("button", { name: "Search" });

    waitFor(() => {
        global.alert = jest.fn(fireEvent.click(buttonElement));
        expect(global.alert).toHaveBeenCalledTimes(1);
        const testElement = screen.getByText(/Please check your email/i);
        expect(testElement).toBeInTheDocument();
    })
});
test('check that it renders the right alert message if user entered invalid email', async () => {
    render(<Mockforgotpass />);
    const emailElement = screen.getByPlaceholderText("Please enter your Email")
    fireEvent.change(emailElement, { target: { value: "nada" } });
    expect(emailElement.value).toBe("nada");
    const buttonElement = screen.getByRole("button", { name: "Search" });

    waitFor(() => {
        global.alert = jest.fn(fireEvent.click(buttonElement));
        expect(global.alert).toHaveBeenCalledTimes(1);
        const testElement = screen.getByText(/Email is not found or registered/i);
        expect(testElement).toBeInTheDocument();
    })
});
// it('alerts on submit click', async () => {
//     // const alertMock = jest.spyOn(window, 'alert').mockImplementation();
//     // const { getByText } = render(<Mockforgotpass />)
//     // fireEvent.click(getByText('Search'))
//     // expect(alertMock).toHaveBeenCalledTimes(1)
//     global.alert = jest.fn();
//     expect(global.alert).toHaveBeenCalledTimes(1);
// })