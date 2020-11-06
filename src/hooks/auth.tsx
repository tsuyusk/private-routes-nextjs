import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookie from '../utils/cookie';
import jwt from 'jsonwebtoken';

interface SignInData {
  username: string;
  password: string;
}

interface AuthContextState {
  user: {
    username: string;
    admin: boolean;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOff(): void;
  signIn(data: SignInData): Promise<void>;
}

const AuthContext = createContext({} as AuthContextState )

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState({} as AuthContextState);
  const [isLoading, setIsLoading] = useState(true);

  function signOff() {
    Cookie.removeCookie('token');
    setData({} as AuthContextState);

    router.push('/');
  }

  async function signIn({ username, password }: SignInData) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    const { token } = data;

    if (token) {
      const json = jwt.decode(token) as AuthContextState["user"];

      Cookie.setCookie('token', json);

      setData(state => ({
        ...state,
        user: json,
      }))
    }
  }
  
  useEffect(() => {
    const rawUser = Cookie.getCookie('token');

    if (!rawUser) {
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(rawUser);

    setData(state => ({
      ...state,
      user,
    }));
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
        user: data.user,
        isAuthenticated: !!data.user,
        isLoading,
        signOff,
        signIn,
      }}>

      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);

  if (!data) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return data;
}

export default AuthProvider;

