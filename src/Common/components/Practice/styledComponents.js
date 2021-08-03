/** @jsx jsx */
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'

const color = 'white'

export const dynamicStyleWithProp = props =>
   css`
      background-color: ${props.color};
      padding: 20px;
      border-radius: 20px;
      font-weight: bold;
      color: white;
   `

export const Container = styled.button`
   ${dynamicStyleWithProp};
`

export const Element = styled.button`
   padding: 32px;
   background-color: hotpink;
   font-size: 24px;
   border-radius: 4px;
   &:hover {
      color: ${color};
   }
`

// let SomeComponent = props => (
//   <div className={props.wrapperClassName}>
//     Parent
//     <div className={props.className}>{props.children}</div>
//   </div>
// )

/*<ClassNames>
        {({ css }) => (
          <SomeComponent
            wrapperClassName={css({ color: 'green' ,fontSize:'40px',display:'flex'})}
            className={css`
              color: hotpink;
            `}
            children='children'
          />
        )}
      </ClassNames>
      */
