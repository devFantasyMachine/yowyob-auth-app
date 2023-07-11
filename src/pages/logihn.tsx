import { NextPage } from 'next'


import Link from 'next/link'
import { SyntheticEvent, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'

const Login: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return '/'
  }

  const onSubmit = useCallback(async (e: { preventDefault: () => void, message:string }) => {
    e.preventDefault();
    try {
      await fetch("/api/user/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "email",
        }),
      });
    } catch (e: Error) {
      console.error(e.message);
    }
  }, []);

  const login = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    

    setSubmitting(true)

    const res = await axios.post('api/mock/login')
    if (res.status === 200) {
      router.push(getRedirect())
    }
    setSubmitting(false)
  }

  return (

    <div className="">
      <h1>Login</h1>
      <p className="text-black-50">Sign In to your account</p>

      <form onSubmit={login}>

        <label>Username</label>
        <input placeholder='Phone Or Email' title='Username'></input>



      </form>
    </div>

  )
}

export default Login
