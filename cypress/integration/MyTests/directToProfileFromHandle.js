/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

describe('opening any account by clicking on the handle appearing with the tweet', () => {
    
    it('hovers over user handle', () => {

        //select search from navbar
        cy.xpath(selectors.searchButtonNavbar).click()
        cy.location('pathname').should('eq', '/explore')
   
        //type Liverpool FC in saerch bar
        cy.xpath(selectors.searchbar).click()
        cy.xpath(selectors.searchbar).type('Liverpool FC').should('have.text', 'Liverpool FC')

        //click on their page
        cy.xpath(selectors.selectedItem).click()
        cy.location('pathname').should('eq', 'LFC')

        //hovering over the usr's handle
        // cy.xpath(selectors.userHandle).trigger('mouseover')
        // cy.get('.popover').should('be.visible')
    })
    
    it ('clicks on user handle to show her/his profile', ()=> {

        //find user handle
        cy.xpath(selectors.userHandleFromHome)
        //click it
        cy.xpath(selectors.userHandleFromHome).click()
        //should redirect to her/his account
        cy.location('pathname').should('eq', '/AlMosahf')
    })
})