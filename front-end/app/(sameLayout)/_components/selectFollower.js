import React, { useEffect, useRef, useState } from 'react'
import styles from "./selectFollower.module.css"
import UserInfo from './userInfo'
import { FetchApi, useOnVisible } from '@/app/helpers'
import { useRouter } from 'next/navigation'


const SelectFollower = ({group}) => {
    const [followers, setFollowers] = useState([])
    const before = useRef(Math.floor(Date.now()))
    const lastElementRef = useRef(null)
    const redirect = useRouter()

    const fetchFollowers = async (signal) => {
        try {
            const response = await FetchApi("/api/followers", redirect, {
                method: "POST",
                body: JSON.stringify({ before: before.current }),
                signal
            })

            if (response.ok) {
                const followersData = await response.json()
                if (followersData) {
                    setFollowers((prv) => [...prv, ...followersData])
                    before.current = followersData[followersData.length - 1].modified_at
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const controller = new AbortController()
        fetchFollowers(controller.signal)
        return () => controller.abort()
    }, [])
    useOnVisible(lastElementRef, fetchFollowers)


    return (<>
        {   !group ?
            <h3>choose who can see your post:</h3>
        :<h3>invite:</h3>
}


        <div className={styles.container} >
            {followers.map((userInfo, index) => {
                if (index == followers.length - 1) {
                    return <div ref={lastElementRef} className={styles.fullUser} key={`user${userInfo.id}`}><label htmlFor={`user${userInfo.id}`}><UserInfo redirect={false} userInfo={userInfo} key={userInfo.id} /></label> <input type='checkbox' id={`user${userInfo.id}`} name='users' value={userInfo.id} /></div>
                }
                return <div className={styles.fullUser} key={`user${userInfo.id}`}><label htmlFor={`user${userInfo.id}`}><UserInfo redirect={false} userInfo={userInfo} key={userInfo.id} /></label> <input type='checkbox' id={`user${userInfo.id}`} name='users' value={userInfo.id} /></div>
            })}
        </div>
    </>

    )
}

export default SelectFollower
