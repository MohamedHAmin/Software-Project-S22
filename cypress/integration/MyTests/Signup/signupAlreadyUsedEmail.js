import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const screenName='Reem'
const tag='newReem123'
const email='reemyasser803@gmail.com'
const password='Reem1234'

describe('Signup page', () => {
    it('signs up with an already used email', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //screen name
      cy.xpath(selectors.screenName).type(screenName).should('have.value', screenName)
      
      //tag
      cy.xpath(selectors.tag).type(tag).should('have.value', tag)

      //email
      cy.xpath(selectors.email).type(email).should('have.value', email)

      //password
      cy.xpath(selectors.passwordSignup).type(password).should('have.value', password)

      //next
      cy.xpath(selectors.nextButton).click()
 
      
    //   //birthdate
    //   cy.xpath(selectors.birthdate).type('2002-01-01').should('have.value', '2002-01-01')

    //   //phone number
    //   cy.xpath(selectors.phoneNumber).type('012345').should('have.value', '012345')

    //   //biography
    //   cy.xpath(selectors.biography).type('heyyy there').should('have.value', 'heyyy there')
      cy.xpath(selectors.signupButton).click()

      cy.xpath(selectors.emailALreadyUsedError).should('have.text', 'email already used')
      cy.location('pathname').should('eq', '/SignUp')
    })
    })