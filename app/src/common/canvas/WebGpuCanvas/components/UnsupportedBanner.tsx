import { memo } from 'react'
import {
  Banner,
  BannerVariant,
} from '@channel.io/bezier-react'

function UnsupportedBanner() {
  return (
    <Banner
      icon="block"
      variant={BannerVariant.Red}
      content={`WebGPU is not supported in this browser.
Refer to Chrome Platform Status to check current status of WebGPU support.`}
      hasLink
      linkText="See More"
      linkTo="https://www.chromestatus.com/feature/6213121689518080"
    />
  )
}

export default memo(UnsupportedBanner)
