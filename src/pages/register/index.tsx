import { Card } from '@tremor/react'
import type { NextPage } from 'next'
import Image from 'next/image'

import React, { useEffect } from 'react'

import { Button, TextInput } from "@tremor/react";
import { SyntheticEvent, useState } from "react";
import axios, { AxiosError } from 'axios';
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"

const jar = new CookieJar(); // allow to retrieve session cookie
const client = wrapper(axios.create({ jar: jar, withCredentials: true }))


const baseUrl = "https://proxy.yowyob.com/AUTH-SERVICE"

//const baseUrl = "http://localhost:8090"


 
type RegisterResponse = {

    verificationId: string,
    status: "success" | "faild"

}


type ErrorResponse = {

    error: string, // user already exists, too many request, 
    message: string,
}


const RegistrationPage: NextPage = () => {

    const router = useRouter()

    const [verificationCode, setVerificationCode] = useState<string>("")
    const [verificationId, setVerificationId] = useState<string>("")

    const [username, setUsername] = useState<string>("")
    const [error, setError] = useState<ErrorResponse>()
    const [isSucessRegistration, setIsSucessRegistration] = useState<boolean>()


    const handleRegistration = async (e: SyntheticEvent) => {

        e.stopPropagation();
        e.preventDefault();

        setIsSucessRegistration(undefined);

        registerUser()
            .then(res => {

                if (res.status == "success") {

                    setVerificationId(res.verificationId);
                    setIsSucessRegistration(true);
                    console.log(verificationId)
                }
            })
            .catch(err => {

                const errorData = err?.response?.data as ErrorResponse
                setError(errorData)
                console.log(errorData)

            })

    }


    const registerUser = async () => {

        /* The password length must be greater than or equal to 8 and lower thant 26</p>
           * <p>The password must contain one or more uppercase characters</p>
           * <p>The password must contain one or more lowercase characters</p>
           * <p>The password must contain one or more numeric values</p>
           * <p>The password must contain one or more special characters</p> */

        const data = {

            //username: username,
            username: "cteuboutonzong@gmail.com",
            password: "7R8Hvqvgz@jd#dhcv9", // 
            deviceName: "(Windows NT 10.0; Win64; x64)",
            deviceId: "uuid4",
            deviceOs: "WEB",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            deviceModel: "windows",
            deviceManufacturer: "windows",
            usernameType: "EMAIL", // PHONE Or EMAIL

        }

        // route /api/** don't allowcredentials, we use simple axios client

        return (await axios.post<RegisterResponse>(baseUrl + '/api/v0/web/register', data, {})).data
    }

    const getRedirect = () => {

		const redirect = getCookie('redirect')
		if (redirect) {
			deleteCookie('redirect')
			return redirect.toString()
		}

		return '/'
	}



    const validateOtp = async (e: SyntheticEvent) => {

        e.stopPropagation();
        e.preventDefault();

        const body = new FormData();
        body.append('verificationId', verificationId);
        body.append('verificationCode', verificationCode);

        const config = {

            headers: {
                "Content-Type": "multipart/form-data;",
            }
        }

        // important for retrieve cookie
        // route /web/**  allowcredentials, we use custom axios client

        axios.post(baseUrl + '/web/otp/verify', body, config)
            .then(res => res.data)
            .then(data => {

                console.log(data);

                if (data?.redirect) {
                    window.location.href = data?.redirect
                }
                else {

                    router.push(getRedirect()); 
                }

            })
            .catch(err => {

                console.log(err);
                const errorData = err?.response?.data as ErrorResponse
                setError(errorData);
                console.log(errorData);

            })


        //setCookie("redirect", res?.data?.redirect)
        //signIn("yowyob");

    }


    return (<div className="row">
        <div className="col-sm-6 col-lg-3">
            <Card className="mb-4">
                <div>
                    <div className="fs-4 fw-semibold">
                        Registration
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                        <input onChange={event => setUsername(event.target.value)}
                            type="number"
                            className="peer  block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.2rem] leading-[1.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput33"
                            placeholder="Password" />

                        {isSucessRegistration && <p className="text-green text-bold text-green-500 text-xs italic">Sucess Registration</p>}

                    </div>
                    <Button onClick={(event) => handleRegistration(event)}
                        className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        Create Account
                    </Button>
                    <div className="fw-semibold text-red text-red-500">
                        {error?.error}
                        {error?.message}
                    </div>
                    <div className="fs-4 fw-semibold">
                        Validation
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                        <input onChange={event => setVerificationCode(event.target.value)}
                            type="number"
                            className="peer  block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.2rem] leading-[1.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput33"
                            placeholder="Password" />

                        {error && <p className="text-red text-red-500 text-xs italic">Invalid OTP</p>}

                    </div>
                    <Button onClick={(event) => validateOtp(event)}
                        className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        Submit code
                    </Button>
                    <div className="fw-semibold text-red text-red-500">
                        {error?.error}
                        {error?.message}
                    </div>

                    <Button onClick={(event) => signIn("yowyob")}
                        className="inline-block w-full mt-10 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        OAuth Login
                    </Button>
                </div>
            </Card>
        </div>
    </div>)

}

export default RegistrationPage
