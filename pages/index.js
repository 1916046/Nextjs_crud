import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'

const API_URL = '/api/todos'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [newTodoText, setNewTodoText] = useState('')
  const [editTodo, setEditTodo] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await fetch(API_URL)
    const { todos } = await res.json()
    setTodos(todos)
  }

  const handleNewTodoTextChange = (event) => {
    setNewTodoText(event.target.value)
  }

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) {
      return
    }
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodoText })
    })
    const { newTodo } = await res.json()
    setTodos([...todos, newTodo])
    setNewTodoText('')
  }

  const handleEditTodo = async () => {
    if (!editTodo.newText.trim()) {
      return
    }
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editTodo.id, newText: editTodo.newText })
    })
    const { updatedTodo } = await res.json()
    setTodos(todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return { ...todo, text: updatedTodo.text }
      }
      return todo
    }))
    setEditTodo(null)
  }

  const handleDeleteTodo = async (id) => {
    const res = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const { deletedTodo } = await res.json()
    setTodos(todos.filter(todo => todo.id !== deletedTodo.id))
  }

  return (
    <div className={styles.todoListContainer}>
      <h1 className={styles.title}>My Todos</h1>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoListItem}>
            {editTodo && editTodo.id === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodo.newText}
                  onChange={(event) =>
                    setEditTodo({ ...editTodo, newText: event.target.value })
                  }
                  className={styles.editInput}
                />
                <button onClick={handleEditTodo} className={styles.editButton}>
                  Save
                </button>
                <button onClick={() => setEditTodo(null)} className={styles.editButton}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className={styles.todoText}>{todo.text}</span>
                <button
                  onClick={() => setEditTodo({ id: todo.id, newText: todo.text })}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.newTodoContainer}>
        <input
          type="text"
          value={newTodoText}
          onChange={handleNewTodoTextChange}
          className={styles.newTodoInput}
        />
        <button onClick={handleAddTodo} className={styles.newTodoButton}>
          Add Todo
        </button>
      </div>
    </div>
  );
  
}
