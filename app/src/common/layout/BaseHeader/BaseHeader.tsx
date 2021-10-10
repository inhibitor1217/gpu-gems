import {
  LayoutHeaderType,
  Text,
  Typography,
  useHeader,
} from '@channel.io/bezier-react'

import * as Styled from './BaseHeader.styled'

function Title() {
  return (
    <Text
      as="h1"
      typo={Typography.Size24}
      bold
      color="txt-black-darkest"
    >
      GPU Gems
    </Text>
  )
}

function BaseHeader() {
  useHeader(LayoutHeaderType.ContentHeader)

  return (
    <Styled.Container>
      <Title />
    </Styled.Container>
  )
}

export default BaseHeader
