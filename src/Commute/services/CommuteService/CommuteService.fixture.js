import { action } from 'mobx'
import { create } from 'apisauce'

import assetRequestData from '../../fixtures/assetRequests.fixture.json'
import rideRequestData from '../../fixtures/rideRequests.fixture.json'
import matchedRideRequests from '../../fixtures/matchedRideRequests.fixture.json'
import matchingAssetsRequests from '../../fixtures/matchedAssetRequests.fixture.json'
import sharedRides from '../../fixtures/sharedRide.fixture.json'
import travelInfo from '../../fixtures/sharedTravelInfo.fixture.json'

class CommuteService {
   baseApi
   constructor() {
      this.baseApi = create({
         baseURL: 'https://6b227f8028a0.ngrok.io'
      })
   }
   @action
   rideRequestAPI(requestData) {
      //console.log(requestData)
      //rideRequest
      return new Promise(resolve => {
         resolve('rideRequest')
      })
   }
   @action
   assetTransportRequestAPI(requestData) {
      //console.log(requestData)
      //assetTransportRequest
      return new Promise(resolve => {
         resolve('assetTransportRequest')
      })
   }
   @action
   shareRideInfoAPI(details) {
      //console.log(details)
      return new Promise(resolve => {
         resolve('shareRide')
      })
   }
   @action
   shareTravelInfoAPI(details) {
      //console.log(details)
      return new Promise(resolve => {
         resolve('shareTravelInfo')
      })
   }
   @action
   myRideRequestsAPI(dataToGetRequests) {
      //console.log(dataToGetRequests)

      let requests = {
         ride_requests: rideRequestData.ride_requests.filter(
            (request, index) =>
               index >= dataToGetRequests.offset &&
               index < dataToGetRequests.offset + dataToGetRequests.limit
         ),
         total_ride_requests_count: rideRequestData.total_ride_requests_count
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(requests)
         }, 1000)
      })
   }
   @action
   myAssetRequestsAPI(dataToGetRequests) {
      let requests = {
         asset_requests: assetRequestData.asset_requests.filter(
            (request, index) =>
               index >= dataToGetRequests.offset &&
               index < dataToGetRequests.offset + dataToGetRequests.limit
         ),
         total_asset_tansport_count: assetRequestData.total_asset_tansport_count
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(requests)
         }, 1000)
      })
   }
   @action
   matchingAllRequestsAPI(matchingRequestsFilter, dataToGetRequests) {
      switch (matchingRequestsFilter) {
         case 'RIDE': {
            let requests = {
               ride_requests: matchedRideRequests.ride_requests.filter(
                  (request, index) =>
                     index >= dataToGetRequests.offset &&
                     index < dataToGetRequests.offset + dataToGetRequests.limit
               ),
               ride_requests_matches_count:
                  matchedRideRequests.total_ride_requests_count
            }

            return new Promise(resolve => {
               setTimeout(() => {
                  resolve(requests)
               }, 1000)
            })
         }
         case 'ASSET': {
            let requests = {
               asset_requests: matchingAssetsRequests.asset_requests.filter(
                  (request, index) =>
                     index >= dataToGetRequests.offset &&
                     index < dataToGetRequests.offset + dataToGetRequests.limit
               ),
               assets_matches_count: assetRequestData.total_asset_tansport_count
            }
            return new Promise(resolve => {
               setTimeout(() => {
                  resolve(requests)
               }, 1000)
            })
         }
      }
   }
   @action
   acceptTheMatchedRequestAPI(requestId) {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve('added')
         }, 1000)
      })
   }
   @action
   sharedRideAPI(details) {
      //console.log(details)
      let rides = {
         shared_rides: sharedRides.ride_shares.filter(
            (request, index) =>
               index >= details.offset && index < details.offset + details.limit
         ),
         count_of_ride_shares: sharedRides.count_of_ride_shares
      }

      return new Promise(resolve => {
         setTimeout(() => {
            resolve(rides)
         }, 1000)
      })
   }
   @action
   travelInfoAPI(details) {
      //console.log(details)
      let travel_info = {
         shared_travels: travelInfo.travel_info.filter(
            (request, index) =>
               index >= details.offset && index < details.offset + details.limit
         ),
         total_travel_infos_shared: travelInfo.no_of_travel_info
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(travel_info)
         }, 1000)
      })
   }
}
export { CommuteService }
