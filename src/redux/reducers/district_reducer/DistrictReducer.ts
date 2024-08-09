import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExtendedDistrictInfo} from '../../../constants/content_types/ContentTypes';
import {DistrictState} from "./DistrictState";
import {fetchDistricts} from "./thunks/FetchDistrictsAsyncThunk";
import {FetchErrorType} from "./thunks/FetchErrorType";

const initialState: DistrictState = {
  districts: [],
  isLoading: false,
};

const districtSlice = createSlice({
  name: 'districts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistricts.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchDistricts.fulfilled, (state, action: PayloadAction<ExtendedDistrictInfo[]>) => {
        state.districts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.districts = [];
        state.error = action?.error?.message?.toLowerCase()?.includes('network')
          ? FetchErrorType.NETWORK_ERROR
          : FetchErrorType.UNKNOWN_ERROR
        state.isLoading = false;
      });
  },
});

export default districtSlice.reducer;
