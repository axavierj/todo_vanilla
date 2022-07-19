import { crud } from '../helpers/helpers.js'
const login = crud('POST')
const register = crud('POST')
const getUsers = crud('GET')
const deleteUser = crud('DELETE')
const guard = crud('GET')

const getSessionToken = () => {
  const user = sessionStorage.getItem('user')
  return JSON.parse(user)
}

const guardRoute = async (user, url, redirect) => {
  try {
    await guard({ url }, user.accessToken)
  } catch (err) {
    console.log(err)
    window.location.href = redirect
  }
}

const logOut = () => {
  sessionStorage.removeItem('user')
  window.location.href = '/login'
}

const authService = {
  login,
  register,
  deleteUser,
  getUsers,
  getSessionToken,
  guardRoute,
  logOut,
}

export default authService
