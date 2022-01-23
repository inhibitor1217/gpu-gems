import { SectionLabel } from '@channel.io/bezier-react'

import { Card } from 'Common/base/Card'

function Title() {
  return (
    <SectionLabel
      leftContent={{ icon: 'settings' }}
      content="Engine Inspector"
    />
  )
}

function EngineInspector() {
  return (
    <Card>
      <Title />
    </Card>
  )
}

export default EngineInspector
