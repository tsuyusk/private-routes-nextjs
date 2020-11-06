import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import PublicRoute from "../hocs/PublicRoute";
import { useAuth } from "../hooks/auth";

import styles from '../styles/Home.module.scss';

function Home() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await signIn({ username, password });

    router.push('/me');
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          autoComplete="off"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />

        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          placeholder="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <br />

        <button type="submit">
          Login
        </button>

      </form>
    </main>
  )
}

export default PublicRoute(Home);
