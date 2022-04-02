import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';
//This test displays the dark mode from settings
describe('choosing dim mode', () => {
    
    it('chooses the dim mode', () => {

        //click settings
        cy.xpath(selectors.settingsButtonNavbar).click()
        //popup settings menu appear
        cy.xpath(selectors.settingsMenu).should('be.visible')
        
        //click display
        cy.xpath(selectors.display).click()
        cy.location('pathname').should('eq', '/i/display')
        cy.xpath(selectors.displayPopup).should('be.visible')
        cy.xpath(selectors.dimMode).click()
        //check colour change
        cy.xpath(selectors.bodyColour).should('have.css', 'background-color')
            .and('eq', 'rgb(21, 32, 43)')
        //click done will return to home page
        cy.xpath('//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div/div[2]/div[9]/div').click()
        //check that the display pop up is closed
        cy.xpath(selectors.displayPopup).should('not.be.visible')
        //or check that url is directed back to home
        cy.location('pathname').should('eq', '/home')



    })
})