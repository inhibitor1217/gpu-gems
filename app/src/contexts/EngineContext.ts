import { createContext } from 'react'
import type { Engine } from '@babylonjs/core'
import _ from 'lodash'

import { fulfilled } from 'Util/AsyncState'
import type { Task } from 'Util/AsyncState'
import { O } from 'Util/Fx'

type EngineContextValue = Task<O.Option<Engine>>

type EngineSubscriberContextValue = EngineContextValue

export const EngineSubscriberContext = (
  createContext<EngineSubscriberContextValue>(fulfilled(O.none()))
)

type EnginePublisherContextValue = (engineT: EngineContextValue) => void

export const EnginePublisherContext = createContext<EnginePublisherContextValue>(_.noop)
