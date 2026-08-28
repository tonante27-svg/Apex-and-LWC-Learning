import { createElement } from "@lwc/engine-dom";
import QuickCase from "c/quickCase";

// Helper function to wait until the microtask queue is empty. This is needed for promise
// timing when calling imperative Apex.
async function flushPromises() {
  return Promise.resolve();
}
describe("c-quick-case", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("verifies that all the components are  truthy", async () => {
    // Arrange
    const element = createElement("c-quick-case", {
      is: QuickCase
    });

    // Act
    document.body.appendChild(element);

    //await flushPromises();
    // Query chart-bar component
    const comboboxes =
      element.shadowRoot.querySelectorAll("lightning-combobox");

    const subjectEl = element.shadowRoot.querySelector("lightning-input");
    const descriptionEl =
      element.shadowRoot.querySelector("lightning-textarea");
    const contactPickerEl = element.shadowRoot.querySelector(
      "lightning-record-picker"
    );

    const statusEl = comboboxes[0];

    const priorityEl = comboboxes[1];

    //Assert
    expect(subjectEl).toBeTruthy();
    expect(descriptionEl).toBeTruthy();
    expect(contactPickerEl).toBeTruthy();
    expect(statusEl).toBeTruthy();
    expect(priorityEl).toBeTruthy();
    expect(comboboxes).toHaveLength(2);
  });
});
