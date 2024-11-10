"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import ImageUpload from "../../custom_ui/ImageUpload";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// import toast from "react-hot-toast";
import Delete from "../../custom_ui/Delete";

const formSchema = z.object({
  email_address: z
    .string(),
  username: z
    .string()
    .min(2, "Username is too short!")
    .max(50, "Username is too long!")
    .optional()
    .or(z.literal('')),
  first_name: z
    .string()
    .min(2, "First name is too short!")
    .max(50, "First name is too long!")
    .optional()
    .or(z.literal('')),
  // username: z.string().min(2).max(20) || null,
  // first_name: z.string().max(50) || null,
  image_url: z.string() || null,
});

interface ProfileFormProps {
  initialData?: UserType | null; //Must have "?" to make it optional
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?
      {
        email_address: initialData.email_address,
        username: initialData.username || "",
        first_name: initialData.first_name || "",
        image_url: initialData.image_url || "",
      } :
      {
        email_address: "",
        username: "",
        first_name: "",
        image_url: "",
      },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = "/api/user";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setLoading(false);
        // toast.success(`Profile ${initialData ? "updated" : "created"}`);
        toast({
          title: "Success",
          description: (
            <pre className="mt-1 w-auto rounded-md">
              <code>
                {`Profile ${initialData ? "updated" : "created"}`}
              </code>
            </pre>
          ),
        });
        // window.location.href = "/profile";
        // router.push("/profile");
      }
    } catch (err) {
      console.log("[profile_POST]", err);
      // toast.error("Something went wrong! Please try again.");
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
  };

  return (
    <div className="p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} onKeyDown={handleKeyPress} />
                  {/* <Textarea placeholder="First Name" {...field} rows={5} onKeyDown={handleKeyPress} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-700 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => {
                window.location.href = "/profile";
                // router.push("/profile");
              }}
              className="bg-blue-700 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
