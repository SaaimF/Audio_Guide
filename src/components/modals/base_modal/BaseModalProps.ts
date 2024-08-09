import React from "react";

export interface BaseModalProps extends React.PropsWithChildren {
  isOpened: boolean;
  onClose: () => void;
  canClose: boolean;
  height: number;
}
