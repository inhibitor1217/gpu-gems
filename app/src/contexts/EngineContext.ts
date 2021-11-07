import { createContext } from 'react'
import type { Engine } from '@babylonjs/core'

import { fulfilled } from 'Util/AsyncState'
import type { Task } from 'Util/AsyncState'
import { O } from 'Util/Fx'

type EngineContextValue = Task<O.Option<Engine>>

const EngineContext = createContext<EngineContextValue>(fulfilled(O.none()))

export default EngineContext
