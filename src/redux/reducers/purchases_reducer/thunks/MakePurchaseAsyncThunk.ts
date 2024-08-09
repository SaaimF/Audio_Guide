import {
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getProducts,
  initConnection,
  purchaseUpdatedListener,
  requestPurchase
} from "react-native-iap";
import {PurchaseType} from "../PurchaseType";
import {Platform} from "react-native";
import {createAsyncThunk} from "@reduxjs/toolkit";

const validateAndRequestPurchase = async (skuId: string) => {
  await initConnection()
  if (Platform.OS === 'android') {
    await flushFailedPurchasesCachedAsPendingAndroid()
  }

  const products = await getProducts({skus: [skuId]})
  if (products?.length === 0) {
    throw new Error('PRODUCT_NOT_FOUND')
  }

  await requestPurchase({ sku: skuId, skus: [skuId] })
}

const proceedPurchase = async (itemId: number, purchaseType: PurchaseType) => {
  await initConnection()
  const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      await finishTransaction({ purchase, isConsumable: false });
    }
  });

  try {
    await validateAndRequestPurchase(`${purchaseType}_${itemId}`)
  } catch (e) {
    purchaseUpdateSubscription.remove()
    await endConnection()
    throw e
  }
}

export const makePurchase = createAsyncThunk<
  void,
  { itemId: number, purchaseType: PurchaseType }
>(
  'purchases/makePurchase',
  async ({ itemId, purchaseType }) => {
    await proceedPurchase(itemId, purchaseType);
  }
);
