"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import routes from "@/lib/routes";
import { ChevronsUpDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

const loginSchema = z.object({
    // hospital_id: z.coerce.number().min(3),
    hospital_name: z.string().min(1),
    staff_id: z.string().min(1),
    password: z.string().min(6),
});

const Login = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            hospital_name: "",
            staff_id: "1",
            password: "123456",
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
            name: "RGKar",
        },
        {
            id: "4",
            name: "Sskm",
        },
    ]);

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

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        // console.log("Values", values);
        try {
            const hospitalId = hospitals.find(
                (item) => item.name === values.hospital_name,
            );
            const reqBody = {
                hospital_id: hospitalId?.id,
                staff_id: values.staff_id,
                password: values.password,
            };

            console.log("ReqBody", reqBody);

            const response = await axios.post(routes.login, values);
            // logIn(newuserData)
            console.log(response.data);

            form.reset();
            router.push("/dashboard");
        } catch (error) {
            // console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl space-y-4 p-4"
            >
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground text-sm">
                    Access ad free matching. Flexible and secure.
                </p>

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
                                                !field.value &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            {field.value
                                                ? `${field.value}`
                                                : "Select Hospital"}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search Hospital..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                No Hospital Found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {hospitals.map((item) => (
                                                    <CommandItem
                                                        value={item.name}
                                                        key={item.id}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "hospital_name",
                                                                item.name,
                                                            );
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
                                    placeholder="00000000"
                                    type="text"
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
                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
};
export default Login;
