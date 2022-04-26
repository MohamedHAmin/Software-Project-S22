import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Retweet', () => {


    it('retweet my own picture without text tweet with a comment', () => {

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('Reem123').should('have.value', 'Reem123')
        cy.xpath(selectors.password).type('Reem1234').should('have.value', 'Reem1234')
        cy.xpath(selectors.login).click()

        //tweet a pic
        cy.xpath(selectors.cameraIcon).first().click({force: true}).selectFile('\pic3.jpg')
        //writing a tweet
        cy.xpath(selectors.tweetPicText).first().click()
        cy.xpath(selectors.tweetPicText).first().type('Heyy ').should('have.value', 'Heyy ')
        cy.xpath(selectors.tweetButton).click()
        //retweet
        cy.xpath(selectors.retweet).first().click({force: true})
        cy.xpath(selectors.retweetPopUp).should('exist')

        
        
        

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

        



    })
})

