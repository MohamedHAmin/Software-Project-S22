import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Delete retweet', () => {


    it('deletes any retweet', () => {

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('Reem123').should('have.value', 'Reem123')
        cy.xpath(selectors.password).type('Reem1234').should('have.value', 'Reem1234')
        cy.xpath(selectors.login).click()

        //tweet
        cy.xpath(selectors.tweetBox).click()
        cy.xpath(selectors.tweetBox).type('Retweeting test, no comment')
        cy.xpath(selectors.tweetButton).click()
        cy.xpath(selectors.tweetContent).should('contain.text', 'Retweeting test, no comment')

        //retweet
        cy.xpath(selectors.retweet).first().click({force: true})
        cy.xpath(selectors.retweetPopUp).should('exist')
        cy.xpath(selectors.retweetButton).click()

        cy.wait(5000)
        
        //delete the retweet
        cy.xpath(selectors.deleteTweet1).click()
        cy.xpath(selectors.deleteTweet2).click()
        //check that the retweet is deleted and now the first thing is the original tweet
        cy.xpath(selectors.tweetContent).should('have.text', 'Retweeting test, no comment')

        //check retweet count
        cy.xpath(selectors.retweetCount).first().invoke('text').then((text) => {
            expect(parseInt(text)).to.be.eq(0)})

       

        

    })
})

