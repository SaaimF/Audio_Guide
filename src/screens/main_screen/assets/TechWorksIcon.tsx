import Svg, {Path} from "react-native-svg";
import React from "react";

const TechWorksIcon: React.FC = () => {
  return(
    <Svg style={{ marginBottom: 16 }} width="60" height="60" viewBox="0 0 60 60" fill="none">
      <Path d="M37.5 40C47.165 40 55 32.165 55 22.5C55 20.7626 54.7468 19.0843 54.2753 17.5L48.1569 23.6185C46.1768 25.5985 45.1867 26.5886 44.0451 26.9595C43.0409 27.2858 41.9591 27.2858 40.9549 26.9595C39.8133 26.5886 38.8232 25.5985 36.8431 23.6184L36.3815 23.1569C34.4015 21.1768 33.4114 20.1867 33.0405 19.0451C32.7142 18.0409 32.7142 16.9591 33.0405 15.9549C33.4114 14.8133 34.4015 13.8232 36.3815 11.8431L42.5 5.7247C40.9157 5.25319 39.2374 5 37.5 5C27.835 5 20 12.835 20 22.5C20 25.184 20.1701 28.9769 21.25 31.25L6.25 46.25C6.05086 46.4491 5.9513 46.5487 5.87117 46.6369C4.1377 48.5439 4.1377 51.4561 5.87117 53.3631C5.9513 53.4513 6.05086 53.5509 6.25 53.75C6.44914 53.9491 6.5487 54.0487 6.63686 54.1288C8.5439 55.8623 11.4561 55.8623 13.3631 54.1288C13.4513 54.0487 13.5509 53.9491 13.75 53.75L28.75 38.75C31.0231 39.8298 34.816 40 37.5 40Z" stroke="#6CC7E0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default TechWorksIcon
