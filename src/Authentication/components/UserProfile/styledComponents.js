import styled from '@emotion/styled'
import colors from '../../../Common/Theme/Colors.json'

export const UserImage = styled.img`
   width: 150px;
   height: 200px;
   align-self: center;
   margin: 25px;
`
export const UserProfileDashboard = styled.div`
   width: auto;
   height: auto;
   display: flex;
   justify-content: center;
   align-items: center;
`
export const UserProfileView = styled.div`
   width: auto;
   height: auto;
   border: 1px solid ${colors.lightgrey};
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   padding-bottom: 10%;
`
export const NameEmailGender = styled.div`
   align-self: center;
   height: 50%;
`
export const JobDepartment = styled.div`
   align-self: center;
   height: 50%;
`
export const UserDetail = styled.div`
   display: flex;
   flex-direction: column;
   margin: 10px;
`
export const UserDetailElement = styled.input`
   border: 1px solid ${colors.lightgrey};
   padding: 2px;
   color: grey;
`
