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
    const { currentUser, useDataObj, setUserDataObj, loading } = useAuth()
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

    }

    return (
        <div>
            
        </div>
    )
}