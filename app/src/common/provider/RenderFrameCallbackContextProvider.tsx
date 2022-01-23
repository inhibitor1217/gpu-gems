import {
  PropsWithChildren,
  useCallback,
  useState,
} from 'react'
import _ from 'lodash'

import {
  Register,
  RegisterPostframeCallbackContext,
  RegisterPreframeCallbackContext,
  SetRegisterPostframeCallbackContext,
  SetRegisterPreframeCallbackContext,
} from 'Contexts/RenderFrameCallbackContext'

interface RenderFrameCallbackContextProviderProps extends PropsWithChildren<{}> {}

function RenderFrameCallbackContextProvider({ children }: RenderFrameCallbackContextProviderProps) {
  const [registerPreframeCallback, setRegisterPreframeCallback] = useState<Register>(() => _.noop)
  const [registerPostframeCallback, setRegisterPostframeCallback] = useState<Register>(() => _.noop)

  const doSetRegisterPreframeCallback = useCallback(
    (register: Register) => setRegisterPreframeCallback(() => register),
    [],
  )

  const doSetRegisterPostframeCallback = useCallback(
    (register: Register) => setRegisterPostframeCallback(() => register),
    [],
  )

  return (
    <SetRegisterPreframeCallbackContext.Provider value={doSetRegisterPreframeCallback}>
      <SetRegisterPostframeCallbackContext.Provider value={doSetRegisterPostframeCallback}>
        <RegisterPreframeCallbackContext.Provider value={registerPreframeCallback}>
          <RegisterPostframeCallbackContext.Provider value={registerPostframeCallback}>
            { children }
          </RegisterPostframeCallbackContext.Provider>
        </RegisterPreframeCallbackContext.Provider>
      </SetRegisterPostframeCallbackContext.Provider>
    </SetRegisterPreframeCallbackContext.Provider>
  )
}

export default RenderFrameCallbackContextProvider
