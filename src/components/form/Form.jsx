import styles from './Form.module.css'
import { useState } from 'react'
import axios from 'axios'

import { useNavigate} from 'react-router-dom'


export default function Form() {

  let navigate = useNavigate()

  const baseUrl = 'https://api.github.com/users'
  const api = axios.create()

  const [name, setName ] = useState('')
  const [error, setError ] = useState(false)

  function handleClick() {
    setError(false)

    api.get(`${baseUrl}/${name}`)
    .then((resp) => {
      if(resp.data.login === name) {
        navigate(`/user/${name}`)
      } 
    }).catch(err => {
        setError(true)
    })
    }

    function handleChange(e) {
        setName(e.target.value)
    }

    return (
        <div className={styles.form}>
          <div className={styles.form_control}>
            <input onChange={handleChange} type="text" name="name" id="name" placeholder='Search for a git user' />
            {error && <small className={styles.error}>User not found</small>}
            <button onClick={handleClick} className={styles.btn}>Search profile</button>
          </div>
        </div>
    )  
}