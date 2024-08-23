"use client";

import { useState } from "react";
import { HomeContainer, ModalTrigger } from "./styles";
import Modal from "@Components/Modal";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  return (
    <>
      <HomeContainer>
        <ModalTrigger onClick={() => setIsModalVisible(!isModalVisible)}>
          Open Modal
        </ModalTrigger>
        {isModalVisible && (
          <Modal onModalClose={() => setIsModalVisible(false)}>
            <Modal.Header titleAsText="First Modal Title">
              First Modal
            </Modal.Header>
            <Modal.Body descriptionAsText="Description of the first modal">
              <ModalTrigger
                onClick={() => setIsSecondModalVisible(!isSecondModalVisible)}
              >
                Open Second Modal
              </ModalTrigger>
              {isSecondModalVisible && (
                <Modal onModalClose={() => setIsSecondModalVisible(false)}>
                  <Modal.Header titleAsText="Second Modal Title">
                    Second Modal
                  </Modal.Header>
                  <Modal.Body descriptionAsText="Description of the second modal">
                    Second Modal Content
                  </Modal.Body>
                  <Modal.Footer>
                    <Modal.CloseButton
                      isPrimary
                      title="Save Modal"
                      onClick={() => {
                        console.log("Saved Second Modal Values.");
                      }}
                    >
                      Save
                    </Modal.CloseButton>
                    <Modal.CloseButton>Close</Modal.CloseButton>
                  </Modal.Footer>
                </Modal>
              )}
              {/* To make the modal body scrollable */}
              <div style={{ height: "100vh" }} />
            </Modal.Body>
            <Modal.Footer>
              <Modal.CloseButton
                isPrimary
                title="Save Modal"
                onClick={() => {
                  console.log("Saved Modal Values.");
                }}
              >
                Save
              </Modal.CloseButton>
              <Modal.CloseButton>Close</Modal.CloseButton>
            </Modal.Footer>
          </Modal>
        )}
      </HomeContainer>

      {/* To make the page scrollable */}
      <div style={{ height: "100vh" }} />
    </>
  );
}
