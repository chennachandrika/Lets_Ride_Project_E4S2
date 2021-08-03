import styled from '@emotion/styled'
import colors from '../../../Common/Theme/Colors'
import {
   Typo32DarkBlueGreyRubikRegular,
   Typo12BrightBlueRubikRegular,
   Typo12YellowOrangeRubikRegular
} from '../../styleGuides/StyleGuides.js'
export const Header = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
`
export const Title = styled(Typo32DarkBlueGreyRubikRegular)`
   font-size: 20px;
   width: 200px;
`
export const DropDown = styled.div`
   border: 2p solid ${colors.black};
`
export const MatchingRequestsDisplay = styled.div`
   width: 70%;
   display: flex;
   flex-direction: column;
`
export const CardsDisplay = styled.div`
   display: flex;
   flex-wrap: wrap;
`
export const Card = styled.div`
   width: 280px;
   height: 320px;
   margin: 17px;
   padding: 25px;
   display: flex;
   flex-direction: column;
   justify-content: start;
   align-items: center;
   border: 2px solid ${colors.whiteSmoke};
   background-color: ${colors.white};
`
//box-shadow: 0 4px 40px 0 rgba(23, 31, 70, 0.16);
export const RequestTypeRide = styled(Typo12BrightBlueRubikRegular)`
   padding: 3px 4px;
   align-self: start;
   background-color: ${colors.brightBlueOpacity};
`
export const RequestTypeAsset = styled(Typo12YellowOrangeRubikRegular)`
   padding: 3px 4px;
   align-self: start;
   background-color: ${colors.yellowOrange2};
`
export const ProfileIcon = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`
export const AddButton = styled.button`
   border: 2px solid ${colors.lightgrey};
   text-align: center;
   width: 100%;
   margin: auto;
   padding: 5px 0px;
   margin: 10px 0px;
`
export const Name = styled.div`
   font-weight: bold;
   margin: 3px 0px;
`
export const MobileNumber = styled.div`
   margin: 3px 0px;
`
export const OriginDestination = styled.div`
   width: 100%;
   display: flex;
   justify-content: start;
   align-items: center;
   margin: 3px 0px;
   font-weight: bold;
`
export const FlexibleTimings = styled.div`
   width: 100%;
   display: flex;
   justify-content: start;
   margin: 3px 0px;
`
export const Date = styled.div`
   width: 100%;
   display: flex;
   justify-content: start;
   margin: 3px 0px;
`
export const NoOfSeats = styled.div`
   width: 100%;
   display: flex;
   justify-content: start;
   margin: 3px 0px;
`
export const NoOfLuggages = styled.div`
   width: 100%;
   display: flex;
   justify-content: start;
   margin: 3px 0px;
`
export const From = styled.div``
export const To = styled.div``
export const AssetType = styled.div`
   width: 100%;
   display: flex;
   justify-content: start;
   margin: 3px 0px;
`
export const MoreButton = styled.button`
   width: 100%;
   display: flex;
   justify-content: end;
   color: blue;
   margin-top: -20px;
`
