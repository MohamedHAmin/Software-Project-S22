import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';
//This test creates a tweet from homepage 
//from navbar
const fullCharTweet= 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const normalTweet='Hello!'
const invalidTweet='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhh'
const emptyTweet=' '
const myHandle= "@Roaa09428212"

describe('creating a tweet from navbar', () => {
    
    it('creates a 280 charecters tweet from navbar', () => {

        //check for tweet button in navbar visibility 
        cy.xpath(selectors.tweetButtonInNavbar)
            .should('be.visible')
        //click on tweet button in navbar
        cy.xpath(selectors.tweetButtonInNavbar).click()
        //check that url is changed to the popup of composing tweets
        cy.location('pathname').should('eq', '/compose/tweet')
        //check for pop up tweet composer visibility
        cy.xpath(selectors.tweetBoxPopup).should('be.visible')
        cy.xpath(selectors.tweetButtonInPopup).should('be.disabled')
        cy.xpath(selectors.tweetPopupBoxText).type(fullCharTweet).should('have.value', fullCharTweet)
        //check that tweet button is clickable 
        cy.xpath(selectors.tweetButtonInPopup).should('not.be.disabled')
        //click tweet button
        cy.xpath(selectors.tweetButtonInPopup).click()
        //check that the popup is now closed
        cy.xpath(selectors.tweetBoxPopup).should('not.be.visible')
        //check that url is back to home page
        cy.location('pathname').should('eq', '/home')
        //check that the tweet is visible now
        cy.xpath(selectors.userHandle).should('have.value',myHandle )
        cy.xpath(selectors.createdTweet).should('have.length', 280)

    })

    it('creates a less than 280 charecters tweet from homepage', () => {

        //check for tweet button in navbar visibility 
        cy.xpath(selectors.tweetButtonInNavbar)
            .should('be.visible')
        //click on tweet button in navbar
        cy.xpath(selectors.tweetButtonInNavbar).click()
        //check that url is changed to the popup of composing tweets
        cy.location('pathname').should('eq', '/compose/tweet')
        //check for pop up tweet composer visibility
        cy.xpath(selectors.tweetBoxPopup).should('be.visible')
        cy.xpath(selectors.tweetButtonInPopup).should('be.disabled')
        cy.xpath(selectors.tweetPopupBoxText).type(normalTweet).should('have.value', normalTweet)
        //check that tweet button is clickable 
        cy.xpath(selectors.tweetButtonInPopup).should('not.be.disabled')
        //click tweet button
        cy.xpath(selectors.tweetButtonInPopup).click()
        //check that the popup is now closed
        cy.xpath(selectors.tweetBoxPopup).should('not.be.visible')
        //check that url is back to home page
        cy.location('pathname').should('eq', '/home')
        //check that the tweet is visible now
        cy.xpath(selectors.userHandle).should('have.value',myHandle )
        cy.xpath(selectors.createdTweet).should('have.length', 6)

    })


    it('types a more than 280 charecters tweet from homepage', () => {

        //check for tweet button in navbar visibility 
        cy.xpath(selectors.tweetButtonInNavbar)
            .should('be.visible')
        //click on tweet button in navbar
        cy.xpath(selectors.tweetButtonInNavbar).click()
        //check that url is changed to the popup of composing tweets
        cy.location('pathname').should('eq', '/compose/tweet')
        //check for pop up tweet composer visibility
        cy.xpath(selectors.tweetBoxPopup).should('be.visible')
        cy.xpath(selectors.tweetButtonInPopup).should('be.disabled')
        cy.xpath(selectors.tweetPopupBoxText).type(invalidTweet).should('have.value', invalidTweet)
        //check that tweet button is non-clickable 
        cy.xpath(selectors.tweetButtonInPopup).should('be.disabled')

    })

    it('types an empty tweet from homepage', () => {

        cy.xpath(selectors.tweetButtonInNavbar)
            .should('be.visible')
        //click on tweet button in navbar
        cy.xpath(selectors.tweetButtonInNavbar).click()
        //check that url is changed to the popup of composing tweets
        cy.location('pathname').should('eq', '/compose/tweet')
        //check for pop up tweet composer visibility
        cy.xpath(selectors.tweetBoxPopup).should('be.visible')
        cy.xpath(selectors.tweetButtonInPopup).should('be.disabled')
        cy.xpath(selectors.tweetPopupBoxText).type(emptyTweet).should('have.value', emptyTweet)
        //check that tweet button is non-clickable 
        cy.xpath(selectors.tweetButtonInPopup).should('be.disabled')

    })

    it('discards the tweet', () => {

        cy.xpath(selectors.tweetButtonInNavbar)
            .should('be.visible')
        //click on tweet button in navbar
        cy.xpath(selectors.tweetButtonInNavbar).click()
        //check that url is changed to the popup of composing tweets
        cy.location('pathname').should('eq', '/compose/tweet')
        //check for pop up tweet composer visibility
        cy.xpath(selectors.tweetBoxPopup).should('be.visible')
        cy.xpath(selectors.tweetButtonInPopup).should('be.disabled')
        cy.xpath(selectors.tweetPopupBoxText).type(normalTweet).should('have.value', normalTweet)
        //check that tweet button is clickable 
        cy.xpath(selectors.tweetButtonInPopup).should('not.be.disabled')
        //cancel tweet
        cy.xpath(selectors.cancelTweetButton).click()
        //cancel popup window appears
        cy.xpath(selectors.cancelTweetPopupWindow).should('be.visible')
        //click on discard
        cy.xpath(selectors.discardTweetButton).click()
        //the tweet popup disappears and back to home page
        cy.xpath(selectors.cancelTweetPopupWindow).should('not.be.visible')
        cy.location('pathname').should('eq', '/home')

    })
})