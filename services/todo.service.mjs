import { crud } from '../helpers/helpers.mjs'

const getAllTodo = crud('GET')
const createTodo = crud('POST')
const updateTodo = crud('PUT')
const deleteTodo = crud('DELETE')

const todoService = {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
}

export default todoService
