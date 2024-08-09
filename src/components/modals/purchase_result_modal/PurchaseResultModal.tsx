import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/config/ReduxConfig";
import BaseModal from "../base_modal/BaseModal";
import {dismissMakePurchaseError} from "../../../redux/reducers/purchases_reducer/PurchasesReducer";
import PinkButton from "../../buttons/pink_button/PinkButton";
import {useTranslation} from "react-i18next";
import Loader from "../../loader/Loader";
import {StyledButtonsWrapper, StyledContainerWrapper, StyledModalText} from "../base_modal/BaseModalStyles";

const PurchaseResultModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const {makePurchaseState} = useAppSelector(state => state.purchases)
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (makePurchaseState.isLoading || makePurchaseState?.message && makePurchaseState?.message?.length > 0) {
      setIsOpened(true)
    }
  }, [makePurchaseState]);

  const handleClose = () => {
    dispatch(dismissMakePurchaseError())
    setIsOpened(false)
    return true
  }

  const resolveErrMessage = () => {
    if (!makePurchaseState.message) {
      return t('uhr_screen.not_ready_yet')
    }

    if (makePurchaseState?.message?.toLowerCase()?.includes('not_found')) {
      return t('uhr_screen.not_ready_yet')
    }

    return makePurchaseState?.message
  }

  const renderError = () => {
    return(
      <>
        <StyledModalText>
          {resolveErrMessage()}
        </StyledModalText>
        <StyledButtonsWrapper>
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
      canClose={!makePurchaseState?.isLoading}
      height={250}
    >
      <StyledContainerWrapper>
        {makePurchaseState?.isLoading ? (
          <Loader/>
        ) : makePurchaseState?.message ? (
          renderError()
        ) : (
          renderOk()
        )}
      </StyledContainerWrapper>
    </BaseModal>
  )
}

export default PurchaseResultModal
