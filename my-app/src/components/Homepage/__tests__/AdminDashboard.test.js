import '@testing-library/jest-dom'
import { render, screen,container, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Explore from '../Explore';
import SuggestedAccounts from '../SuggestedAccounts';
import AdminDashboard from '../AdminDashboard';
import ProfilePage from '../../Profile/ProfilePage';
const MockAdminDashboard=()=>{
    return(
    <BrowserRouter>
        <AdminDashboard/>
    </BrowserRouter>
    )
  }
it('should render Admin Dashboard ', () => {
  render(<MockAdminDashboard/>);
  const headingElement = screen.getByText(/Larry statistics/i);
  expect(headingElement).toBeInTheDocument();
});
it('initially the duartion selected must be Week by default', () => {
    render(<MockAdminDashboard/>);
    const headingElement = screen.getByText(/Users activity/i);
    expect(headingElement).toBeInTheDocument();
    const btnWeekElement=screen.getByRole("button",{name:"Week"});
    const btnMonthElement=screen.getByRole("button",{name:"Month"});
    expect(btnWeekElement).toBeInTheDocument();
    expect(btnMonthElement).toBeInTheDocument();
    const descriptionTextElemet=screen.getByText(/7 day summary with change over previous period/i);
    expect(descriptionTextElemet).toBeInTheDocument();
});
it('change statistics if the admin chooses the duartion to be month ', () => {
    render(<MockAdminDashboard/>);
    const btnMonthElement=screen.getByRole("button",{name:"Month"});
    expect(btnMonthElement).toBeInTheDocument();
    fireEvent.click(btnMonthElement);
    const descriptionTextElemet=screen.getByText(/30 day summary with change over previous period/i);
    expect(descriptionTextElemet).toBeInTheDocument();
});
it('must show top lar block ',async () => {
    render(<MockAdminDashboard/>);
    const headingElement = screen.getByText(/Top lar/i);
    expect(headingElement).toBeInTheDocument();
});
it('Display current and past numbers and the percentage of current to past ',async () => {
    render(<MockAdminDashboard/>);
    const relarTextElemet=screen.getByText(/ReLars/i);
    expect(relarTextElemet).toBeInTheDocument();
});
it('Display "nochange" rather than percentage if current and past numbers are the same ',async () => {
    render(<MockAdminDashboard/>);
    const relarTextElemet=screen.getByText(/ReLars/i);
    expect(relarTextElemet).toBeInTheDocument();
    const relarCountElemet=screen.getByText(/no change/i);
    expect(relarCountElemet).toBeInTheDocument();
});
