import { Route, Routes } from 'react-router'
import UserList from './pages/UserList/UserList.page'
import RegisterUser from './pages/RegisterUser/RegisterUser.page'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/registrar-usuario" element={<RegisterUser />} />
    </Routes>
  )
}
