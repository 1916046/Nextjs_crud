import { getItem, setItem } from "../../public/localStorage"

export default function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      const todos = getItem('todos') || []
      res.status(200).json({ todos })
      break
    case 'POST':
      const { text } = req.body
      const newTodo = { id: Date.now(), text }
      const allTodos = getItem('todos') || []
      const updatedTodos = [...allTodos, newTodo]
      setItem('todos', updatedTodos)
      res.status(200).json({ newTodo })
      break
    case 'PUT':
      const { id, newText } = req.body
      const todosToUpdate = getItem('todos') || []
      const updatedTodos2 = todosToUpdate.map(todo => {
        if (todo.id === id) {
          return { ...todo, text: newText }
        }
        return todo
      })
      setItem('todos', updatedTodos2)
      res.status(200).json({ updatedTodo: { id, text: newText } })
      break
    case 'DELETE':
      const { id: idToDelete } = req.body
      const todosToDeleteFrom = getItem('todos') || []
      const updatedTodos3 = todosToDeleteFrom.filter(todo => todo.id !== idToDelete)
      setItem('todos', updatedTodos3)
      res.status(200).json({ deletedTodo: { id: idToDelete } })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
