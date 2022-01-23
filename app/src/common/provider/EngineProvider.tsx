import { Engine } from '@babylonjs/core'
import { EnginePublisherContext, EngineSubscriberContext } from 'Contexts/EngineContext'
import {
  PropsWithChildren,
  useState,
} from 'react'

import {
  fulfilled,
  Task,
} from 'Util/AsyncState'
import { O } from 'Util/Fx'

interface EngineProviderProps extends PropsWithChildren<{}> {}

function EngineProvider({ children }: EngineProviderProps) {
  const [engineT, setEngineT] = useState<Task<O.Option<Engine>>>(fulfilled(null))

  return (
    <EnginePublisherContext.Provider value={setEngineT}>
      <EngineSubscriberContext.Provider value={engineT}>
        { children }
      </EngineSubscriberContext.Provider>
    </EnginePublisherContext.Provider>
  )
}

export default EngineProvider
