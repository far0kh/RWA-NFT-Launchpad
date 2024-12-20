"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/dashboard/collections/CollectionColumns";
import { DataTable } from "@/components/custom_ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom_ui/Loader";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-8 pb-10 mt-2">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Collections</p>
        <Button className="bg-blue-700 text-white" onClick={() => router.push("/collections/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-3" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
