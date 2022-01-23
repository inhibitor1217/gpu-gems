import _ from 'lodash'
import { createContext } from 'react'

export type Callback = () => void
export type Unregister = () => void
export type Register = (cb: Callback) => Unregister

type RegisterPreframeCallbackContextValue = Register
type RegisterPostframeCallbackContextValue = Register
type SetRegisterPreframeCallbackContextValue = (register: Register) => void
type SetRegisterPostframeCallbackContextValue = (register: Register) => void

export const RegisterPreframeCallbackContext = (
  createContext<RegisterPreframeCallbackContextValue>(() => _.noop)
)

export const RegisterPostframeCallbackContext = (
  createContext<RegisterPostframeCallbackContextValue>(() => _.noop)
)

export const SetRegisterPreframeCallbackContext = (
  createContext<SetRegisterPreframeCallbackContextValue>(_.noop)
)

export const SetRegisterPostframeCallbackContext = (
  createContext<SetRegisterPostframeCallbackContextValue>(_.noop)
)
