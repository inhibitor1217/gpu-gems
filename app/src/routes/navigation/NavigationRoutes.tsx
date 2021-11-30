import {
  Link,
  useMatch,
} from 'react-router-dom'
import {
  OutlineItem,
  SectionLabel,
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
  const isOnPerlinNoiseApp = O.isNotNone(useMatch('perlin-noise'))

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

      <Link to="perlin-noise">
        <OutlineItem
          active={isOnPerlinNoiseApp}
          content={(
            <Styled.RouteItemText>
              Perlin Noise
            </Styled.RouteItemText>
          )}
        />
      </Link>
    </Styled.NavigationContent>
  )
}

export default NavigationRoutes
