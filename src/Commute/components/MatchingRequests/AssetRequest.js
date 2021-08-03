import React from 'react'
import { observer } from 'mobx-react'
import { UserProfileIcon } from '../Header/UserProfileIcon.js'
import {
   Card,
   RequestTypeAsset,
   ProfileIcon,
   AddButton,
   Name,
   MobileNumber,
   OriginDestination,
   FlexibleTimings,
   Date,
   MoreButton,
   AssetType,
   From,
   To
} from './styledComponents.js'
import { BsArrowRightShort } from 'react-icons/bs'
@observer
class AssetRequest extends React.Component {
   constructor() {
      super()
   }
   render() {
      const months = {
         Jan: '01',
         Feb: '02',
         Mar: '03',
         Apr: '04',
         May: '05',
         Jun: '06',
         Jul: '07',
         Aug: '08',
         Sep: '09',
         Oct: '10',
         Nov: '11',
         Dec: '12'
      }
      const { requestData: request } = this.props
      const { addButtonFunction, onClickShowMoreDetails } = request
      return (
         <Card>
            <RequestTypeAsset>{request.typeOfRequest}</RequestTypeAsset>
            <ProfileIcon>
               <UserProfileIcon />
            </ProfileIcon>
            <Name>{request.name}</Name>
            <MobileNumber>{request.mobileNumber}</MobileNumber>
            <OriginDestination>
               <From>{request.from}</From>
               <BsArrowRightShort />
               <To>{request.to}</To>
            </OriginDestination>

            {request.isFlexible ? (
               <FlexibleTimings>is Flexible: Yes</FlexibleTimings>
            ) : (
               <Date>
                  Date & Time : {request.date.slice(8, 10)}/
                  {months[request.date.slice(4, 7)]}/
                  {request.date.slice(11, 15)}
               </Date>
            )}
            <AssetType>No. Of Seats : {request.noOfSeats}</AssetType>
            <MoreButton
               onClick={() => onClickShowMoreDetails(request.requestDetails)}
            >
               More
            </MoreButton>
            <AddButton
               type='button'
               onClick={() => addButtonFunction(request.id)}
            >
               Add
            </AddButton>
         </Card>
      )
   }
}
export { AssetRequest }
// id: "18"

// typeOfRequest: "ASSET"

// name: "Hello"

// mobileNumber: "23547687686"

// from: "Harayan"

// to: "Kurnool"

// noOfSeats: 6

// assetType: "gadgets"

// assetSentivity: "very sensitive"

// acceptedPersonDetails: "raani-1234560987"

// status: "Expire"

// isFlexible: true

// isAdded: false

// showMoreDetails: false

// startTime: "Thu Apr 31 2017 21:46:04 GMT+0530 (India Standard Time)"

// endTime: "Thu Feb 31 2019 21:46:04 GMT+0530 (India Standard Time)"
