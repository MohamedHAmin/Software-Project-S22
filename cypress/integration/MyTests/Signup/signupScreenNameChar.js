import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />
const lessThan3='rr'
const moreThan3='rrrrrr'
const exactly3='rrr'


describe('Signup page', () => {
    it('signs up with screen name of less than 3 char', () => {
    
      cy.visit('/')
      cy.xpath(selectors.signupNavbar).click()
      cy.location('pathname').should('eq', '/SignUp') 
      
      //screen name
      cy.xpath(selectors.screenName).type(lessThan3).should('have.value', lessThan3)
      
      //click anywhere
      cy.xpath(selectors.tag).click()

      cy.xpath(selectors.signupForm).contains('screenName must be at least 3 characters')

    })
    it('signs up with screen name of 3 char', () => {
    
        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
        //screen name
        cy.xpath(selectors.screenName).type(exactly3).should('have.value', exactly3)
        
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('screenName must be at least 3 characters').should('not.exist')
  
      })

      it('signs up with screen name of more than 3 char', () => {
    
        cy.visit('/')
        cy.xpath(selectors.signupNavbar).click()
        cy.location('pathname').should('eq', '/SignUp') 
        
        //screen name
        cy.xpath(selectors.screenName).type(moreThan3).should('have.value', moreThan3)
        
        //click anywhere
        cy.xpath(selectors.tag).click()
  
        cy.xpath(selectors.signupForm).contains('screenName must be at least 3 characters').should('not.exist')
  
      })
    })