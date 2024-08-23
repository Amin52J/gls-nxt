import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Providers from "@TestUtils/Providers";
import Modal from "@Components/Modal";

describe("Modal Component", () => {
  const onModalCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render Modal and its children correctly", () => {
    render(
      <Modal onModalClose={onModalCloseMock}>
        <Modal.Header titleAsText="Test Modal">Test Header</Modal.Header>
        <Modal.Body descriptionAsText="Test Body">Test Body</Modal.Body>
        <Modal.Footer>Test Footer</Modal.Footer>
      </Modal>,
      { wrapper: Providers },
    );

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("Test Body")).toBeInTheDocument();
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
  });

  test("should close modal on Escape key press", () => {
    render(
      <Modal onModalClose={onModalCloseMock}>
        <Modal.Body descriptionAsText="Test Body">Test Body</Modal.Body>
      </Modal>,
      { wrapper: Providers },
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(onModalCloseMock).toHaveBeenCalledTimes(1);
  });

  test("should trap tab within the modal", async () => {
    render(
      <Modal onModalClose={onModalCloseMock}>
        <Modal.Body descriptionAsText="Test Body">
          <button>First Button</button>
          <button>Last Button</button>
        </Modal.Body>
      </Modal>,
      { wrapper: Providers },
    );

    const firstButton = screen.getByText("First Button");
    const lastButton = screen.getByText("Last Button");

    firstButton.focus();
    expect(firstButton).toHaveFocus();

    // Simulate Tab key press
    await userEvent.tab();
    expect(lastButton).toHaveFocus();

    // Simulate Shift + Tab key press
    await userEvent.tab({ shift: true });
    expect(firstButton).toHaveFocus();
  });

  test("should close modal on click outside", () => {
    render(
      <Modal onModalClose={onModalCloseMock}>
        <Modal.Body descriptionAsText="Test Body">Test Body</Modal.Body>
      </Modal>,
      { wrapper: Providers },
    );

    fireEvent.mouseDown(document.body);
    expect(onModalCloseMock).toHaveBeenCalledTimes(1);
  });

  test("should not close modal if clicking inside modal", () => {
    render(
      <Modal onModalClose={onModalCloseMock}>
        <Modal.Body descriptionAsText="Test Body">Test Body</Modal.Body>
      </Modal>,
      { wrapper: Providers },
    );

    const modalContent = screen.getByRole("document");
    fireEvent.mouseDown(modalContent);
    expect(onModalCloseMock).not.toHaveBeenCalled();
  });

  test("should call onModalClose when the close button is clicked", () => {
    render(
      <Modal onModalClose={onModalCloseMock}>
        <Modal.Header titleAsText="Test Modal">Test Header</Modal.Header>
      </Modal>,
      { wrapper: Providers },
    );

    const closeButton = screen.getByTitle("Close Modal");
    fireEvent.click(closeButton);
    expect(onModalCloseMock).toHaveBeenCalledTimes(1);
  });

  test("should apply the correct styles to the body when the modal opens and closes", () => {
    const { unmount } = render(
      <Modal onModalClose={onModalCloseMock}>
        <Modal.Body descriptionAsText="Test Body">Test Body</Modal.Body>
      </Modal>,
      { wrapper: Providers },
    );

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.paddingRight).not.toBe("");

    unmount(); // Close the modal by unmounting the component

    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.paddingRight).toBe("0px");
  });
});
