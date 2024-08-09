import { createSlice } from '@reduxjs/toolkit';
import {OnboardingState} from "./OnboardingState";

const initialState: OnboardingState = {
  completed: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingCompleted(state) {
      state.completed = true;
    },
  },
});

export const { setOnboardingCompleted } = onboardingSlice.actions;

export default onboardingSlice.reducer;
