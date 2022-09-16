import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import styles from './User.module.css'
import axios from 'axios'
import { AiFillGithub } from "react-icons/ai";

export default function User() {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [repos, setRepos] = useState([])

    const api = axios.create()

    useEffect(() => {
        api.get(`https://api.github.com/users/${params.name}`)
        .then(resp => {
            setUser(resp.data)
        }).catch(err => console.log(err))
    }, [params.name])

    useEffect(() => {
        api.get(`https://api.github.com/users/${params.name}/repos`)
        .then(resp => {
            setRepos(resp.data)
        }).catch(err => console.log(err))
    }, [params.name])

    return (
        <>
        {!user && ( 
        <div className={styles.loading_container}>
            <div className={styles.loading}>
                <p>Loading...</p>
            </div>
        </div>
        )}
        {user && 
        <section className={styles.user_informations}>
            <AiFillGithub className={styles.git_logo} />
            <div className={styles.display_user}>
                <div className={styles.user}>
                <Link className={styles.back} to='/'>Back</Link>
                    <div className={styles.basic_details}>
                        <img className={styles.photo} src={user.avatar_url} alt={`${params.name} User git hub portrait `} />
                        <h1>
                            <span className={styles.user_name}>{user.name}</span>
                            <span className={styles.user_login}>@{user.login}</span>
                        </h1>
                        <p>{user.bio}</p>
                        <a className={styles.go_profile} target="_blank" rel="noreferrer" href={user.html_url}>Go to profile</a>
                    </div>

                    <div className={styles.follow_control}>
                        <p>{user.followers} follower{user.followers <= 1 ? "" : "s"}</p>
                        <p>•</p>
                        <p>{user.following} following</p>
                    </div>

                </div>
                <div className={styles.repositories}>
                    {repos.map(el => (
                        <div key={el.id} className={styles.repos_box}>
                            <div className={styles.repos__name__visibility}>
                                <a className={styles.name_repos} href={el.html_url}>{el.name}</a>
                                <p>{el.visibility}</p>
                            </div>
                            <p className={styles.repos_description}>{el.description}</p>
                            <p className={styles.language}>{el.language !== null ? el.language : ""}</p>
                        </div> 
                    ))}
                </div>
            </div>
        </section>}
    </>
    );
}