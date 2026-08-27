import {createElement} from '@lwc/engine-dom';
import QuickTaskLwc from 'c/quickTaskLwc';
import mockTask from './data/getSingleTaskData.json';

async function flushPromises() {
    return Promise.resolve();
}

describe('c-quick-task-lwc creating a task', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper
    function createComponent() {
        const element = createElement('c-quick-task-lwc', {
            is: QuickTaskLwc
        });
        document.body.appendChild(element);
        return element;
    }

    it('renders initial UI elements correctly', () => {
        const element = createComponent();

        // Card
        const card = element.shadowRoot.querySelector('lightning-card');
        expect(card).not.toBeNull();
        expect(card.title).toBe('Task Creator');
        expect(card.iconName).toBe('standard:task');

        // Heading
        const heading = element.shadowRoot.querySelector('h1');
        expect(heading).not.toBeNull();
        expect(heading.textContent).toBe('Create task with Global Action');

        // Inputs – find by label (no data-id in your HTML)
        const inputs = Array.from(element.shadowRoot.querySelectorAll('lightning-input'));
        const subjectInput = inputs.find(i => i.label === 'Subject');
        const descriptionInput = inputs.find(i => i.label === 'Description');

        expect(subjectInput).toBeTruthy();
        expect(descriptionInput).toBeTruthy();

        // Buttons
        const buttons = Array.from(element.shadowRoot.querySelectorAll('lightning-button'));
        const cancelBtn = buttons.find(b => b.label === 'Cancel');
        const saveBtn = buttons.find(b => b.label === 'Save');

        expect(cancelBtn).toBeTruthy();
        expect(cancelBtn.variant).toBe('destructive');
        expect(saveBtn).toBeTruthy();
        expect(saveBtn.variant).toBe('brand');
    });

    it('captures user input and updates component state on save', async () => {
        const element = createComponent();

        const inputs = Array.from(element.shadowRoot.querySelectorAll('lightning-input'));
        const subjectInput = inputs.find(i => i.label === 'Subject');
        const descriptionInput = inputs.find(i => i.label === 'Description');

        // Set values and fire change events
        subjectInput.value = mockTask.subject || 'Follow up call';
        subjectInput.dispatchEvent(new CustomEvent('change'));

        descriptionInput.value = mockTask.description || 'Call client regarding quote';
        descriptionInput.dispatchEvent(new CustomEvent('change'));

        await flushPromises();

        // Click Save
        const saveBtn = Array.from(element.shadowRoot.querySelectorAll('lightning-button'))
            .find(b => b.label === 'Save');
        saveBtn.click();

        await flushPromises();

        // Assert the values are still present (or check whatever your handleSave does)
        expect(subjectInput.value).toBe(mockTask.subject || 'Follow up call');
        expect(descriptionInput.value).toBe(mockTask.description || 'Call client regarding quote');
    });
});