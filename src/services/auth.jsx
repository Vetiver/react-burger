import { useContext, useState, createContext } from 'react'; 
import ResetPassword from '../components/ResetPassword/ResetPassword';
import { Redirect, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {loginUserInfo, setUserInfo} from '../services/actions/profile.jsx';

const setPassword = async form => {
  return await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};



const resetPassword = async form => {
  return await fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

const registerRequest = async form => {
  return await fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

const loginRequest = async form => {
  return await fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

const fakeAuth = {
  isAuthenticated: false,
  signIn(form) {
    fakeAuth.isAuthenticated = true;
    setTimeout(form, 100); // fake async
  },
  signOut(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const userInfo = useSelector(state => state.userInfo);
  const dispatching = useDispatch()
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  const resetPass = async form => {
    const data = await resetPassword(form) 
    .then(res => res.json())
    .then(data => data)
    
    if (data.success) {
      console.log(data)
      setEmail({ ...data.email });
    }
  }

  const register = form => {
    dispatching(setUserInfo(form))
    console.log(userInfo)
  }

  const signIn = form => {
    dispatching(loginUserInfo(form))
  };

  const signOut = cb => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };

  return {
    userInfo,
    user,
    email,
    signIn,
    signOut,
    register,
    resetPass,
    setPassword
  };
}