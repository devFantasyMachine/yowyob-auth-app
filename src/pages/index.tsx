import { Card } from '@tremor/react'
import type { NextPage } from 'next'
import Image from 'next/image'

import React, { useEffect } from 'react'

import { Button, TextInput } from "@tremor/react";
import { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"

const jar = new CookieJar(); // allow to retrieve session cookie
const client = wrapper(axios.create({ jar: jar, withCredentials: true }))


const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)


const Home: NextPage = () => {


  useEffect(() => {


    const init = async () => {

      //const user = await client.get('http://localhost:8090/api/v0/userinfo', {})
      //console.log(user)

    }

    init();


  }, [])



  return (<div className="row">
    <div className="col-sm-6 col-lg-3">
      <Card className="mb-4">
        <div>
          <div className="fs-4 fw-semibold">
            26K
            <span className="fs-6 ms-2 fw-normal">
              (-12.4%
              )
            </span>
          </div>
          <div>Users</div>
        </div>
      </Card>
      <Button onClick={(event) => signIn("yowyob")}
        className="inline-block w-full mt-10 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light">
        OAuth Login
      </Button>
    </div>
  </div>)

}

export default Home
