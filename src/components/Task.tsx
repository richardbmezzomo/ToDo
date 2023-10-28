import { useState } from 'react';
import styles from '../components/Task.module.css'

import { Trash } from 'phosphor-react'

interface Task {
  content: string;
  onDeleteTask: (task: string) => void;
}

export function Task({content, onDeleteTask}:Task) {
  const [isChecked, setIsChecked] = useState(false)

  function handleDeleteTask() {
    onDeleteTask(content)
  }

  return(
    <div className={styles.card}>
      <label className={styles.checkbox}>
        <input 
          type="checkbox" 
          className={styles.checkboxInput}
          onChange={() => setIsChecked(!isChecked)}
        />
        <span className={styles.checkmark}></span>
      </label>
      <p style={{textDecoration: isChecked ? 'line-through' : 'none' }}>{content}</p>
      <button 
        type='submit'
        onClick={handleDeleteTask}
      ><Trash size={24}/></button>
    </div>
  )
}