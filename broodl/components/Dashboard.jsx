'use client'
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const fugaz = Fugaz_One({
    subsets: ["latin"],
    weight: ['400']
});

export default function Dashboard() {
    const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
    const [data, setData] = useState({})
    const now = new Date()

    function countValues() {
        let total_number_of_days = 0
        let sum_moods = 0
        for (let year in data) {
            for (let month in data[year]) {
                for (let day in data[year][month]) {
                    let days_mood = data[year][month][day]
                    total_number_of_days++
                    sum_moods += days_mood
                }
            }
        }
        return { num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days }
    }

    const statuses = {
        ...countValues(),
        time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
    }
    async function handleSetMood(mood) {
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()

        try {
            const newData = { ...userDataObj }
            if (!newData?.[year]) {
                newData[year][month] = {}
            }

            newData[year][month][day] = mood
            //update the current state
            setData(newData)
            //update the global state
            setUserDataObj(newData)
            //update firesbase
            const docRef = doc(db, 'users', currentUser.uid)
            const res = await setDoc(docRef, {
                [year]: {
                    [month]: {
                        [day]: mood
                    }
                }
            }, { merge: true })
        } catch (err) {
            console.log('Failed to set data: ', err.message)
        }
    }

    const moods = {
        '&*@#$': '😭',
        'Sad': '🥲',
        'Existing': '😶',
        'Good': '😊',
        'Elated': '😍',
    }

    useEffect(() => {
        if (!currentUser || !userDataObj) {
            return
        }
        setData(userDataObj)
    }, [currentUser, userDataObj])

    if (loading) {
        return <Loading />
    }

    if (!currentUser) {
        return <Login />
    }

    return (
        <div>
            <div></div>
        </div>
    )
}