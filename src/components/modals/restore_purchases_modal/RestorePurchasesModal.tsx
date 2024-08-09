import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/config/ReduxConfig";
import BaseModal from "../base_modal/BaseModal";
import {dismissRestorePurchasesError} from "../../../redux/reducers/purchases_reducer/PurchasesReducer";
import TransparentButton from "../../buttons/transparent_button/TransparentButton";
import PinkButton from "../../buttons/pink_button/PinkButton";
import {useTranslation} from "react-i18next";
import Loader from "../../loader/Loader";
import {restorePurchases} from "../../../redux/reducers/purchases_reducer/thunks/RestorePurchasesAsyncThunk";
import {StyledButtonsWrapper, StyledContainerWrapper, StyledModalText} from "../base_modal/BaseModalStyles";

const RestorePurchasesModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { restorePurchasesState} = useAppSelector(state => state.purchases)

  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (restorePurchasesState.isLoading || restorePurchasesState?.message && restorePurchasesState?.message?.length > 0) {
      setIsOpened(true)
    }
  }, [restorePurchasesState]);

  const handleClose = () => {
    dispatch(dismissRestorePurchasesError())
    setIsOpened(false)
  }

  const renderError = () => {
    return(
      <>
        <StyledModalText>
          {restorePurchasesState.message && restorePurchasesState.message?.length > 0
            ? restorePurchasesState.message
            : t('side_menu.rp_modal.err_text')
          }
        </StyledModalText>
        <StyledButtonsWrapper>
          <TransparentButton
            text={t('side_menu.rp_modal.retry_btn_text')}
            action={() => dispatch(restorePurchases())}
            additionalStyle={{ marginBottom: 8 }}
          />
          <PinkButton
            text={t('side_menu.rp_modal.close_btn_text')}
            action={handleClose}
          />
        </StyledButtonsWrapper>
      </>
    )
  }

  const renderOk = () => {
    return(
      <>
        <StyledModalText>
          {t('side_menu.rp_modal.ok_text')}
        </StyledModalText>
        <PinkButton
          text={t('side_menu.rp_modal.close_btn_text')}
          action={handleClose}
        />
      </>
    )
  }

  return(
    <BaseModal
      isOpened={isOpened}
      onClose={handleClose}
      canClose={!restorePurchasesState?.isLoading}
      height={250}
    >
      <StyledContainerWrapper>
        {restorePurchasesState?.isLoading ? (
          <Loader/>
        ) : restorePurchasesState?.message ? (
          renderError()
        ) : (
          renderOk()
        )}
      </StyledContainerWrapper>
    </BaseModal>
  )
}

export default RestorePurchasesModal
