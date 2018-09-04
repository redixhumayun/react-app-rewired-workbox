import React from 'react'

class Todo extends React.Component {
  constructor() {
    super()
    this.state = {
      currentTodo: '',
      todos: []
    }
  }

  addTodo = () => {
    const id = this.state.todos.slice(-1)[0].id + 1
    const todo = this.state.currentTodo
    this.setState({
      todos: [...this.state.todos, { id, title: this.state.currentTodo }],
      currentTodo: ''
    }, async () => {
      fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, title: todo })
      })
    })
  }

  handleTextInput = (e) => {
    const { target: { value } } = e
    this.setState({
      currentTodo: value
    })
  }

  render() {
    const { todos } = this.state
    return (
      <React.Fragment>
        <ul>
        {
          todos.map((todo, index) => (
            <li key={`${todo.id}_${index}`}>{todo.title}</li>
          ))
        }
        </ul>
        <input type='text' onChange={this.handleTextInput} value={this.state.currentTodo} />
        <button onClick={this.addTodo}>Add</button>
      </React.Fragment>
    )
  }

  async componentDidMount () {
      const response = await fetch('http://localhost:8000/todos')
      const todos = await response.json()
      this.setState({
          todos
      })
  }
}

export default Todo

