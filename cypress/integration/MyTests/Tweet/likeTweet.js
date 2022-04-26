import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Like a tweet', () => {


    it('likes uses own tweet', () => {

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('Reem123').should('have.value', 'Reem123')
        cy.xpath(selectors.password).type('Reem1234').should('have.value', 'Reem1234')
        cy.xpath(selectors.login).click()

        //tweet
        cy.xpath(selectors.tweetBox).click()
        cy.xpath(selectors.tweetBox).type('Like a tweet')
        cy.xpath(selectors.tweetButton).click()
        cy.xpath(selectors.tweetContent).should('contain.text', 'Like a tweet')
        
        cy.wait(5000)
        //like it
        cy.xpath(selectors.likeButton).first().click({force: true})

        //check like count
        cy.wait(5000)
        cy.xpath(selectors.likeCount).first().invoke('text').then((text) => {
            expect(parseInt(text)).to.be.eq(1)})

       

        

    })

    it.only('likes others tweet', () => {

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('Roaa').should('have.value', 'Roaa')
        cy.xpath(selectors.password).type('123456').should('have.value', '123456')
        cy.xpath(selectors.login).click()

        
        //like 
        cy.xpath(selectors.likeButton).first().click({force: true})

        //check like count
        cy.wait(5000)
        cy.xpath(selectors.likeCount).first().invoke('text').then((text) => {
            expect(parseInt(text)).to.be.eq(1)})

       

        

    })
})

