import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Delete Tweet', () => {

    it('deletes user own tweet', () => {
        
        cy.xpath(selectors.deleteTweet1).click()
        // cy.xpath(selectors.deleteTweet2).should('be.visible')
        cy.xpath(selectors.deleteTweet2).click()
        cy.xpath(selectors.tweetContent).should('not.have.text', 'Test tweet')
    })
})