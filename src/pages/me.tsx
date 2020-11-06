import React from 'react';

import { useAuth } from "../hooks/auth";
import PrivateRoute from '../hocs/PrivateRoute';

import styles from '../styles/Me.module.scss';

const Me: React.FC = () => {
  const { user, signOff } = useAuth();

  return (
    <main className={styles.container}>
      <div>
        <h1>Welcome, { user.username }</h1>
        {user.admin && <p>You're an admin!</p>}
        <button onClick={signOff}>
          Sign off
        </button>
      </div>
    </main>
  );
}

export default PrivateRoute(Me);
