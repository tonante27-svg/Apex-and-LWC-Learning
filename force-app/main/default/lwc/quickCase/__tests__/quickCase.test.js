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

  it("verifies that all the components are  truthy", () => {
    // Arrange
    const element = createElement("c-quick-case", {
      is: QuickCase
    });

    // Act
    document.body.appendChild(element);

    // Query chart-bar component
    const subjectEl = element.shadowRoot.querySelector(
      'input[label="Subject"]'
    );
    const descriptionEl = element.shadowRoot.querySelector(
      'input[label="Description"]'
    );
    await flushPromises();
    expect(subjectEl).toBeTruthy();
    expect(descriptionEl).toBeTruthy();
  });
});
