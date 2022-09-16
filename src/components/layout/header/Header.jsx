import Container from '../container/Container'
import { AiFillGithub } from "react-icons/ai";

import styles from './Header.module.css'

export default function Header() {
    return(
        <header className={styles.header}>
            <Container>
                <div className={styles.header_wrapper}>
                    <AiFillGithub className={styles.git_logo} />
                    <h1>Git finder</h1>
                </div>
            </Container>
        </header>
    )
}