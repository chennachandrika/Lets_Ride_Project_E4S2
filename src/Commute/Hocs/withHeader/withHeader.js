import React from 'react'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/Header'

function withHeader(WrappedComponent) {
   return class extends React.Component {
      render() {
         return (
            <React.Fragment>
               <Header {...this.props} />
               <WrappedComponent {...this.props} />
            </React.Fragment>
         )
      }
   }
}

export default withHeader
