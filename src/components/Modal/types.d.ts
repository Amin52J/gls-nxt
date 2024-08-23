import { HTMLAttributes, PropsWithChildren } from "react";

export type ModalContextType = {
  onModalClose: () => void;
};

export type ModalProps = ModalContextType & HTMLAttributes<HTMLDivElement>;

export type FocusableElement =
  | HTMLAnchorElement
  | HTMLButtonElement
  | HTMLTextAreaElement
  | HTMLInputElement
  | HTMLSelectElement;

export type ModalHeaderProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
> & {
  titleAsText: string;
};

export type ModalBodyProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
> & {
  descriptionAsText: string;
};

export type ModalCloseButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement>
> & {
  isPrimary?: boolean;
};
