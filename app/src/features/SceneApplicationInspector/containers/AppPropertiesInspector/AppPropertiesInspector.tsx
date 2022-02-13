import { SectionLabel } from '@channel.io/bezier-react'
import _ from 'lodash'

import { Card } from 'Common/base/Card'
import { InspectorField } from 'Features/SceneApplicationInspector/components/InspectorField'
import { useSelector } from 'Redux/store'

function Title() {
  return (
    <SectionLabel
      leftContent={{ icon: 'info-filled' }}
      content="Properties Inspector"
    />
  )
}

interface PropertyProps {
  name: string
}

const mapProperty = (value: any) => value.toString()

function Property({ name }: PropertyProps) {
  const current = useSelector((state) => _.get(state.applicationProperty, name))

  return (
    <InspectorField
      keyIcon="number"
      keyName={name}
      value={current}
      mapValue={mapProperty}
    />
  )
}

function AppPropertiesInspector() {
  const names = useSelector(
    (state) => _.keys(state.applicationProperty),
    _.isEqual,
  )

  return (
    <Card>
      <Title />
      { names.map((name) => <Property key={name} name={name} />) }
    </Card>
  )
}

export default AppPropertiesInspector
