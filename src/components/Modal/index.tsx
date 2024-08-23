import {
  createContext,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import ReactDOM from "react-dom";

import {
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalContent,
  ModalCrossButton,
  ModalFooter,
  ModalHeader,
  ModalHeaderTitle,
} from "@Components/Modal/styles";
import {
  ModalProps,
  FocusableElement,
  ModalContextType,
  ModalHeaderProps,
  ModalBodyProps,
  ModalCloseButtonProps,
} from "@Components/Modal/types";

// To pass onModalClose and if needed other props to the modal's children.
const modalContext = createContext<ModalContextType>({
  onModalClose: () => {},
});

// To keep track of the active or top layer modal.
// Last item of the array is always the top layer modal.
const activeModal: Array<HTMLDivElement | null> = [];

const Modal = ({
  children,
  onModalClose,
  ...props
}: PropsWithChildren<ModalProps>) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const trapTabWithinModal = useCallback(
    (e: KeyboardEvent) => {
      if (modalRef.current) {
        const focusableModalElements: NodeListOf<FocusableElement> =
          modalRef.current.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
          );
        const firstElement: FocusableElement = focusableModalElements[0];
        const lastElement: FocusableElement =
          focusableModalElements[focusableModalElements.length - 1];
        const isActiveTabElementOutside = !modalRef.current.contains(
          document.activeElement,
        );

        if (
          !e.shiftKey &&
          (document.activeElement === lastElement || isActiveTabElementOutside)
        ) {
          e.preventDefault();
          firstElement.focus();
        } else if (
          e.shiftKey &&
          (document.activeElement === firstElement || isActiveTabElementOutside)
        ) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    },
    [modalRef.current],
  );

  useEffect(() => {
    activeModal.push(modalRef.current);

    // remove the scrollbars when the first modal opens.
    // we keep the width of the scrollbar as padding to the body to avoid content shift
    if (activeModal.length === 1) {
      const scrollbarWidth = `${window.innerWidth - document.body.clientWidth}px`;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollbarWidth;
    }

    return () => {
      activeModal.pop();

      // reset changes when the last modal closes
      if (activeModal.length === 0) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "0";
      }
    };
  }, []);

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      const keyListeners = {
        Escape: onModalClose,
        Tab: trapTabWithinModal,
      };

      // Trigger the respective keydown listener only if current modal is the top layer modal
      if (activeModal[activeModal.length - 1] === modalRef.current) {
        const listener = keyListeners[e.code as keyof typeof keyListeners];
        return listener && listener(e);
      }
    };

    const clickedOutsideOfModal = (e: Event) => {
      // Close the modal if clicked outside and only if current modal is the top layer modal
      if (
        !modalRef.current?.contains(e.target as HTMLElement) &&
        activeModal[activeModal.length - 1] === modalRef.current
      ) {
        onModalClose();
      }
    };

    document.addEventListener("keydown", keydownListener);
    document.addEventListener("mousedown", clickedOutsideOfModal);

    return () => {
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("mousedown", clickedOutsideOfModal);
    };
  }, [onModalClose, trapTabWithinModal]);

  return ReactDOM.createPortal(
    <ModalContainer role="dialog" aria-modal="true" {...props}>
      <ModalContent role="document" ref={modalRef} className="modal-content">
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </ModalContent>
    </ModalContainer>,
    document.body,
  );
};

Modal.Header = ({ children, titleAsText, ...props }: ModalHeaderProps) => {
  const { onModalClose } = useContext(modalContext);

  return (
    <ModalHeader {...props} aria-labelledby={titleAsText || String(children)}>
      <ModalHeaderTitle className="modal-header-title">
        {children}
      </ModalHeaderTitle>
      <ModalCrossButton
        className="modal-cross-btn"
        title="Close Modal"
        onClick={onModalClose}
      >
        ✕
      </ModalCrossButton>
    </ModalHeader>
  );
};

Modal.Body = ({ descriptionAsText, ...props }: ModalBodyProps) => {
  return <ModalBody {...props} aria-describedby={descriptionAsText} />;
};

Modal.Footer = (props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return <ModalFooter {...props} />;
};

Modal.CloseButton = ({
  onClick,
  title,
  isPrimary,
  ...props
}: ModalCloseButtonProps) => {
  const { onModalClose } = useContext(modalContext);

  return (
    <ModalCloseButton
      $isPrimary={isPrimary}
      title={title || "Close Modal"}
      onClick={(e) => {
        e.persist();
        if (typeof onClick === "function") {
          onClick(e);
        }
        onModalClose();
      }}
      {...props}
    />
  );
};

export default Modal;
