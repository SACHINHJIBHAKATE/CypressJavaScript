/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Test Suite',function(){

    it ('Test Case2',function(){
    
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

       // ***************************  CHECKBOXES *************************** 
        
        //select the checkbox - use check() or we can even use click() method
        cy.get('#checkBoxOption1').check()
        //cy.get('#checkBoxOption1').click()

        // select the checkbox and write assertion to check if the checkbox is checked (selected)
        // Assertions: https://docs.cypress.io/guides/references/assertions
        cy.get('#checkBoxOption2').check().should('be.checked')
        

        // select the checkbox and write assertion to check if the correct checkbox is checked (selected)
        // use the value attribute
        // <input id="checkBoxOption3" value="option3" name="checkBoxOption3" type="checkbox" xpath="1">
        // We can use 2 assertions at once
        // when we validate the behavior e.g., if the checkbox is checked is the behavior of the chekbox, we use be
        // when we validate the property e.g., value, we use have
        cy.get('#checkBoxOption3').check().should('be.checked').and('have.value', 'option3')
        //cy.get('#checkBoxOption3').check().should('be.checked').should('have.value', 'option3')

        // uncheck the checkbox and write assertion to ensure the checkbox is unchecked
        // do this for all 3 checkboxes
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('#checkBoxOption2').uncheck().should('not.be.checked')
        cy.get('#checkBoxOption3').uncheck().should('not.be.checked')


        // Scenario: select all 3 checkboxes using a single command
        // all 3 checkboxes have a commom attribute which is type 'checkbox'
        // therefore, use CSS selector [attribute='value'] --> [type='checkbox']
        // <input id="checkBoxOption1" value="option1" name="checkBoxOption3" type="checkbox" css="3">
        // <input id="checkBoxOption2" value="option2" name="checkBoxOption3" type="checkbox" css="3">
        // <input id="checkBoxOption3" value="option3" name="checkBoxOption3" type="checkbox" css="3">
        cy.get("[type='checkbox']").check()

        // uncheck the checkboxes again and write assertion to ensure the checkboxes are unchecked
        // do this for all 3 checkboxes
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('#checkBoxOption2').uncheck().should('not.be.checked')
        cy.get('#checkBoxOption3').uncheck().should('not.be.checked')

        // Scenario: select checkboxes by passing value attributes in the check() method
        // cy.get("[type='checkbox']") --> This returns 3 checkboxes, then write check() method and check() method accepts value attribute for the checkbox and also accepts values as array
        cy.get("[type='checkbox']").check(['option1'])
        cy.get("[type='checkbox']").check(['option2','option3'])

        // *************************** STATIC DROPDOWN ***************************

        // Tag for a static dropdown is always ´select´
        // Write CSS selector either using tag cy.get(´select´) or using id cy.get('#dropdown-class-example')
        // <select id="dropdown-class-example" name="dropdown-class-example" css="1">
        
        // We can use 'select' method to select a value from the static dropdown
        // In the select method, we can pass the value attribute or the text
        // <option value="option1" xpath="1">Option1</option>
        // <option value="option2" xpath="1">Option2</option>
        // <option value="option3" xpath="1">Option3</option>
        // write assertion to ensure the correct value is selected --> use the value attribute
        
        cy.get('select').select('option1').should('have.value', 'option1')
        // cy.get('select').select('Option1')

        // *************************** DYNAMIC DROPDOWN ***************************

        cy.get('#autocomplete').type('ind')

        // cy.get('.ui-menu-item-wrapper') -> This extracts all elements within the dropdown with class ´ui-menu-item-wrapper´
        // .each(($el, index, $list) => { --> This resolves the promise, therefore we can apply text() method (which is jQuery method) in step 74 without resolving promise
        cy.get('.ui-menu-item-wrapper').each(($el, index, $list) => {

            // $el.text() -> This extracts text of the webelement
            const countryName = $el.text()

            if (countryName==='India')
            {
                // just as an exception, when using click() method, even if promise is resolved, we need to resolve the promise for $el using cy.wrap($el)
                // if w just use ($el).click() --> then cypress strikes through the click() method
                cy.wrap($el).click()
            }
        })

        // write assertion to ensure the value 'India' is populated
        cy.get('#autocomplete').should('have.value', 'India')

        // *************************** VISIBLE and INVISIBLE TEXTBOX ***************************

        // This checks that the text box is visible
        cy.get('#displayed-text').should('be.visible')
        // This clicks the ´Hide´ button (to hide the text box)
        cy.get('#hide-textbox').click()
        // This checks that the text box is not visible
        cy.get('#displayed-text').should('not.be.visible')
        // This clicks the ´Show´ button (to show the text box again on the page)
        cy.get('#show-textbox').click()
        // This checks that the text box is visible again on the page
        cy.get('#displayed-text').should('be.visible')

        // *************************** RADIO BUTTON ***************************

        // we can use check() or click() button to select the radio button
        // <input value="radio2" name="radioButton" class="radioButton" type="radio" xpath="1">
        cy.get("[value='radio2']").check()
        // cy.get("[value='radio2']").click()

        // *************************** ALERTS ***************************

        // Cypress automatically handles the alerts, so no actions are required to action the alerts, 
        // which means, Cypress automatically clicks the OK button (or any other button) required to action the pop-up
        // Therefore, if we need to capture the text on the alert, we need to explicitly call the event for the alert
        // Reference: https://docs.cypress.io/api/events/catalog-of-events#App-Events
        
        // after clicking the 'Alert' button, pop-up opens. Cypress clicks the OK button the pop-up to close (action) the pop-up
        cy.get("#alertbtn").click()
        // after clicking the 'Confirm' button, pop-up opens. Cypress clicks the OK button the pop-up to close (action) the pop-up
        cy.get("#confirmbtn").click()
        
        // Event Name: window:alert
        // Yields:	the alert text (String)
        // Description: Fires when your app calls the global window.alert() method. Cypress will auto accept alerts. You cannot change this behavior.
        
        // Event Name: window:confirm
        // Yields:	the confirmation text (String)
        // Description: Fires when your app calls the global window.confirm() method. Cypress will auto accept confirmations. Return false from this event and the confirmation will be canceled.

        // on() method trigers the events & has 2 arguments 1) event name & 2) string variable where the captured string text from the alert will be stored)
        // On top of the cypress command on(), as we are performing additional action, where the captured string text from the alert is stored in a variable, we need to resolve the promise) 
        // => i.e. pipe operator is used instead if function.then() to resolve the promise
        
        /*
        cy.on('window:alert').then(function(str)
        {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        */
        cy.on('window:alert', (str) => {

            // This is a Chai library assertion to check if the captured string value matches the actual string text on the alert
            // format: expect(string variable where captured string text is stored).to.equal('actual string text')
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        // on() method trigers the events & has 2 arguments 1) event name & 2) string variable where the captured string text from the alert will be stored)
        // On top of the cypress command on(), as we are performing additional action, where the captured string text from the alert is stored in a variable, we need to resolve the promise) 
        // => i.e. pipe operator is used instead if function.then() to resolve the promise
        cy.on('window:confirm', (str) => {

            // This ia a Chai library assertion to check if the captured string value matches the actual string text on the alert
            // format: expect(string variable where captured string text is stored).to.equal('actual string text')
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

        // *************************** CHILD TAB ***************************

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // Cypress does not support child tabs 
        // and therefore for automating the child tabs, we need to open the link in same tab
        // To open the link in the same tab, we need to remove the target attribute in the HTML code for that element which opens the link in the child tab
        // <a id="opentab" class="btn-style class1 class2" href="https://www.rahulshettyacademy.com/" target="_blank">Open Tab</a>
        // Cypress has the ability to manipulate the DOM i.e. the HTML code
        // For removing the attribute from the DOM, we have a function called removeAttr() in jQuery
        // Syntax: $(selector).removeAttr(attribute)
        // Cypress supports the jQuery methods
        // For invoking the jQuery functions from Cypress, we have a command called as 'invoke()' in Cypress
        // cy.get("#opentab") ==> This will capture the web element (which includes the target attribute)
        // then, invoke('removeAttr','target') ==> This removes the target attribute from the the web element, before clicking to avoid it opening in the new tab
        // and then, click() clicks on the web element and opens in the same tab
        // Once the web page opens in the same tab, we can automate the web page using Cypress (else as Cypress does not support child tabs, it is not possible to automate the child tabs using Cypress)
        // Reference: https://www.w3schools.com/jquery/html_removeattr.asp
        cy.get("#opentab").invoke('removeAttr','target').click()

        // Cypress does not support cross domains i.e.switching between domains (URL´s)
        // Therefore, after launching the NEW URL in th SAME tab, we need to tell Cypress that this is your origin now,
        // because it considers the first URL as its origin 
        // Therefore, use the origin method in the below format which accepts 2 arguments, the URL and function under which we need to wrap the code we need to execute on the new webpage
        // when we hover over origin, the below format is shown
        // cy.origin('example.com', () => {
        // cy.get('h1').should('equal', 'Example Domain')
        // })
        cy.origin('https://www.qaclickacademy.com/', () =>
        {
            // We can write the CSS selector by traversing from parent to child and giving the space between the selectors for parent and child
            // We can use any combinations of CSS selectors for parent and child
            // For parent class is "navbar-nav ml-auto", so we can write .classname which is .ml-auto (if there is a space in classname any part before or after the space can be used)
            // For child, we can write CSS selector as - tagname[attribute*='value'] - If we are using partial value, then we need to write regular expression * in front of attribute
            // <ul class="navbar-nav ml-auto" xpath="1"> (This is the parent)
	        //      <a href="about.html" xpath="1">About us</a> (This is the child)
            cy.get(".navbar-nav a[href*='about']").click()
 
            // Same parent to child traversing as explained above
            // Once we capture the element, we need to ensure that the text of that element is 'Welcome to QAClick Academy',
            // Therefore, write assertion - should('contain', 'text')
            // <div class="section-title mt-50" xpath="1"> (This is the parent)
	        //      <h2 xpath="1">Welcome to QAClick Academy </h2> (This is the child)
            cy.get('.mt-50 h2').should('contain', 'Welcome to QAClick Academy')

            // Instead of writing line 203, where we are capturing the webelement and writing assertion to validate the webelement text, we can write like below
            // cy.get('.mt-50 h2') --> This captures the webelement but before applying text() method which is non cypress method (jQuery method), we need to resolve the promise and capture the webelment into another element (textelement in this case)
            // and then log the text to the Test Runner console
            cy.get('.mt-50 h2').then(function(textelement)
            {
                const welcomeText = textelement.text()
                cy.log(welcomeText)
            })

            // If we need to go back the previous page, use go('back) - format is 'go(´direction´) 
            // This is just like clicking the back button in the browser
            // Since we have to go 2 pages back, we need to write the command twice
            // Always write the go(´back´) method within the cy.origin() block because onc you are out of cy.origin(), Cypress doesn´t know what the origin is
            cy.go('back')
            cy.go('back')
        })  

        // *************************** WEB TABLE ***************************

        // Refer to the Web Table on website: https://rahulshettyacademy.com/AutomationPractice/
        // Refer to 'Cypress Notes.doc' page 340 onwards
        // Scenario: We need to capture the Price for the following course and write assertion to ensure its correct as per the web table
        // Course name: Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C
        // Therefore, we need to first capture all the courses, then move to the sibling element (price) using the index

        // cy.get("table[name='courses'] tbody tr td:nth-child(2)") --> This captures all the course names in the 2nd column
        // Then we apply the loop
        // $el.text() --> This captures the text from the course element (Since the promised is resolved, we can directly applu text() method on $el)
        cy.get("table[name='courses'] tbody tr td:nth-child(2)").each(($el, index, $list) => {

            const courseName = $el.text()

            if (courseName === 'Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C')
            {
                // cy.get("table[name='courses'] tbody tr td:nth-child(2)") --> This captures all the course names in the 2nd column
                // eq(index) --> Then captures the element based on th value in the index 
                // next() --> Then, moves to the sibling element and captures the sibling element  
                // since we can not apply text() method (non cypress jQuery method directly, we need to to first resolve the promise)
                // and capture the element in priceElement
                // then apply text() method
                // cy.log(priceText) --> This logs the priceText to the Test Runner console 
                // expect(priceText).to.equal('20') --> This assertion expects priceText to 20 (actual price)
                cy.get("table[name='courses'] tbody tr td:nth-child(2)").eq(index).next().then(function(priceElement)
                {
                    const priceText = priceElement.text()
                    cy.log(priceText)
                    expect(priceText).to.equal('20')
                })
            }

        })

        // *************************** MOUSEOVER HIDDEN ELEMENTS***************************

        // Scenario: Click the mouse over element (which is a hidden element)

        // Approach 1:

        // Once we identify the mouse over element using 'cy.get(".mouse-hover-content")', in order to view & select the hidden elements, (Top & Reload), we need to use the show() method in jQuery
        // As the name suggests, the jQuery show() method is used for the purpose of showing the hidden elements.
        // Syntax: $(selector).$(selector).show(speed,easing,callback)
        // Cypress supports the jQuery methods
        // For invoking the jQuery functions from Cypress, we have a command called as 'invoke()' in Cypress
        // Reference: https://www.w3schools.com/jquery/eff_show.asp

        // Note: We need to ensure that we identify the correct element i.e., the element should be the immediate parent of the mouse over options,
        // else, invoke('show') method will not show the child elements 
        // Refer 'Cypress Notes.doc' for additional details 
        cy.get(".mouse-hover-content").invoke('show')

        // cy.contains('Top') --> This returns the webelement having text ´Top´
        // For clicking the webelement, use click() method
        cy.contains('Top').click()

        // In order to check if the new webpage is displayed, use the below:
        // new web page URL: https://rahulshettyacademy.com/AutomationPractice/#top
        cy.url().should('include','top')

        // Approach 2:
        // Cypress also provides way to click the hidden element

        // Use click({ force: true }) to click the hidden element
        // Reference: https://docs.cypress.io/api/commands/click#Coordinates
        // Use ‘contains()’ method with the element text to click the element with the desired text
        // For clicking the 'Top' option, we can use the below:
        cy.contains('Top').click({ force: true })
        cy.url().should('include','top')

        // *************************** IFRAME ***************************

        // Objective of this test is to do hands on exercises for Advanced Automation feature such as handling frames
        // iFrame is the HTML object injected into the another HTML object
        // Step 1: We need to install the iframe package ==> npm install -D cypress-iframe
        // Step 2: We need to import the installed package in the spec file ==> import 'cypress-iframe' (We need to include this as the top)
        // Step 3: We need to include references (mentioned below), so it gives auto suggestions for the iframe methods e.g. frameLoaded()
        // /// <reference types="cypress-iframe" />

        // Following the HTML element details for the iframe
        // <iframe id="courses-iframe" src="https://www.rahulshettyacademy.com/" name="iframe-name" style="width: 100%; 
        // height: 600px" scrolling="yes" marginwidth="0" marginheight="0" vspace="0" hspace="0" frameborder="0"> </iframe>

        // Step 4: We need to load the iframe in the cypress object
        cy.frameLoaded("#courses-iframe")

        // Step 5: We then need to switch to the iframe before performing the actions on elements within iframe 
        // cy.iframe() ==> This is used to switch to the iframe 
        // find("a[href='mentorship']") ==> This returns 2 elements
        // If we need the first element (from the list of 2 elements), use eq() method & pass the index of that element
        cy.iframe().find("a[href='mentorship']").eq(0).click()

        // We need to add some wait page renders after selecting the prior element and if next element appears after the page rendering
        // e.g., in this scenario, page renders after we click the 'Mentorship' link
        // and then, the mentorship page (with the products) is displayed 
        cy.wait(5000)

        // We need to ensure there are 2 pricing elements 'Bronze' & 'Platinum' on the webpage 
        // There are 2 elements with the same class name 'pricing-title' on the webpage,
        // find(".pricing-title") ==> this retruns 2 elements
        // so, we can aply assertion to check if number of elements are 2 
        cy.iframe().find('.pricing-title').should('have.length', 2)
    })
})
