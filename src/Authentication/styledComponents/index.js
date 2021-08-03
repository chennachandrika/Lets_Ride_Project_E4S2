import styled from '@emotion/styled'

import { Typo14DarkBlueGreyHKGroteskRegular } from '../styleGuides/StyleGuides.js'

import colors from '../../Common/Theme/Colors.json'
export const FormHeading = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   width: 100%;
   height: 24px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
   display: flex;
   justify-content: center;
`

export const ButtonStyle = styled.button`
   width: 100%;
   height: 40px;
   border-radius: 4px;
   background-color: ${colors.brightBlue};
   color: white;
   margin: 3px;
   padding: 3px;
`

export const ErrorStyle = styled.div`
   width: 100%;
   color: ${props => (props.isError ? colors.neonRed : colors.white)};
   font-size: 9px;
   padding: 0px;
   margin: 0px;
`

export const InputFieldWithLabel = styled.div`
   width: 100%;
`
export const ErrorSymbol = styled.span`
   color: red;
   position: absolute;
   right: 10px;
   top: 10px;
   display: ${props => (props.isError ? 'flex' : 'none')};
`
export const InputFiledWithError = styled.div`
   display: flex;
   position: relative;
   width: 100%;
`

export const InputTag = styled.input`
   width: 100%;
   border-radius: 2px;
   padding: 3px 2px;
   height: 30px;
   margin-top: 2px;
   flex-grow: 1;
   border: ${props => (props.isError ? '1px solid red' : '1px solid #d7dfe9')};
`

export const Star = styled.sup`
   color: ${colors.neonRed};
`
