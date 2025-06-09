'use client'
import { baseRating, gradients } from "@/utils";
import { Fugaz_One } from "next/font/google";
import React from "react";

const months = {
    'January': 'Jan',
    'February': 'Feb',
    'March': 'Mar', 
    'April': 'Apr',
    'May': 'May',
    'June': 'Jun',  
    'July': 'Jul',
    'August': 'Aug',
    'September': 'Sep',
    'October': 'Oct',
    'November': 'Nov',
    'December': 'Dec'
}
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({
    subsets: ["latin"],
    weight: ['400']
});

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props
    const now = new Date()
    const currentMonth = now.getMonth()
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth])
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())

    const numericMonth = monthsArr.indexOf(selectedMonth)
    const data = completeData?.[selectedYear]?.[numericMonth] || {}

    function handleIncrementMonth(val) {
        //value +1 -1
        // if we hit the bounds of the months, then we can adjust the year that is displayed instead
        if (numericMonth + val < 0) {
            setSelectedYear(curr => curr - 1)
            setSelectedMonth(monthsArr[monthsArr.length - 1])
        }
    }

    return (
        <div>
            <h1>Calendar</h1>
        </div>
    );
}