import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

type ApplicationPropertyState = Record<string, any>

type MountPropertyActionPayload = {
  name: string
  init: any
}

type SetPropertyActionPayload = {
  name: string
  value: any
}

type UnmountPropertyActionPayload = {
  name: string
}

const applicationPropertySlice = createSlice({
  name: 'applicationProperty',
  initialState: {},
  reducers: {
    mountProperty: (
      draft: ApplicationPropertyState,
      action: PayloadAction<MountPropertyActionPayload>,
    ) => {
      draft[action.payload.name] = action.payload.init
    },
    setProperty: (
      draft: ApplicationPropertyState,
      action: PayloadAction<SetPropertyActionPayload>,
    ) => {
      if (draft[action.payload.name] === undefined) { return }

      draft[action.payload.name] = action.payload.value
    },
    unmountProperty: (
      draft: ApplicationPropertyState,
      action: PayloadAction<UnmountPropertyActionPayload>,
    ) => {
      delete draft[action.payload.name]
    },
  },
})

export const { reducer } = applicationPropertySlice
export const { mountProperty, setProperty, unmountProperty } = applicationPropertySlice.actions
