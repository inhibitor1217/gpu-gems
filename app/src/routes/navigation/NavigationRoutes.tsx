import { NavigationContent } from '@channel.io/bezier-react'

const LAYOUT_OPTION = {
  initialWidth: 200,
  minWidth: 200,
  maxWidth: 200,
  disableResize: true,
  hidable: true,
}

function NavigationRoutes() {
  return (
    <NavigationContent
      navigationKey="default"
      layoutOption={LAYOUT_OPTION}
    />
  )
}

export default NavigationRoutes
