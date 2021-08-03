import React from 'react'
import { observer } from 'mobx-react'
import { UserProfileIcon } from '../Header/UserProfileIcon.js'
import {
   Card,
   RequestTypeRide,
   ProfileIcon,
   AddButton,
   Name,
   MobileNumber,
   OriginDestination,
   FlexibleTimings,
   Date,
   NoOfSeats,
   NoOfLuggages,
   From,
   To,
   MoreButton
} from './styledComponents.js'
import { BsArrowRightShort } from 'react-icons/bs'

@observer
class RideRequest extends React.Component {
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
            <RequestTypeRide>{request.typeOfRequest}</RequestTypeRide>
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
            <NoOfSeats>No. Of Seats : {request.noOfSeats}</NoOfSeats>
            <NoOfLuggages>
               Luggages Quantity : {request.noOfLuggages}
            </NoOfLuggages>
            <MoreButton
               onClick={() => onClickShowMoreDetails(request.requestDetails)}
            >
               More
            </MoreButton>
            <AddButton
               type='button'
               onClick={() => addButtonFunction(request.id)}
            >
               {request.isAdded ? 'Added' : 'Add'}
            </AddButton>
         </Card>
      )
   }
}
export { RideRequest }

// id: "10"

// typeOfRequest: "RIDE"

// name: "Dr. Madelynn Lehner"

// from: "Hyderabad"

// to: "Kurnool"

// noOfSeats: 6

// noOfLuggages: 3

// isFlexible: true

// isAdded: false

// showMoreDetails: false

// startTime: "Thu Jan 04 2019 10:36:04 GMT+0530 (India Standard Time)"

// endTime: "Sat Jan 04 2019 23:36:04 GMT+0530 (India Standard Time)"
