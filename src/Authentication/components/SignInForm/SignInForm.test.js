/*global expect*/
import React from 'react'

import { render } from '@testing-library/react'

import SignInForm from '.'

describe('SignInForm', () => {
   it('should render typed fields', () => {
      const userName = 'test-user'
      const password = 'test-password'
      const confirmPassword = 'test-confirm'
      const { getByPlaceholderText, getByText } = render(
         <SignInForm
            choosePassword={'error'}
            userName={userName}
            password={password}
            confirmPassword={confirmPassword}
            mobileNumber={'146456'}
            displayError={true}
            onChangeUserName={() => {}}
            onChangePassword={() => {}}
            onChangeConfirmPassword={() => {}}
            onChangeMobileNumber={() => {}}
         />
      )

      const usernameField = getByPlaceholderText('Username')

      const passwordField = getByPlaceholderText('Password')

      const confirmPasswordField = getByPlaceholderText('Confirm Password')
      expect(passwordField.value).toBe(password)
      expect(usernameField.value).toBe(userName)
      expect(confirmPasswordField.value).toBe(confirmPassword)
   })
})
