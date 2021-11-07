import {
  Link,
  useMatch,
} from 'react-router-dom'
import {
  NavigationContent,
  OutlineItem,
  SectionLabel,
  styled,
  Text,
  Typography,
} from '@channel.io/bezier-react'

import { O } from 'Util/Fx'
import * as Styled from './NavigationRoutes.styled'

const LAYOUT_OPTION = {
  initialWidth: 200,
  minWidth: 200,
  maxWidth: 200,
  disableResize: true,
  hidable: true,
}

function NavigationRoutes() {
  /* NOTE: consider scalable way of handling route paths */
  const isOnSimpleSceneApp = O.isNotNone(useMatch('/') || useMatch('simple-scene'))
  const isOnMarchingCubesApp = O.isNotNone(useMatch('marching-cubes'))

  return (
    <Styled.NavigationContent
      navigationKey="default"
      layoutOption={LAYOUT_OPTION}
    >
      <SectionLabel content="Applications" />

      <Link to="simple-scene">
        <OutlineItem
          active={isOnSimpleSceneApp}
          content={(
            <Styled.RouteItemText>
              Simple scene
            </Styled.RouteItemText>
          )}
        />
      </Link>

      <Link to="marching-cubes">
        <OutlineItem
          active={isOnMarchingCubesApp}
          content={(
            <Styled.RouteItemText>
              Marching cubes
            </Styled.RouteItemText>
          )}
        />
      </Link>
    </Styled.NavigationContent>
  )
}

export default NavigationRoutes
