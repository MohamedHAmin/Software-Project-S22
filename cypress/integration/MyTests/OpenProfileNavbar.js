/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

//This test opens the own user's profile from the navbar icon


describe('Profile page', () => {
    it('opens profile page from navbar', () => {
        
    
        cy.xpath(selectors.profileButtonNavbar).click()

        //redirects to profile page 
        cy.location('pathname').should('eq', '/Roaa09428212')
    })
})