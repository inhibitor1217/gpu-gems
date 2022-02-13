import { SectionLabel } from '@channel.io/bezier-react'

import { Card } from 'Common/base/Card'

function Title() {
  return (
    <SectionLabel
      leftContent={{ icon: 'number' }}
      content="Properties Inspector"
    />
  )
}

function AppPropertiesInspector() {
  return (
    <Card>
      <Title />
    </Card>
  )
}

export default AppPropertiesInspector
