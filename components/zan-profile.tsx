"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { Button } from '@/components/ui/button';
import { useActions, useUIState } from 'ai/rsc';
import { AI } from '@/app/action';

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "must be ast least 2 characters",
  }),
})

type Props = z.infer<typeof FormSchema>;

export function ZanProfile(props: Props): React.ReactNode {
  const {
    confirmProfileUpdate,
  } = useActions();
  console.info('props', props);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: props.firstName,
      lastName: props.lastName,
    },
  })

  const [updatingUI, setUpdatingUI] = useState<null | React.ReactNode>(
    null,
  );
  const [, setMessages] = useUIState<typeof AI>();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.info('submit data', data);
    const response = await confirmProfileUpdate(data.firstName, data.lastName);
    setUpdatingUI(response.updatingUI);

     // Insert a new system message to the UI.
     setMessages((currentMessages: any) => [
      ...currentMessages,
      response.newMessage,
    ]);
  }

  if (updatingUI) {
    return updatingUI;
  }

  return (<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-xl sm:border">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              This is your first name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              This is your last name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>);
}