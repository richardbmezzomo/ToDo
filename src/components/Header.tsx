import logo from '../assets/logo.svg'
import styles from '../components/Header.module.css'

export function Header () {
  return (
    <header className={styles.header}>
      <img src={logo} />
    </header>
  )
}