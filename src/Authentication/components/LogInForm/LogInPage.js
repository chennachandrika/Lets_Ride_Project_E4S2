import React from 'react'
import { observer } from 'mobx-react'
import { InputField } from '../Common/InputField.js'
import { LogoImage } from '../Common/LogoImage.js'
import strings from '../../i18n/strings.json'
import { Button } from '../Common/Button.js'

import { COMMUTE_DASHBOARD_SIGNUP_PAGE } from '../../constants/NavigationalConstants.js'
import {
   FormType,
   FormDashBoard,
   FormHeading,
   SignUpPageLink,
   LoginLink as SignUpLink,
   LogInDetailsAlert,
   LogoImageContainer
} from './styledComponents.js'

@observer
class LogInForm extends React.Component {
   render() {
      const {
         userName,
         password,
         onChangeUserName,
         onChangePassword,
         onSubmit,
         displayError,
         errorText
      } = this.props
      return (
         <FormDashBoard>
            <FormType>
               <LogoImageContainer>
                  <LogoImage />
               </LogoImageContainer>
               <FormHeading>{strings.logInFormHeading}</FormHeading>
               <InputField
                  value={userName}
                  onChange={onChangeUserName}
                  type={'text'}
                  placeholderText={'Username'}
                  displayError={displayError}
                  label={'USERNAME'}
               />
               <InputField
                  value={password}
                  onChange={onChangePassword}
                  type={'password'}
                  placeholderText={'Password'}
                  displayError={displayError}
                  label={'PASSWORD'}
               />
               {errorText.length !== 0 ? (
                  <LogInDetailsAlert>{errorText}</LogInDetailsAlert>
               ) : (
                  ''
               )}
               <Button buttonText={strings.logIn} onClickFunction={onSubmit} />
               <SignUpLink>
                  {strings.signUpLink} &nbsp;{' '}
                  <SignUpPageLink href={COMMUTE_DASHBOARD_SIGNUP_PAGE}>
                     {' '}
                     &nbsp;{strings.signUpLinkText}
                  </SignUpPageLink>
               </SignUpLink>
            </FormType>
         </FormDashBoard>
      )
   }
}
export { LogInForm }
