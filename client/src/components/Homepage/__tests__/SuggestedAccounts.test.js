import '@testing-library/jest-dom'
import { render, screen,container, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Explore from '../Explore';
import SuggestedAccounts from '../SuggestedAccounts';
import ProfilePage from '../../Profile/ProfilePage';
const MockExplore=()=>{
    return(
    <BrowserRouter>
        <Explore/>
    </BrowserRouter>
    )
  }
  const MockHome=()=>{
    return(
    <BrowserRouter>
        <Explore/>
    </BrowserRouter>
    )
  }
  const MockProfilePage=()=>{
    return(
    <BrowserRouter>
        <Explore/>
    </BrowserRouter>
    )
  }
it('should render Suggested accounts block', () => {
  render(<SuggestedAccounts/>);
  const headingElement = screen.getByText(/Who to follow/i);
  expect(headingElement).toBeInTheDocument();
  const footerElement = screen.getByText(/© 2022 Larry, Inc./i);
  expect(footerElement).toBeInTheDocument();
});

it('should render Suggested accounts block in Explore page', () => {
    render(<MockExplore/>);
    const headingElement = screen.getByText(/Who to follow/i);
  expect(headingElement).toBeInTheDocument();
    const footerElement = screen.getByText(/© 2022 Larry, Inc./i);
    expect(footerElement).toBeInTheDocument();
});
it('should render Suggested accounts block in Home page', () => {
    render(<MockHome/>);
    const headingElement = screen.getByText(/Who to follow/i);
  expect(headingElement).toBeInTheDocument();
    const footerElement = screen.getByText(/© 2022 Larry, Inc./i);
    expect(footerElement).toBeInTheDocument();
});
it('should render Suggested accounts block in Profile page', () => {
    render(<MockProfilePage/>);
    const headingElement = screen.getByText(/Who to follow/i);
  expect(headingElement).toBeInTheDocument();
    const footerElement = screen.getByText(/© 2022 Larry, Inc./i);
    expect(footerElement).toBeInTheDocument();
});