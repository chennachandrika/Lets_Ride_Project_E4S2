import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { RiLoader2Line } from 'react-icons/ri'

import moment from 'moment'

import { Typo20DarkBlueGreyHKGrotestBold as FormHeadingText } from '../../styleGuides/StyleGuides.js'
import { Form, FormDashboard } from '../../styledComponents/styleComponents.js'

import { withRouter } from 'react-router-dom'
import { withHeader } from '../../Hocs/withHeader'

import { InputField } from '../Common/components/InputField.js'
import { DateAndTime } from '../Common/components/DateTime.js'
import { Button } from '../Common/components/Button.js'
import { DisplayListOfElements } from '../Common/components/DisplayListOfElements.js'
import { FlexibleDateTime } from '../Common/components/FlexibleDateTime.js'

import {
   CheckBox,
   FlexibleTimings,
   FlexibleTimingsLabel
} from './styledComponents.js'

import strings from '../../i18n/strings.json'

@inject('commuteStore')
@observer
class RideRequest extends React.Component {
   @observable isCheckedFlexibleTimings
   @observable displayError
   @observable from
   @observable to
   @observable dateTime
   @observable startDateTime
   @observable endDateTime
   @observable seats
   @observable luggages
   constructor(props) {
      super(props)
      this.init()
   }
   @action.bound
   init() {
      this.isCheckedFlexibleTimings = false
      this.displayError = false
      this.from = ''
      this.to = ''
      this.dateTime = ''
      this.startDateTime = ''
      this.endDateTime = ''
      this.seats = 0
      this.luggages = 0
   }
   onClickFlexibleTimings = () => {
      this.isCheckedFlexibleTimings = !this.isCheckedFlexibleTimings
   }
   onChangeRequestFrom = event => {
      this.from = event.target.value
      this.displayError = false
   }
   onChangeRequestTo = event => {
      this.to = event.target.value
      this.displayError = false
   }
   onChangeTime = time => {
      this.dateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeFromTime = time => {
      this.startDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeToTime = time => {
      this.endDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeNoOfSeats = seats => {
      this.seats = seats
   }
   onChangeNoOfLuggages = luggages => {
      this.luggages = luggages
   }
   onSubmitRequest = () => {
      this.displayError = true
      const {
         commuteStore: { getRideRequestAPIStatus }
      } = this.props
      let formDetails = [this.from, this.to, this.seats, this.luggages]
      let count = 0
      formDetails.forEach(eachDetail => {
         if (eachDetail.length === 0 || eachDetail === 0) {
            count++
         }
      })
      if (!this.isCheckedFlexibleTimings) {
         if (count === 0 && this.dateTime.length !== 0) {
            const rideRequestData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: false,
               datetime: this.dateTime,
               no_of_seats: this.seats,
               luggage_quantity: this.luggages,
               start_datetime: null,
               end_datetime: null
            }
            this.postRideRequest(rideRequestData)
         }
      } else {
         if (
            count === 0 &&
            this.startDateTime.length !== 0 &&
            this.endDateTime.length !== 0
         ) {
            const rideRequestData = {
               origin: this.from,
               destination: this.to,
               datetime: null,
               flexible_with_time: true,
               start_datetime: this.startDateTime,
               end_datetime: this.endDateTime,
               no_of_seats: this.seats,
               luggage_quantity: this.luggages
            }
            this.postRideRequest(rideRequestData)
         }
      }
   }

   async postRideRequest(rideRequestData) {
      const {
         commuteStore: { postRideRequest }
      } = this.props

      await postRideRequest(rideRequestData)
      this.init()
      this.displayError = false
      alert('Submitted Succesfully')
   }
   const
   render() {
      const {
         from,
         to,
         seats,
         luggages,
         isCheckedFlexibleTimings,
         onClickFlexibleTimings,
         onSubmitRequest,
         onChangeRequestFrom,
         onChangeRequestTo,
         displayError,
         onChangeTime,
         onChangeFromTime,
         onChangeToTime,
         onChangeNoOfSeats,
         onChangeNoOfLuggages
      } = this
      const {
         commuteStore: { getRideRequestAPIStatus }
      } = this.props
      return (
         <FormDashboard>
            <Form>
               <FormHeadingText>{strings.text.rideRequest}</FormHeadingText>
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.from}
                  onChange={onChangeRequestFrom}
                  value={from}
                  displayError={displayError}
               />
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.to}
                  onChange={onChangeRequestTo}
                  value={to}
                  displayError={displayError}
               />
               {isCheckedFlexibleTimings ? (
                  <FlexibleDateTime
                     onChangeFromTime={onChangeFromTime}
                     onChangeToTime={onChangeToTime}
                     displayError={displayError}
                  />
               ) : (
                  <DateAndTime
                     label={strings.label.dateAndTime}
                     onChangeTime={onChangeTime}
                     displayError={displayError}
                     startData={new Date()}
                  />
               )}
               <FlexibleTimings>
                  <CheckBox
                     type={strings.type.checkbox}
                     onClick={onClickFlexibleTimings}
                     data-testid='flexibleTimings'
                  />
                  <FlexibleTimingsLabel htmlFor='flexibleTimings'>
                     {strings.label.flexibleTimings}
                  </FlexibleTimingsLabel>
               </FlexibleTimings>
               <DisplayListOfElements
                  listData={{ title: strings.text.noOfSeats }}
                  onChange={onChangeNoOfSeats}
                  displayError={displayError}
                  intial={seats}
               />
               <DisplayListOfElements
                  listData={{ title: strings.text.noOfLuggages }}
                  onChange={onChangeNoOfLuggages}
                  displayError={displayError}
                  intial={luggages}
               />
               <Button
                  buttonText={strings.text.request}
                  onClickFunction={onSubmitRequest}
               />
            </Form>
         </FormDashboard>
      )
   }
}
export default withRouter(withHeader(RideRequest))

//2020-05-27 05:06:
