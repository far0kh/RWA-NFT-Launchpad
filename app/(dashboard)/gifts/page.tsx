"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom_ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom_ui/DataTable";
import { columns } from "@/components/dashboard/gifts/GiftColumns";

const Gifts = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [gifts, setGifts] = useState<GiftType[]>([]);

  const getGifts = async () => {
    try {
      const res = await fetch("/api/gifts", {
        method: "GET",
      });
      const data = await res.json();
      setGifts(data);
      setLoading(false);
    } catch (err) {
      console.log("[gifts_GET]", err);
    }
  };

  useEffect(() => {
    getGifts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-8 pb-10 mt-2">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Gifts</p>
        <Button
          className="bg-blue-700 text-white"
          onClick={() => router.push("/gifts/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Gift
        </Button>
      </div>
      <Separator className="bg-grey-1 my-3" />
      <DataTable columns={columns} data={gifts} searchKey="title" />
    </div>
  );
};

export default Gifts;
