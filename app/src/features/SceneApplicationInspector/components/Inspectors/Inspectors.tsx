import type { PropsWithChildren } from 'react'

import * as Styled from './Inspectors.styled'

interface InspectorsProps extends PropsWithChildren<{}> {}

function Inspectors({ children }: InspectorsProps) {
  return (
    <Styled.List>
      { children }
    </Styled.List>
  )
}

export default Inspectors
