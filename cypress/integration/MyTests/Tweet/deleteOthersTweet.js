import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Delete Tweet', () => {

    it('tries to delete others tweet', () => {
        

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('Roaa').should('have.value', 'Roaa')
        cy.xpath(selectors.password).type('123456').should('have.value', '123456')
        cy.xpath(selectors.login).click()


        cy.xpath(selectors.deleteTweet1).click()
        cy.xpath(selectors.deleteTweet2).should('be.not.visible')
    })

    it('deletes others tweet if admin', () => {
        


        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('Reem123').should('have.value', 'Reem123')
        cy.xpath(selectors.password).type('Reem1234').should('have.value', 'Reem1234')
        cy.xpath(selectors.login).click()
        cy.xpath(selectors.deleteTweet1).click()
        // cy.xpath(selectors.deleteTweet2).should('be.visible')
        cy.xpath(selectors.deleteTweet2).click()
        cy.xpath(selectors.tweetContent).should('not.have.text', 'Test tweet')
    })
})