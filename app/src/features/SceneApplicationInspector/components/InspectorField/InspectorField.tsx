import {
  IconName,
  KeyValueListItem,
  Text,
  Typography,
} from '@channel.io/bezier-react'

import { F, O } from 'Util/Fx'

interface InspectorFieldProps<T> {
  keyIcon: IconName
  keyName: string
  value: O.Option<T>
  mapValue: (value: T) => string
}

function InspectorField<T>({
  keyIcon,
  keyName,
  value,
  mapValue,
}: InspectorFieldProps<T>) {
  return (
    <KeyValueListItem
      keyIcon={keyIcon}
      keyContent={keyName}
    >
      <Text
        typo={Typography.Size13}
        color="txt-black-darkest"
      >
        { F.go(
          value,
          O.map(mapValue, 'Unknown'),
        ) }
      </Text>
    </KeyValueListItem>
  )
}

export default InspectorField
