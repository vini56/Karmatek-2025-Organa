"use client";
import routes from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {  ChevronsUpDown } from "lucide-react";

const registerSchema = z.object({
    email: z.string().email(),
    staff_id: z.string().min(3),
    password: z.string().min(6),
    role: z.string().min(3),
    // hospital_id: z.coerce.number().min(3),
    hospital_name: z.string().min(3),
});
const StaffForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            staff_id: "",
            password: "",
            role: "",
            // hospital_id: 0,
            hospital_name: "",
        },
    });

    const [hospitals, setHospitals] = useState([
        {
            id: "1",
            name: "Cnmc",
        },
        {
            id: "2",
            name: "NRS",
        },
    
        {
            id: "3",
            name: "Rg Kar",
        },
    ])

    useEffect(() => {
        const getHospital = async () => {
            try {
                const response = await axios.get(routes.getHospitals);
                console.log(response.data);

                setHospitals(response.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        getHospital();
    }, []);

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {

        try {
            console.log("Values: ", values);
            const reqBody = {
                email: values.email,
                staff_id: values.staff_id,
                password: values.password,
                role: values.role,
                hospital_name: values.hospital_name,
                hospital_id: hospitals.find(
                    (item) => item.name === values.hospital_name
                )?.id,
            }
            console.log("ReqBody: ", reqBody);

            // const response = await axios.post(routes.addStaff, values);
            // console.log("Registration Successful:", response.data);
            form.reset();
            router.push("/dashboard");
        } catch (error) {
            console.error("Registration Failed:", error);
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl space-y-4 p-4"
            >
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-muted-foreground text-sm">
                    Access ad free matching. Flexible and secure.
                </p>

                <FormField
                    control={form.control}
                    name="email"
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
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hospital_name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Hospital</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? `${field.value}`
                                                : "Select Hospital"}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Hospital..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No Hospital Found.</CommandEmpty>
                                            <CommandGroup>
                                                {hospitals.map((item) => (
                                                    <CommandItem
                                                        value={item.name}
                                                        key={item.id}
                                                        onSelect={() => {
                                                            form.setValue("hospital_name", item.name);
                                                        }}
                                                    >
                                                        {item.id} - {item.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="staff_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Staff Id</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="staff1"
                                    type="string"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Register</Button>
            </form>
        </Form>
    );
};

export default StaffForm;
