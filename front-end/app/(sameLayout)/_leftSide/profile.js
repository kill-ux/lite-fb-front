"use client";

import UserInfo from "../_components/userInfo";
import { useWorker } from "@/app/_Context/WorkerContext";

const Profile = () => {
    const {userRef} = useWorker()

    return (
        <div className="profile">

        <UserInfo userInfo={userRef.current}/>
    </div>
    )
    
}

export default Profile;