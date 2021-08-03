import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'

import { Dashboard } from '../../components/Dashboard'
@inject('practiceStore')
@observer
class PracticeDashboardRoute extends React.Component {
   componentDidMount() {
      this.doNetworkCalls()
   }
   @action.bound
   async doNetworkCalls() {
      const {
         practiceStore: {
            getResourceDetails,
            getResourceItems,
            paginationStore: { getData }
         }
      } = this.props
      await getResourceDetails()
      await getResourceItems()
      await getData()
   }
   render() {
      const { practiceStore } = this.props
      const { doNetworkCalls } = this
      return (
         <Dashboard
            practiceStore={practiceStore}
            doNetworkCalls={doNetworkCalls}
         />
      )
   }
}
export { PracticeDashboardRoute }
