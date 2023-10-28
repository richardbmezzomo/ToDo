import { ChangeEvent, FormEvent, InvalidEvent, useState, useEffect } from 'react'
import styles from '../components/Tasks.module.css'
import { PlusCircle } from 'phosphor-react'
import { Task } from './Task.tsx'
import { Empty } from './Empty.tsx'


export function Tasks() {
  const [tasks, setTasks] = useState<string[]>([]); // Defina o tipo como string[]
  const [newTaskText, setNewTaskText] = useState<string>(''); // Defina o tipo como string


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault(); 

    setTasks([...tasks, newTaskText])
    setNewTaskText('')

    localStorage.setItem('tasks', JSON.stringify([...tasks, newTaskText]));
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value) // seta o valor digitado no input
  }

  function deleteTask(taskToDelete: string) {
    const taskToDeleteOne = tasks.filter(task => task !== taskToDelete);
    setTasks(taskToDeleteOne);
  
    // Atualizar o localStorage após a exclusão
    localStorage.setItem('tasks', JSON.stringify(taskToDeleteOne));
  }

  function handleTaskInvalid(event: InvalidEvent<HTMLInputElement> ) {
    event.target.setCustomValidity("Este campo é obrigatório!")
  }

  useEffect(() => {
    // Carregar tarefas do localStorage ao iniciar o aplicativo
    const savedTasksJSON = localStorage.getItem('tasks');
    if (savedTasksJSON) {
      const savedTasks = JSON.parse(savedTasksJSON) as string[];
      setTasks(savedTasks);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.input}>
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa" 
          value={newTaskText}
          name='input' 
          onChange={handleNewTaskChange} // a cada mudança executa a função
          onInvalid={handleTaskInvalid}
          required
        />
        <button type="submit">Criar <PlusCircle size={16} weight={'bold'}/></button>
      </form>
      <div className={styles.tasks}>
        <div className={styles.info}>
          <div className={styles.created}>
            <span>Tarefas criadas</span>
            <strong>0</strong>
          </div>
          <div className={styles.finished}>
            <span>Concluídas</span>
            <strong>0</strong>
          </div>
        </div>      
        { tasks.length == 0 ? ( 
            <Empty/>
          ) : (
            tasks.map(task => {
              return (
                <Task 
                  key={task}
                  content={task} 
                  onDeleteTask={deleteTask}
                />
              ) 
            })
          )}
      </div>
    </>
  )
 
  
}