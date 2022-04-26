import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Tweet a pic', () => {

    it('tweeting a picture with text', () => {
  //log in
  cy.visit('/', {failOnStatusCode: false});
  cy.xpath(selectors.username).type('Reem123').should('have.value', 'Reem123')
  cy.xpath(selectors.password).type('Reem1234').should('have.value', 'Reem1234')
  cy.xpath(selectors.login).click()

  //tweet a pic
  cy.xpath(selectors.cameraIcon).first().click({force: true}).selectFile('\pic4.jpg')
  //writing a tweet
  cy.xpath(selectors.tweetPicText).first().click()
  cy.xpath(selectors.tweetPicText).first().type('Zootopia ').should('have.value', 'Zootopia ')
  cy.xpath(selectors.tweetButton).click()
 
})
})
