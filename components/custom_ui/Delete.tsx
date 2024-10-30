"use client"

import { useState } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
// import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true)
      const itemType = item === "gift" ? "gifts" : "collections"
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setLoading(false)
        window.location.href = (`/${itemType}`)
        // toast.success(`${item} deleted`)
        toast({
          title: "Success",
          description: (
            <pre className="mt-1 w-auto rounded-md">
              <code>
                {`${item} deleted`}
              </code>
            </pre>
          ),
        });
      }
    } catch (err) {
      console.log(err)
      // toast.error("Something went wrong! Please try again.")
      toast({
        title: "Error",
        description: (
          <pre className="mt-1 w-auto rounded-md">
            <code>
              {"Something went wrong! Please try again."}
            </code>
          </pre>
        ),
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {/* <Button className="bg-red-1 text-white"> */}
        <Trash className="h-4 w-4 text-red-1" />
        {/* </Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
