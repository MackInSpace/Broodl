'use client';
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
const fugaz = Fugaz_One({
    subsets: ["latin"],
    weight: ['400']
});

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [inRegister, setInRegister] = useState(false)
    const [authenticating, setAuthenticating] = useState(false)
    const { login, register } = useAuth()

    async function handleSubmit() {
        if (!email || !password || password.length < 6) {
            return
        }
        setAuthenticating(true)
        try {
            if (isRegister) {
                console.log('Signing up a new user')
                await signup(email, password)
            } else {
                console.log('Logging in existing user')
                await login(email, password)
            }
        } catch (err) {
            console.log(err.message)
        } finally {
            setAuthenticating(false)
        }
    }

    return (
        <div>

        </div>
    );
}