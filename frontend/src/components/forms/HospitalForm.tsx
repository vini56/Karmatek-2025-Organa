"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import axios from "axios";
import routes from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";

const hospitalSchema = z.object({
  name: z.string().nonempty().min(3),
  location: z.string().nonempty(),
  contact_phone: z.string().nonempty(),
  contact_email: z.string().nonempty(),
});

const HospitalForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof hospitalSchema>>({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: "",
      location: "Kolkata",
      contact_phone: "1234556778",
      contact_email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof hospitalSchema>) => {
    console.log("Values: ", values);
    try {
      // const response = await axios.post(routes.addHospital, values);
      const response = await axios.post("/api/hospitals", values);
      console.log("Response: ", response?.data);
      toast({
        variant: "success",
        title: "Hospital Added",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (error) {
      console.log("Error: ", error);
      toast({
        variant: "destructive",

        title: "Oops! Something went wrong",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-4 p-4"
      >
        {/* Hospital name */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hospital Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hospital location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hospital Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Phone */}
        <FormField
          control={form.control}
          name="contact_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Email */}
        <FormField
          control={form.control}
          name="contact_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default HospitalForm;
