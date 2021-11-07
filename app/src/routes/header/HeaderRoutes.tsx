import {
  Route,
  Routes,
} from 'react-router-dom'

import BaseHeader from 'Common/layout/BaseHeader'

function HeaderRoutes() {
  return (
    <Routes>
      <Route path="*" element={<BaseHeader />} />
    </Routes>
  )
}

export default HeaderRoutes
