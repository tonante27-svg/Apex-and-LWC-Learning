import { createElement } from '@lwc/engine-dom';
import Parent from 'c/parent';

// Fixed typo: getSingleContact.json (capital 'C' fixed if applicable)
const mockContact = require('./data/getSingleContact.json');

async function flushPromises() {
    return Promise.resolve();
}

describe('c-parent passing data to c-child', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('passes contact object to child component on load', () => {
        // Arrange
        const element = createElement('c-parent', {
            is: Parent
        });

        // Add parent component to dom
        document.body.appendChild(element);
        
        // Select the child element via shadowRoot
        const childEl = element.shadowRoot.querySelector('c-child');
        expect(childEl).not.toBeNull();

        // Assert that public @api properties on the child match your data
        expect(childEl.contact).toEqual(mockContact);
    });

    // Added 'async' keyword to allow 'await' inside this test block
    it('updates contact property when state changes', async () => {
        // Arrange
        const element = createElement('c-parent', {
            is: Parent
        });
        document.body.appendChild(element);

        // Select the child element via shadowRoot
        const childEl = element.shadowRoot.querySelector('c-child');
        
        const refreshBtn = element.shadowRoot.querySelector('lightning-button');
        refreshBtn.click();

        // Works cleanly now because the outer function is async
        await flushPromises();

        // Assert that public @api properties on the child match your data
        expect(childEl.contact.Email).toBe(mockContact.Email);
    });
});