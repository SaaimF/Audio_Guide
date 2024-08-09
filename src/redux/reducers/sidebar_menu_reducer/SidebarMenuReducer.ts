import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {SidebarMenuState} from "./SidebarMenuState";

const initialState: SidebarMenuState = {
  isOpened: false,
};

const sidebarMenuSlice = createSlice({
  name: 'sidebarMenu',
  initialState,
  reducers: {
    setIsSidebarShown(state, action: PayloadAction<boolean>) {
      state.isOpened = action.payload;
    },
    toggleSidebar(state) {
      state.isOpened = !state.isOpened;
    },
  },
});

export const {
  setIsSidebarShown,
  toggleSidebar
} = sidebarMenuSlice.actions;

export default sidebarMenuSlice.reducer;
