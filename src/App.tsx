import React, { useState } from 'react';
import { Todos } from './components/Todos';
import { FilterValue, TodoId, TodoTitle, type Todo as  TodoType } from './types';
import { TODO_FILTERS } from './const';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const mockTodos = [
  {
    id: '1',
    title: 'todo 1',
    completed: false,
  },
  {
    id: '2',
    title: 'todo 2',
    completed: false,
  },
  {
    id: '3',
    title: 'todo 3',
    completed: false,
  },
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);

  const handleRemove = ({id}: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);

  }

  const handleCompleted = ({id, completed}: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id){
        return { ...todo, completed}
      }
      else{
        return todo
      }
    })

    setTodos(newTodos);
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  const handleAddTodo= ({title}: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    
  }

  const activeCount=todos.filter(todo=> !todo.completed).length;
  const completedCount = todos.length-activeCount;

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })
 
  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos onToggleCompleteTodo={handleCompleted} onRemoveTodo={handleRemove} todos={filteredTodos}/>
      <Footer onClearCompleted={handleRemoveAllCompleted} completedCount={completedCount} activeCount={activeCount} filterSelected={filterSelected} handleFilterChange={handleFilterChange}/>
    </div>
  );
}

export default App;
