import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PurchasesReducerState, PurchasesState} from './PurchasesState';
import {restorePurchases} from "./thunks/RestorePurchasesAsyncThunk";
import {makePurchase} from "./thunks/MakePurchaseAsyncThunk";
import {PurchaseType} from "./PurchaseType";

const initialState: PurchasesReducerState = {
  purchasedRoutes: [],
  purchasedDistricts: [],
  makePurchaseState: {
    isLoading: false,
  },
  restorePurchasesState: {
    isLoading: false
  },
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    dismissRestorePurchasesError(state) {
      state.restorePurchasesState.isLoading = false;
      state.restorePurchasesState.message = undefined;
    },
    dismissMakePurchaseError(state) {
      state.makePurchaseState.isLoading = false;
      state.makePurchaseState.message = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(restorePurchases.pending, (state) => {
        state.restorePurchasesState.isLoading = true;
        state.restorePurchasesState.message= undefined;
      })
      .addCase(restorePurchases.fulfilled, (state, action: PayloadAction<PurchasesState>) => {
        state.purchasedRoutes = action.payload.purchasedRoutes;
        state.purchasedDistricts = action.payload.purchasedDistricts;
        state.restorePurchasesState.isLoading = false;
      })
      .addCase(restorePurchases.rejected, (state, action) => {
        state.restorePurchasesState.message = action?.error?.message;
        state.restorePurchasesState.isLoading = false;
      })

      .addCase(makePurchase.pending, (state) => {
        state.makePurchaseState.message = undefined;
      })
      .addCase(makePurchase.fulfilled, (state, action) => {
        const { itemId, purchaseType } = action.meta.arg;
        if (purchaseType === PurchaseType.DISTRICT) {
          state.purchasedDistricts.push(itemId)
        } else {
          state.purchasedRoutes.push(itemId)
        }
      })
      .addCase(makePurchase.rejected, (state, action) => {
        state.makePurchaseState.message = action?.error?.message;
      });
  },
});

export const {
  dismissRestorePurchasesError,
  dismissMakePurchaseError
} = purchasesSlice.actions;

export default purchasesSlice.reducer;
