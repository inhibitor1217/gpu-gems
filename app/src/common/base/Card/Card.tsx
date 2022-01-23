import type { PropsWithChildren } from 'react'

import * as Styled from './Card.styled'

export interface CardProps extends PropsWithChildren<{}> {}

function Card({ children }: CardProps) {
  return (
    <Styled.Card>
      { children }
    </Styled.Card>
  )
}

export default Card
