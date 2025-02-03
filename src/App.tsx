import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskTable from './components/TaskTable';
import { Task } from './interfaces/Task';
import { Container, Form, Row, Col } from 'react-bootstrap';
import './styles/custom.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string) => {
    const newTask: Task = {
      id: Date.now(),
      name,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="container">
      <Row className="align-items-center justify-content-between mb-3">
        <Col md="auto">
          <h1 className="my-4">Todo App</h1>
        </Col>
        <Col md="auto" className="ml-auto">
          <Form.Control
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </Col>
      </Row>
      <AddTaskForm addTask={addTask} />
      <TaskTable
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
      <Row className="mt-3">
        <Col>
          <p>Total Tasks: {tasks.length}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
