/// <reference types="cypress-xpath" />

import selectors from "../../support/selectors"

//This test opens liverpool page and follows it 

describe('follows Liverpool FC', () => {
    it('search for Liverpool FC and follow it', () => {


        //select search from navbar
        cy.xpath(selectors.searchButtonNavbar).click()
        cy.location('pathname').should('eq', '/explore')
   
        //type Liverpool FC in saerch bar
        cy.xpath(selectors.searchbar).click()
        cy.xpath(selectors.searchbar).type('Liverpool FC').should('have.text', 'Liverpool FC')

        //click on their page
        cy.xpath(selectors.selectedItem).click()
        cy.location('pathname').should('eq', 'LFC')

        //follow
        cy.xpath(selectors.followButton).should('have.text', 'Follow')
        cy.xpath(selectors.followUnfollowButton).click()
        cy.xpath(selectors.unfollowButton).should('have.text', 'Following')
              
    })

    it('search for Liverpool FC to unfollow it but cancel the operation', () => {


        //select search from navbar
        cy.xpath(selectors.searchButtonNavbar).click()
        cy.location('pathname').should('eq', '/explore')
   
        //type Liverpool FC in saerch bar
        cy.xpath(selectors.searchbar).click()
        cy.xpath(selectors.searchbar).type('Liverpool FC').should('have.text', 'Liverpool FC')

        //click on their page
        cy.xpath(selectors.selectedItem).click()
        cy.location('pathname').should('eq', 'LFC')

       //unfollow
       cy.xpath(selectors.unfollowButton).should('have.text', 'Following')
       cy.xpath(selectors.unfollowButton).trigger('mouseover')
       cy.xpath(selectors.unfollowButton).should('have.text', 'Unfollow')
       cy.xpath(selectors.unfollowButton).click()
       cy.xpath(selectors.unfollowPopup).should('be.visible')

       //cancel unfollow
       cy.xpath(selectors.cancelUnfollow).click()
       cy.xpath(selectors.unfollowButton).should('have.text', 'Following')

        
    })
    it('search for Liverpool FC and unfollow it', () => {

        //select search from navbar
        cy.xpath(selectors.searchButtonNavbar).click()
        cy.location('pathname').should('eq', '/explore')

        //type Liverpool FC in saerch bar
        cy.xpath(selectors.searchbar).click()
        cy.xpath(selectors.searchbar).type('Liverpool FC').should('have.text', 'Liverpool FC')

        //click on their page
        cy.xpath(selectors.selectedItem).click()
        cy.location('pathname').should('eq', 'LFC')

         //unfollow
         cy.xpath(selectors.unfollowButton).should('have.text', 'Following')
        cy.xpath(selectors.unfollowButton).trigger('mouseover')
        cy.xpath(selectors.unfollowButton).should('have.text', 'Unfollow')
        cy.xpath(selectors.unfollowButton).click()
        cy.xpath(selectors.unfollowPopup).should('be.visible')
        cy.xpath(selectors.confirmUnfollow).click()
        cy.xpath(selectors.followButton).should('have.text', 'Follow')        
    })
})