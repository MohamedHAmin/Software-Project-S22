import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Retweet', () => {


    it('retweet a text retweet, without commenting', () => {

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
        
        //retweet again 
        cy.xpath(selectors.retweet).first().click({force: true})
        cy.xpath(selectors.retweetPopUp).should('exist')
        cy.xpath(selectors.retweetButton).click()

    })

    it('retweet a text retweet, with a comment', () => {

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
        
        //retweet again 
        cy.xpath(selectors.retweet).first().click({force: true})
        cy.xpath(selectors.retweetPopUp).should('exist')

        //type comment
        cy.xpath(selectors.retweetAddComment).type('comment').should('have.value', 'comment')
        cy.xpath(selectors.retweetButton).click()

        //check the username and tag of the one who tweeted
        cy.xpath(selectors.originalTweetUsername).should('contain.text', 'Reem')
        cy.xpath(selectors.originalTweetTag).should('contain.text', '@Reem123')

        //check the username and tag of the one who retweeted
        cy.xpath(selectors.retweetUsename).should('contain.text', 'Reem')
        cy.xpath(selectors.retweetTag).should('contain.text', '@Reem123')


    })
})

