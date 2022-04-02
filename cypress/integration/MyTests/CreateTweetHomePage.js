import selectors from "../../support/selectors"

//This test creates a tweet from homepage 

const fullCharTweet= 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const normalTweet='Hello!'
const invalidTweet='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhh'
const emptyTweet=' '
const myHandle= "@Roaa09428212"
describe('creating a tweet from homepage', () => {
    
    it('creates a 280 charecters tweet from homepage', () => {

        //check for tweet box visibility 
        cy.xpath(selectors.tweetBox)
            .should('be.visible')
        cy.xpath(selectors.tweetBox).type(fullCharTweet).should('have.value', fullCharTweet)
        //check that tweet button is clickable 
        cy.xpath(selectors.tweetButton).should('not.be.disabled')
        //click tweet button
        cy.xpath(selectors.tweetButton).click()
        //check that the tweet is visible now
        cy.xpath(selectors.userHandle).should('have.value',myHandle )
        cy.xpath(selectors.createdTweet).should('have.length', 280)
        //tweet box is empty ready for another tweet
        cy.xpath(selectors.tweetButton).should('be.disabled')

    })

    it('creates a less than 280 charecters tweet from homepage', () => {

        //check for tweet box visibility 
        cy.xpath(selectors.tweetBox)
            .should('be.visible')
        cy.xpath(selectors.tweetBox).type(fullCharTweet).should('have.value', normalTweet)
        //check that tweet button is clickable 
        cy.xpath(selectors.tweetButton).should('not.be.disabled')
        //click tweet button
        cy.xpath(selectors.tweetButton).click()
        //check that the tweet is visible now
        cy.xpath(selectors.userHandle).should('have.value',myHandle )
        cy.xpath(selectors.createdTweet).should('have.length', 6)
        //tweet box is empty ready for another tweet
        cy.xpath(selectors.tweetButton).should('be.disabled')

    })

    it('types a more than 280 charecters tweet from homepage', () => {

        //check for tweet box visibility 
        cy.xpath(selectors.tweetBox)
            .should('be.visible')
        cy.xpath(selectors.tweetBox).type(fullCharTweet).should('have.value', invalidTweet)
        //check that tweet button is non-clickable 
        cy.xpath(selectors.tweetButton).should('be.disabled')

    })

    it('types an empty tweet from homepage', () => {

        //check for tweet box visibility 
        cy.xpath(selectors.tweetBox)
            .should('be.visible')
        cy.xpath(selectors.tweetBox).type(fullCharTweet).should('have.value', emptyTweet)
        //check that tweet button is non-clickable 
        cy.xpath(selectors.tweetButton).should('be.disabled')

    })
})
