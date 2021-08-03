import React from 'react'
import { observer } from 'mobx-react'
import { DateAndTime } from './DateTime.js'
import { FlexibleDateAndTimeStyle } from '../../../styledComponents/styleComponents.js'

@observer
class FlexibleDateTime extends React.Component {
   render() {
      const { onChangeFromTime, onChangeToTime, displayError } = this.props
      return (
         <FlexibleDateAndTimeStyle>
            <DateAndTime
               label={'FROM'}
               onChangeTime={onChangeFromTime}
               displayError={displayError}
            />
            <DateAndTime
               label={'TO'}
               onChangeTime={onChangeToTime}
               displayError={displayError}
            />
         </FlexibleDateAndTimeStyle>
      )
   }
}
export { FlexibleDateTime }
