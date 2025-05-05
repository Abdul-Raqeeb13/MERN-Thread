import React from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom.js'

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom); // read state
//   const setAuthScreen = useSetRecoilState(authScreenAtom); // get setter function

  console.log(authScreenState);

  return (
    <>
      {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
    </>
  );
}

export default AuthPage
