"use client"

import { useEffect, useState } from "react"
// import { useUser } from "@clerk/nextjs";
import Loader from "@/components/custom_ui/Loader"
import ProfileForm from "@/components/dashboard/profile/ProfileForm"

const ProfilePage = () => {
  // const { isSignedIn, user, isLoaded } = useUser()

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserType | null>(null)

  // if (!isLoaded) {
  //   // Handle loading state however you like
  //   return null
  // }

  const getUserData = async () => {
    try {
      // const ckerkId = user?.userId
      const res = await fetch(`/api/profile`, {
        method: "GET"
      })
      const data = await res.json()
      setUserData(data[0])
      setLoading(false)
    } catch (err) {
      console.log("[collectionId_GET]", err)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return loading ? <Loader /> : (
    <ProfileForm initialData={userData} />
    // { userData }
  )
}

export default ProfilePage