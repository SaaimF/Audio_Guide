import React from "react";

export interface SideMenuItemProps extends React.PropsWithChildren {
  isChecked?: boolean,
  svg: React.ReactNode,
  text: string;
  onClick: () => void;
  closeMenuOnClick?: boolean;
  rippleColor?: string | undefined;
}
