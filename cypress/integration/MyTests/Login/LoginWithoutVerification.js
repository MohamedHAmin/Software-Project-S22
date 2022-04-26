import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';



//logging in with normal user

describe('Signup page', () => {
    it('log in with an account pending verification', () => {
    
    cy.visit('/', {failOnStatusCode: false});
    cy.xpath(selectors.username).type('Reemy').should('have.value', 'Reemy')
    cy.xpath(selectors.password).type('123456').should('have.value', '123456')
    cy.xpath(selectors.login).click()

    cy.on('window:alert', (text) => {
    expect(text).to.contains('Please verify your email').should('exists')
  })
})
})