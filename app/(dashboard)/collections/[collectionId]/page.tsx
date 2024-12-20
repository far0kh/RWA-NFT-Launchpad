"use client"

import { useEffect, useState } from "react"

import Loader from "@/components/custom_ui/Loader"
import CollectionForm from "@/components/dashboard/collections/CollectionForm"

const CollectionDetails = ({ params }: { params: Promise<{ collectionId: string }> }) => {
  const [loading, setLoading] = useState(true)
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

  const getCollectionDetails = async () => {
    try {
      const { collectionId } = await params
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: "GET"
      })
      const data = await res.json()
      setCollectionDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[collectionId_GET]", err)
    }
  }

  useEffect(() => {
    getCollectionDetails()
  }, [])

  return loading ? <Loader /> : (
    <CollectionForm initialData={collectionDetails} />
  )
}

export default CollectionDetails