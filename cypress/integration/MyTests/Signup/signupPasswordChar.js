import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const lessThan6='12'
const moreThan6='123456789'
const exactly6='123456'
const moreThan16='1234567890123456789'
const exactly16='1234567890123456'


describe('Signup page', () => {
    it('signs up with password of less than 6 char', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //password
      cy.xpath(selectors.passwordSignup).type(lessThan6).should('have.value', lessThan6)

      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('password must be at least 6 characters')

    })
    it('signs up with password of more than 6 char and less than 16', () => {
    
        cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //password
      cy.xpath(selectors.passwordSignup).type(moreThan6).should('have.value', moreThan6)

      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('password must be at least 6 characters').should('not.exist')
      cy.xpath(selectors.signupForm).contains('password must be at most 16 characters').should('not.exist')

      })

      it('signs up with password of exactly 6 char', () => {
    
        cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //password
      cy.xpath(selectors.passwordSignup).type(exactly6).should('have.value', exactly6)

      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('password must be at least 6 characters').should('not.exist')
      cy.xpath(selectors.signupForm).contains('password must be at most 16 characters').should('not.exist')

      })

      it('signs up with password of exactly 16 char', () => {
    
        cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //password
      cy.xpath(selectors.passwordSignup).type(exactly16).should('have.value', exactly16)

      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('password must be at least 6 characters').should('not.exist')
      cy.xpath(selectors.signupForm).contains('password must be at most 16 characters').should('not.exist')

      })

      it('signs up with password of more than 16 char', () => {
    
        cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //password
      cy.xpath(selectors.passwordSignup).type(moreThan16).should('have.value', moreThan16)

      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('password must be at most 16 characters')

      })
    })