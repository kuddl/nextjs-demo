import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'

const fetcher = (query) =>
    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
        .then((res) => res.json())
        .then((json) => json.data)


export default function Hello() {
    const { data, error } = useSWR('{ users { name } }', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const { users } = data

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello FROM graphql</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}> Usere User </h1>


                <h2>User Liste</h2>
                <div>

                {users.map((user, i) => (
                    <div key={i}>{user.name}</div>
                    ))}
                    </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}
