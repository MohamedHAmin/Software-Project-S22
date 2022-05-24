import '@testing-library/jest-dom'
import { render, screen,container, fireEvent } from '@testing-library/react';
import Notifications from '../Notifications';
import { BrowserRouter } from 'react-router-dom';
import { ExpansionPanelActions } from '@material-ui/core';

const MockNotificationsMenu=()=>{
    return(
        <BrowserRouter>
            <Notifications isAdmin={false} isDarkMode={true}/>
        </BrowserRouter>
    )
}

it('if user have no notifications, new member block is rendered',()=>{
    render(<MockNotificationsMenu notifications={[]}/>);
    const newmember=screen.getByText(/new member/i);
    expect(newmember).toBeInTheDocument();
});

// it('should render notifications if user have new notifications',()=>{
//     render(<MockNotificationsMenu notifications={[{text:"User1 started following you"}]}/>);
//     const newmember=screen.getByText(/started following/i);
//     expect(newmember).toBeInTheDocument();
// });
