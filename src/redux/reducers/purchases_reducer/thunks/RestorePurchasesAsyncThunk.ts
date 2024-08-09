import {endConnection, getAvailablePurchases, initConnection} from "react-native-iap";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {PurchasesState} from "../PurchasesState";

const getPurchasesToRestore = async (): Promise<PurchasesState> => {
  const rawPurchasesIds = await initConnection()
    .then(() => getAvailablePurchases())
    .then(purchases => purchases.map(p => JSON.parse(p?.transactionReceipt)?.productId))

  const purchasedRoutesIds = rawPurchasesIds
    .filter(id => /^route_\d+$/.test(id))
    .map(id => Number(id?.split('_')[1]))

  const purchasedDistrictsIds = rawPurchasesIds
    .filter(id => /^district_\d+$/.test(id))
    .map(id => Number(id?.split('_')[1]))

  await endConnection()
  if (purchasedDistrictsIds?.length === 0 && purchasedRoutesIds?.length === 0) {
    throw new Error('Purchases not found')
  }

  return { purchasedRoutes: purchasedRoutesIds, purchasedDistricts: purchasedDistrictsIds }
}

export const restorePurchases = createAsyncThunk<PurchasesState>(
  'purchases/restorePurchases',
  async () => await getPurchasesToRestore()
);

