import React from 'react'

import { Button } from '../../../Common/components/Button'

class PracticeCommonComponents extends React.Component {
   render() {
      return (
         <Button
            text={'Click here'}
            onClick={() => {
               alert('Hello')
            }}
         />
      )
   }
}
export { PracticeCommonComponents }
