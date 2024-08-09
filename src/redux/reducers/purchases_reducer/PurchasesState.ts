export interface PurchasesState {
  purchasedRoutes: number [];
  purchasedDistricts: number[];
}

export interface PurchasesReducerState extends PurchasesState {
  makePurchaseState: {
    isLoading: boolean;
    message?: string;
  },
  restorePurchasesState: {
    isLoading: boolean;
    message?: string;
  },
}
