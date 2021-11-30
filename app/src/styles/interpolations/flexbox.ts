import { css } from '@channel.io/bezier-react'

const FLEX_DIRECTION_TO_ATTRIBUTE = {
  horizontal: 'row',
  vertical: 'column',
}

export const container = (
  direction?: 'horizontal' | 'vertical',
  alignment?: {
    main?: 'start' | 'center' | 'end',
    cross?: 'start' | 'center' | 'end',
  },
) =>
  css`
    display: flex;
    flex-direction: ${FLEX_DIRECTION_TO_ATTRIBUTE[direction ?? 'horizontal']};
    justify-content: ${alignment?.main ?? 'start'};
    align-items: ${alignment?.cross ?? 'center'};
   `

export const expanded = () =>
  css`
   flex: 1 1 0;
  `

export const centered = () =>
  css`
   margin: auto;
  `

export const crossAlignments = {
  stretch: () => css`
    align-self: stretch;
  `,
}
