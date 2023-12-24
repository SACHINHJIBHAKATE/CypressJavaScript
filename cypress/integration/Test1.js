/// <reference types="Cypress" />

describe('Test Suite',function(){

    it ('Test Case1',function(){
    
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.get('.product:visible').should('have.length',4)  
        cy.get('.products').find('.product').should('have.length',4)
        
        // cy.get('.products').find('.product') --> cy.get('.products') returns 1 element, then, .find('.product') returns 4 elements inside that element
        // eq(2) then returns webelement at index 2 (index starts from 0)
        // contains('ADD TO CART') - This returns webelement where text is 'ADD TO CART'
        // then click() clicks that element
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click()

        // Using Alias:
        // If we need to identify the same element in multiple steps, like the below steps
        // then, we can use Alis instead of the element locator, so if the element properties changes in future, we can just update the step where alias is defined
        // Alis for element locator 'cy.get('.products')' can be defined using 'as('productlocator')' where ´productlocator´ is any text
        // And then as '@productlocator' is passed instead of the CSS selector for that element
        // cy.get('.products').as('productlocator')
        // cy.get('@productlocator').find('.product').should('have.length','4')

        // .each(($el, index, $list) => { --> This resolves the promise, therefore we can apply text() method (which is jQuery method) in step 21 without resolving promise
        cy.get('.products').find('.product').each(($el, index, $list) => {

            // in order to find elements e.g. product name element or button element inside the element, use find method
            const vegName = $el.find('.product-name').text()

            if (vegName.includes('Cashews'))
            {
                // just as an exception, when using click() method, even if promise is resolved, we need to resolve the promise for $el using cy.wrap($el)
                cy.wrap($el).contains('ADD TO CART').click()
            }

        })
        // before applying text() method (which is jQuery method), we need to resolve the promise and store webeelement (returned from cy.get('.brand.greenLogo') in element logo)
        cy.get('.brand.greenLogo').then(function(logo)

        {
            const logoText = logo.text()
            // cy.log prints the output in Cypress Test Runner logs
            cy.log(logoText)
        })

        // since console.log() is a javascript method, it will be executed in an asynchronous manner
        // if we want it to be executed in sequence and after cy.log('print first'), include it in the function blocks, so it is executed after cy.log('print first')
        cy.log('print first').then(function()
        {
            console.log('print second')
        })  

        // Assertion - should('have.text', 'GREENKART')
        // https://on.cypress.io/assertions
        cy.get('.brand.greenLogo').should('have.text', 'GREENKART')

        //click on the Cart icon
        cy.get("img[alt='Cart']").click()

        //click on 'PROCEED TO CHECKOUT' button 
        // contains('PROCEED TO CHECKOUT') --> This returns the 'PROCEED TO CHECKOUT' button webelement, then we click on it
        cy.contains('PROCEED TO CHECKOUT').click()

        // contains('Place Order') --> This returns the 'Place Order' button webelement, then we click on it
        cy.contains('Place Order').click()
    })
})

/*
CSS selectors:

#id or [id="idvalue"]
tagname#id

.classname
tagname.classname

tagname[attribute='value'] 
tagname[attribute='value']:nth-child(index of that element)
Note: tagname is optional

tagname

We can also write CSS selectors by traversing from parent to child using tag names
Identify the parent tag name for it and traverse e.g., form input or form > input

// We can write the CSS selector by traversing from parent to child and giving the space between the selectors for parent and child
// For parent class is "navbar-nav ml-auto", so we can write .classname which is .ml-auto (if there is a space in classname any part before or after the space can be used)
// For child, we can write CSS selector as - tagname[attribute*='value'] - If we are using partial value, then we need to write regular expression * in front of attribute
// <ul class="navbar-nav ml-auto" xpath="1"> (This is the parent)
//      <a href="about.html" xpath="1">About us</a> (This is the child)
*/

/*
Promise:
Very important ==> If we just use cypress commands e.g. cy.get('.brand.greenLogo'), then Cypress appends .then() at the end of the step and resolves the promise and then the execution moves to the next step,
However, if we do non cypress things e.g. if we throw the command output i.e. the command output for command 'cy.get('.brand.greenLogo')' into a variable to store the element, Cypress isn't sure if it should resolve the promise or not,
And therefore in this case, we need to resolve the promise ourself explicitly using .then() method - 
const logoelement = cy.get('.brand.greenLogo')
console.log(logoelement.text())

THUMB RULES (when to use promise):
1) If we are concatenating cypress command to a cypress command,
e.g. if we are concatenating cypress command 'type('ca')' to cypress command 'cy.get('.search-keyword')'
then the second command i.e. the child command has the ability to resolve the promise (and as resolving promise meaning step is executed), it accepts the parent output and the child command is executed
And if the second command is a non cypress command e.g. in 'cy.get('.brand.greenLogo').text()' - text() is a non cypress command (it is a jQuery method)
then we need to resolve the promise ouselves because the non cypress command is unable to resolve the promise of the parent command
2) If we do non cypress things e.g. if we throw the command output i.e. the command output for command 'cy.get('.brand.greenLogo')' into a variable to store the element, Cypress isn't sure if it should resolve the promise or not,
therefore, we need to resolve the promise ourself explicitly using .then() method
*/

