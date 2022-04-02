/// <reference types="cypress-xpath" />

describe('Logout page', () => {
  it('Logs out from twitter account', () => {

    //click on the account button at the bottom left corner
    cy.get('[data-testid="SideNav_AccountSwitcher_Button"]').click()
    cy.xpath('//*[@id="react-root"]/div/div/div[2]/header/div/div/div/div[2]/div/div').click()
    
    //click on logout
    cy.get('[data-testid="AccountSwitcher_Logout_Button"]').click()
    //cy.xpath('//*[@id="layers"]/div[2]/div/div/div[2]/div/div[2]/div/div/div/div/div/a[2]').click()

    //the url is changed tp logout page
    cy.location('pathname').should('eq', '/logout')

    //click on logout
    cy.get('[data-testid="confirmationSheetConfirm"]').click()
    //cy.xpath('//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[2]/div[1]').click()

    //redirect to homepage or login page in our project
    cy.location('pathname').should('eq', 'https://twitter.com/?logout=1648710851247')

})
})