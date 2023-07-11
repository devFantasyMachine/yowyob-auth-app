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

const jar = new CookieJar(); // allow to retrieve session cookie
const client = wrapper(axios.create({ jar: jar, withCredentials: true }))


const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)


const Home: NextPage = () => {


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
    </div>
  </div>)

}

export default Home
