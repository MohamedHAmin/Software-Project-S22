import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Retweet', () => {


    it('retweet my own tweet with a comment', () => {

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

        //type comment
        cy.xpath(selectors.retweetAddComment).type('comment').should('have.value', 'comment')
        cy.xpath(selectors.retweetButton).click()
        
        

        //check retweet count
        cy.xpath('//*[@id="react2"]/div/div[2]').should('have.value', '3')
        cy.get(':nth-child(5) > :nth-child(5) > .reactsBar > #react2 > .reactsIcon > .iconInfo > .number').first().should('have.value', '4')
        //check the right tweet is retweeted
        // cy.xpath(selectors.originalTweetContent).should('contain.text', 'Retweeting test, no comment')

        //check the username and tag of the one who tweeted
        cy.xpath(selectors.originalTweetUsername).should('contain.text', 'Reem')
        cy.xpath(selectors.originalTweetTag).should('contain.text', '@Reem123')

        //check the username and tag of the one who retweeted
        cy.xpath(selectors.retweetUsename).should('contain.text', 'Reem')
        cy.xpath(selectors.retweetTag).should('contain.text', '@Reem123')

        //check for comment
        cy.xpath(selectors.retweetComment).should('have.value', 'comment')



    })
})

