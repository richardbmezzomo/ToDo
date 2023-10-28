import styles from '../components/Empty.module.css'
import { ClipboardText } from 'phosphor-react'

export function Empty() {
  return (
    <div className={styles.empty}>
      <ClipboardText size={56} />
      <div className={styles.content}>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
    </div>
  )
}