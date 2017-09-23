'use strict'; 

const By = require("selenium-webdriver").By;

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
            inviteeForm: By.id("registrar"), 
            inviteeNameField: By.css("#registrar input[name='name']"),//.name("name")
            toggleNonRespondersVisibility: By.css(".main > div input"), 
            inviteeByName: name => By.xpath(`//span[text() = "${name}"]/..`)
        };
    }

    open() {
        this.driver.get(process.env.URL);
    }

    addInvitee(name) {
        this.driver.findElement(this.locators.inviteeNameField)
            .sendKeys(name); 
        this.driver.findElement(this.locators.inviteeForm).submit();
    }
    
    toggleNonRespondersVisibility() {
        this.driver.findElement(this.locators.toggleNonRespondersVisibility)
            .click();
    }

    findInviteeByName(name) {
        const el = this.driver
            .findElement(this.locators.inviteeByName(name));
        return new Invitee(el);
    }
}

class Invitee {
    constructor(element) {
        this.element = element;
        this.locators = {
            editButton: By.css("button:first-of-type"),
            editNameField: By.css("input[type='text']"),
            removeButton: By.css("button:last-child"),
            confirmedCheckbox: By.css("input[type='checkbox']")
        };
    }

    changeName(name) {
        const button = this.element
            .findElement(this.locators.editButton);
        button.click();
        const textField = this.element
            .findElement(this.locators.editNameField);
        textField.clear();
        textField.sendKeys(name);
        button.click();
    }

    remove() {
        this.element
            .findElement(this.locators.removeButton)
            .click();
    }

    toggleConfirmation() {
        this.element
            .findElement(this.locators.confirmedCheckbox)
            .click();
    }

    editName() {
        this.element
            .findElement(this.locators.editButton)
            .click();
    }
}

module.exports = HomePage; 
