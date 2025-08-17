'use client'
import { useWorker } from '@/app/_Context/WorkerContext';
import { Group, Groups, Home, Mail, Message, Notifications } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SideBar = () => {
    const router = usePathname();


    const { notifications, selectedConversationRef } = useWorker()

    useEffect(() => {
        selectedConversationRef.current = null
    }, [router])
    // const [path, setPath]= useState(router)
    useEffect(() => {
        const count = document.querySelector("#msgCount")
        count.textContent = notifications > 0 ? (notifications > 9 ? "9+" : notifications) : ""
        if (notifications > 0 && count) {
            count.style.opacity = 1
        } else {
            count.style.opacity = 0

        }
    }, [notifications])
    return (
        <div className="sidebar">
            <Link href={"/"} className={`menu-item ${router == "/" && "active"}`}>
                <span><Home /></span>
                <h3>Home</h3>
            </Link>
            <Link href={"/users"} className={`menu-item ${router == "/users" && "active"}`}>
                <span><Group /></span>
                <h3>Users</h3>
            </Link>
            <Link href={"/groups"} className={`menu-item ${router == "/groups" && "active"}`}>
                <span><Groups /></span>
                <h3>Groups</h3>
            </Link>


            <Link href={"/chat"} className={`menu-item ${router == "/chat" && "active"}`} id="messages-notifications">
                <span className='i'>
                    <Mail />
                    {
                        notifications > 0 && <small className="notification-count">{notifications}</small>
                    }
                </span>
                <h3>Messages</h3>
            </Link>


        </div>
    )
}

export default SideBar
