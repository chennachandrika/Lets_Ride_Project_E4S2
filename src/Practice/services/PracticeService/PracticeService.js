const Details = {
   name: 'FaceMask',
   description:
      'A face mask is a device that you wear over your face, for example to prevent yourself from breathing bad air or from spreading germs, or to protect your face when you are in a dangerous situation. 2. countable noun. A face mask is the same as a face pack.',
   imgUrl:
      'https://ml7kf5kbrme3.i.optimole.com/wa_4u1A-FBVuMv93/w:800/h:800/q:90/https://jdgoshop.com/wp-content/uploads/2020/03/575330870985.jpg'
}
const ResourceItems = {
   data: [
      {
         name: 'Surgical Masks',
         imgUrl: ''
      },
      {
         name: 'N95 Respirators',
         imgUrl: ''
      },
      {
         name: 'Face Masks',
         imgUrl: ''
      }
   ]
}
import getResourceItems from '../../fixtures/getResourceItems.json'

class PracticeService {
   getResourceDetailsAPI() {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(Details)
         }, 1000)
      })
   }
   getResourceItemsAPI() {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(ResourceItems)
         }, 1000)
      })
   }
   getResourceListItemsAPI(data) {
      let listOfItems = {
         resource_items: getResourceItems.resource_items.filter(
            (item, index) =>
               index >= data.offset && index < data.limit + data.offset
         ),
         no_of_resource_items: getResourceItems.no_of_resource_items
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(listOfItems)
         }, 1000)
      })
   }
}
export { PracticeService }
