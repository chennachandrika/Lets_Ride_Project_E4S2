import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'

import moment from 'moment'

import { Typo20DarkBlueGreyHKGrotestBold as FormHeadingText } from '../../styleGuides/StyleGuides.js'
import { Form, FormDashboard } from '../../styledComponents/styleComponents.js'
import { withRouter } from 'react-router-dom'
import { withHeader } from '../../Hocs/withHeader'
import { InputField } from '../Common/components/InputField.js'
import { DateAndTime } from '../Common/components/DateTime.js'
import { FlexibleDateTime } from '../Common/components/FlexibleDateTime.js'
import { Button } from '../Common/components/Button.js'
import { DisplayDropDown } from '../Common/components/DisplayDropDown.js'
import { DisplayListOfElements } from '../Common/components/DisplayListOfElements.js'

import {
   CheckBox,
   FlexibleTimings,
   FlexibleTimingsLabel
} from '../RideRequest/styledComponents.js'
import strings from '../../i18n/strings.json'
const assetType = {
   listTitle: 'ASSET TYPE',
   listItems: [
      {
         key: 'Electronics',
         text: 'Electronics',
         value: 'Electronics'
      },
      {
         key: 'Bags',
         text: 'Bags',
         value: 'Bags'
      },
      {
         key: 'Others',
         text: 'Others',
         value: 'Others'
      }
   ],
   placeholder: 'Select Asset Type'
}
const assetSensitivity = {
   listTitle: 'ASSET SENSITIVITY',
   listItems: [
      {
         key: 'Normal',
         text: 'Normal',
         value: 'Normal'
      },
      {
         key: 'Sensitive',
         text: 'Sensitive',
         value: 'Sensitive'
      },
      {
         key: 'Highly Sensitive',
         text: 'Highly Sensitive',
         value: 'Highly_Sensitive'
      }
   ],
   placeholder: 'Select Asset Sensitivity'
}

@inject('commuteStore')
@observer
class AssetTransportRequest extends React.Component {
   @observable isCheckedFlexibleTimings
   @observable displayError
   @observable from
   @observable to
   @observable details
   @observable dateTime
   @observable startDateTime
   @observable endDateTime
   @observable assets
   @observable assetType
   @observable assetSensitivity
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
      this.dateTime = new Date()
      this.startDateTime = ''
      this.endDateTime = ''
      this.assets = 0
      this.assetType = ''
      this.assetSensitivity = ''
      this.details = ''
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
   onChangeNoOfAssets = assets => {
      this.assets = assets
   }
   onChangeAssetType = assetType => {
      this.assetType = assetType
   }
   onChangeAssetSensitivity = assetSensitivity => {
      this.assetSensitivity = assetSensitivity
   }
   onChangeWhomToDeliver = event => {
      this.details = event.target.value
   }
   onSubmitRequest = () => {
      this.displayError = true

      let formDetails = [
         this.from,
         this.to,
         this.assets,
         this.assetType,
         this.assetSensitivity,
         this.details
      ]

      let count = 0
      formDetails.forEach(eachDetail => {
         if (eachDetail.length === 0 || eachDetail === 0) {
            count++
         }
      })
      if (!this.isCheckedFlexibleTimings) {
         if (count === 0 && this.dateTime.length !== 0) {
            const assetRequestData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: false,
               datetime: this.dateTime,
               start_datetime: null,
               end_datetime: null,
               assets_quantity: this.assets,
               asset_type: this.assetType.toUpperCase(),
               asset_sensitivity: this.assetSensitivity.toUpperCase(),
               whom_to_deliver: this.details
            }
            this.postAssetTransportRequest(assetRequestData)
         }
      } else {
         if (
            count === 0 &&
            this.startDateTime.length !== 0 &&
            this.endDateTime.length !== 0
         ) {
            const assetRequestData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: true,
               datetime: null,
               start_datetime: this.startDateTime,
               end_datetime: this.endDateTime,
               assets_quantity: this.assets,
               asset_type: this.assetType.toUpperCase(),
               asset_sensitivity: this.assetSensitivity.toUpperCase(),
               whom_to_deliver: this.details
            }
            this.postAssetTransportRequest(assetRequestData)
         }
      }
   }
   async postAssetTransportRequest(assetRequestData) {
      const {
         commuteStore: { postAssetTransportRequest }
      } = this.props
      await postAssetTransportRequest(assetRequestData)
      alert('Submitted Succesfully')
      this.init()
      this.displayError = false
   }
   render() {
      const {
         from,
         to,
         details,
         assets,
         isCheckedFlexibleTimings,
         onClickFlexibleTimings,
         onSubmitRequest,
         onChangeRequestFrom,
         onChangeRequestTo,
         displayError,
         onChangeTime,
         onChangeFromTime,
         onChangeToTime,
         onChangeNoOfAssets,
         onChangeAssetType,
         onChangeAssetSensitivity,
         onChangeWhomToDeliver
      } = this

      return (
         <FormDashboard>
            <Form>
               <FormHeadingText>
                  {strings.text.assetTranportRequest}
               </FormHeadingText>
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
                  />
               )}
               <FlexibleTimings>
                  <CheckBox
                     type={strings.type.checkbox}
                     onClick={onClickFlexibleTimings}
                     data-testid='flexibleTimings'
                  />
                  <FlexibleTimingsLabel>
                     {strings.label.flexibleTimings}
                  </FlexibleTimingsLabel>
               </FlexibleTimings>
               <DisplayListOfElements
                  listData={{ title: strings.text.noOfAssets }}
                  onChange={onChangeNoOfAssets}
                  displayError={displayError}
                  intial={assets}
               />
               <DisplayDropDown
                  data={assetType}
                  onChange={onChangeAssetType}
                  displayError={displayError}
               />
               <DisplayDropDown
                  data={assetSensitivity}
                  onChange={onChangeAssetSensitivity}
                  displayError={displayError}
               />
               <InputField
                  placeholderText={strings.placeholderText.nameMobileNumber}
                  type={strings.type.text}
                  label={strings.label.whomToDeliver}
                  onChange={onChangeWhomToDeliver}
                  displayError={displayError}
                  value={details}
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
export default withRouter(withHeader(AssetTransportRequest))

// "origin": "string",
//  "destination": "string",
//  "datetime": "string",
//  "flexible_with_time": true,
//  "start_datetime": "string",
//  "end_datetime": "string",
//  "no_of_assets": 0,
//  "asset_type": "BAGS",
//  "asset_sensitivity": "HIGHLY_SENSITIVE",
//  "assets_quantity": 0,
//  "whom_to_deliver": "string"
