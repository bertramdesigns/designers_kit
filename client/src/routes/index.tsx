import { createFileRoute } from '@tanstack/react-router'

import { invoke } from "@tauri-apps/api/core";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
  yourName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function InputForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // greet(values.yourName)
    toast.promise(invoke("greet", {name: values.yourName}),
      {
        loading: "Submitting...",
        success: (response) => `${response}`,
        error: (error) => `Failed to greet: ${error}`
      });
  }

   return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="yourName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {


  return (
    <div className="flex flex-col justify-between space-y-8">
      <div className="flex flex-col w-full space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Designer's Kit</h2>
        <p className="text-muted-foreground">
          A hodgepodge of components and utilities for my work.
        </p>
        <InputForm />
      </div>
    </div>
  );
}
