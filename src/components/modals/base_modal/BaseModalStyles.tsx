import styled from "styled-components/native";
import {BrandColors} from "../../../constants/styles/Colors";
import {FontStyles} from "../../../constants/styles/Fonts";

export const StyledButtonsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const StyledContainerWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  min-height: 190px;
`

export const StyledModalText = styled.Text`
  color: ${BrandColors.GRAY};
  font-size: ${FontStyles.MAIN_TEXT.fontSize}px;
  font-family: ${FontStyles.MAIN_TEXT.fontFamily};
  line-height: 23.5px;
  text-align: center;
`
