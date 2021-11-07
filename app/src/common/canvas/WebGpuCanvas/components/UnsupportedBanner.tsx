import { memo } from 'react'
import {
  Banner,
  BannerColorVariant,
} from '@channel.io/bezier-react'

function UnsupportedBanner() {
  return (
    <Banner
      icon="block"
      colorVariant={BannerColorVariant.Red}
      text={`WebGPU is not supported in this browser.
Refer to Chrome Platform Status to check current status of WebGPU support.`}
      hasLink
      linkText="See More"
      linkTo="https://www.chromestatus.com/feature/6213121689518080"
    />
  )
}

export default memo(UnsupportedBanner)
