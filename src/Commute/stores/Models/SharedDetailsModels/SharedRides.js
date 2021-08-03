import React from 'react'
class SharedRides {
   constructor(rideDetails) {
      this.origin = rideDetails.origin
      this.destination = rideDetails.destination

      this.flexibleWithTime = rideDetails.flexible_with_time

      this.noOfSeats = rideDetails.no_of_seats
      this.assetsQuantity = rideDetails.assets_quantity
      //this.status=rideDetails.status;
      this.status = 'None'
      if (rideDetails.flexible_with_time) {
         this.initIsFlexible(rideDetails)
      } else {
         this.initIsNotFlexible(rideDetails)
      }
   }
   initIsFlexible = props => {
      this.startDatetime = props.start_datetime
      this.endDatetime = props.end_datetime
   }

   initIsNotFlexible = props => {
      this.dateTime = props.datetime
   }
}
export { SharedRides }
