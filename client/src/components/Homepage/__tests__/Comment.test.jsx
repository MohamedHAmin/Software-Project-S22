import Comment from "../Comment";
import {render,screen,fireEvent} from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import Post from "../Post";

test.skip("on enter when comment is written in comment field, comment counter increases",()=>{
    //const event = new KeyboardEvent('keydown', { keyCode: 32 });
    render(<Post/>);
    //screen.debug();
    const commentfield = screen.getByText(/write your comment!/i);
    fireEvent.keyDown(commentfield,{ keyCode: 32 });
})