import { SectionLabel } from '@channel.io/bezier-react'

import { Card } from 'Common/base/Card'

import EngineFps from '../../components/EngineFps/EngineFps'

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
      <EngineFps />
    </Card>
  )
}

export default EngineInspector
