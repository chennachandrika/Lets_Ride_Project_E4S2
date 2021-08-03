import styled from '@emotion/styled'
import colors from '../../../Common/Theme/Colors'
export const CommuteDashboardDisplay = styled.div`
   display: flex;
   flex-direction: column;
   background-color: ${colors.whiteTwo};
`
export const AllRequests = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 50px 0px;
`
export const Selectors = styled.div`
   align-self: center;
   margin: 30px 0px;
`

export const MatchingResultsSelector = styled.button`
   padding: 10px 15px;
   color: ${props => (!props.isSelected ? colors.black : colors.white)};
   font-weight: bold;
   border-top-left-radius: 5px;
   border-bottom-left-radius: 5px;
   border: 2px solid ${colors.lightBlueGrey};
   background-color: ${props =>
      props.isSelected ? colors.brightBlue : colors.white};
`
export const MyRequestsSelector = styled.button`
   padding: 10px 15px;
   color: ${props => (!props.isSelected ? colors.black : colors.white)};

   font-weight: bold;
   border: 2px solid ${colors.lightBlueGrey};
   background-color: ${props =>
      props.isSelected ? colors.brightBlue : colors.white};
`
export const SharedDetailsSelector = styled.button`
   padding: 10px 15px;
   color: ${props => (!props.isSelected ? colors.black : colors.white)};

   font-weight: bold;
   border-top-right-radius: 5px;
   border-bottom-right-radius: 5px;
   border: 2px solid ${colors.lightBlueGrey};
   background-color: ${props =>
      props.isSelected ? colors.brightBlue : colors.white};
`
