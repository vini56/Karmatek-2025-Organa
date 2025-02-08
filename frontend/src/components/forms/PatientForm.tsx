"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import H2 from "../typography/H2";
import routes from "@/lib/routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";

const patientSchema = z.object({
    name: z.string().min(2),
    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    organNeeded: z.enum([
        "heart",
        "kidney",
        "liver",
        "lung",
        "pancreas",
        "eye",
        "intestine",
    ]),
    priorityStatus: z.number().min(1).max(10).step(0.1),
    location: z.string(),
    zipCode: z.coerce.number(),
    medicalHistory: z.string(),
    // TODO: Add in backend
    // *General Information
    dateOfBirth: z.date().nullable().optional(),
    gender: z.enum(["Male", "Female", "Non-Binary"]),
    weightInKg: z.coerce.number().min(1, "Weight must be positive").optional(),
    heightInCm: z.coerce.number().min(1, "Height must be positive").optional(),
    // *Contact Information
    email: z.string().email(),
    phoneNumber: z.string().min(10),
    // *Medical Information
    primaryDiagnosis: z.string().min(2),

    // *HLA Test
    hlaTest: z
        .object({
            hlaA: z.string(),
            hlaB: z.string(),
            hlaC: z.string(),
            hlaDRB1: z.string(),
            hlaDQB1: z.string(),
        })
        .optional(),
    praScore: z.coerce.number().min(0).max(100).optional(),
    previousTransplant: z.coerce.number().min(0).default(0),
    comorbidities: z.string().optional(),
    currentMedications: z.string().optional(),
    treatingInHospital: z.string().optional(), //TODO: we'll send hospital id
    insuranceDetails: z.string().optional(),
});

const PatientForm = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            name: "Kankan Mondal",
            bloodType: "A+",
            organNeeded: "heart",
            priorityStatus: 3.4,
            location: "Dhatrigram",
            zipCode: 700001,
            medicalHistory: "Matha Kharap",
            dateOfBirth: null,
            gender: "Female",
            weightInKg: 60,
            heightInCm: 170,
            email: "knkn@gmail.com",
            phoneNumber: "1234567890",
            primaryDiagnosis: "pet kharap",
            hlaTest: {
                hlaA: "a",
                hlaB: "b",
                hlaC: "c",
                hlaDRB1: "r",
                hlaDQB1: "q",
            },
            praScore: 20,
            previousTransplant: 0,
            comorbidities: "paglamo",
            currentMedications: "cocaine",
            treatingInHospital: "",
            insuranceDetails: "nei",
        },
    });

    const priorityStatus = form.watch("priorityStatus");

    const onSubmit = async (values: z.infer<typeof patientSchema>) => {
        try {
            // console.log("Values: ", values);
            const hospitalId = hospital.find(
                (item) => item.name === values.treatingInHospital,
            )?.id;
            const requestBody = {
                name: values.name,
                blood_type: values.bloodType,
                organ_needed: values.organNeeded,
                priority_status: values.priorityStatus,
                location: values.location,
                zip_code: values.zipCode,
                medical_history: values.medicalHistory,
                date_of_birth: values.dateOfBirth,
                gender: values.gender,
                weight_in_kg: values.weightInKg,
                height_in_cm: values.heightInCm,
                email: values.email,
                phone_number: values.phoneNumber,
                primary_diagnosis: values.primaryDiagnosis,
                hla_test: {
                    hlaA: values.hlaTest?.hlaA,
                    hlaB: values.hlaTest?.hlaB,
                    hlaC: values.hlaTest?.hlaC,
                    hlaDRB1: values.hlaTest?.hlaDRB1,
                    hlaDQB1: values.hlaTest?.hlaDQB1,
                },
                pra_score: values.praScore,
                previous_transplant: values.previousTransplant,
                comorbidities: values.comorbidities,
                current_medications: values.currentMedications,
                treating_in_hospital: values.treatingInHospital,
                insurance_details: values.insuranceDetails,
                hospital_id: Number(hospitalId),
            };
            console.log("Request Body: ", requestBody);

            const res = await axios.post(routes.addPatient, requestBody);
            if (res.status === 200 || res.status === 201) {
                console.log("Response: ", res?.data);
                form.reset();
                toast({
                    variant: "success",

                    title: "Added",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Friday, February 10, 2023 at 5:57 PM",
            });
        }
    };
    const [hospital, setHospital] = useState([
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
                setHospital(response.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        getHospital();
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-7xl space-y-4 p-4"
            >
                <H2>Personal Information</H2>
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Kankan Mondal"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-4">
                    {/* Date of Birth */}
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem className="flex flex-col py-[10px]">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={`pl-3 font-normal ${!field.value && "text-muted-foreground"}`}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value!}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Weight */}
                    <FormField
                        control={form.control}
                        name="weightInKg"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight (in kg)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="60"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Height */}
                    <FormField
                        control={form.control}
                        name="heightInCm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Height (in cm)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="170"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <H2>Contact Information</H2>
                <div className="grid grid-cols-3 gap-4">
                    {/* Location */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Kolkata, West Bengal"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Zip Code */}
                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="700001"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="9876543210"
                                        type="tel"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="harry@hogwarts.com"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <H2>Medical Information</H2>
                <FormField
                    control={form.control}
                    name="primaryDiagnosis"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Diagnosis</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Type your primary diagnosis here"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Blood Grp */}

                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Blood Group</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Patient's Blood Group" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {patientSchema.shape.bloodType.options.map(
                                            (bloodGroup) => {
                                                return (
                                                    <SelectItem
                                                        key={bloodGroup}
                                                        value={bloodGroup}
                                                    >
                                                        {bloodGroup}
                                                    </SelectItem>
                                                );
                                            },
                                        )}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Organ Needed */}
                    <FormField
                        control={form.control}
                        name="organNeeded"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organ Needed</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Organ Needed" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {patientSchema.shape.organNeeded.options.map(
                                            (organ) => {
                                                return (
                                                    <SelectItem
                                                        key={organ}
                                                        value={organ}
                                                    >
                                                        {organ}
                                                    </SelectItem>
                                                );
                                            },
                                        )}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Previous Transplants */}
                    <FormField
                        control={form.control}
                        name="previousTransplant"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Previous Transplant</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Previous Transplant"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Priority Status */}
                <FormField
                    control={form.control}
                    name="priorityStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority Status</FormLabel>
                            <FormControl>
                                <Controller
                                    name="priorityStatus"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Slider
                                            min={1}
                                            max={10}
                                            value={[field.value]}
                                            onValueChange={(value) =>
                                                field.onChange(value[0])
                                            }
                                            step={0.1}
                                        />
                                    )}
                                ></Controller>
                            </FormControl>
                            <FormDescription>
                                1 being the lowest and 10 being the highest.{" "}
                                <strong>
                                    Current Value:{" "}
                                    <span className="text-primary">
                                        {priorityStatus}
                                    </span>
                                </strong>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Medical History */}
                <FormField
                    control={form.control}
                    name="medicalHistory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Medical History</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Diabetes" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="comorbidities"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comorbidities</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Hypertension, obesity"
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
                    name="currentMedications"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Medications</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Metformin, Insulin"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* HLA and PRScore */}
                <div className="grid grid-cols-6 gap-4">
                    <FormField
                        control={form.control}
                        name="hlaTest.hlaA"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>HLA A</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="HLA A"
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
                        name="hlaTest.hlaB"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>HLA B</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="HLA B"
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
                        name="hlaTest.hlaC"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>HLA C</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="HLA C"
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
                        name="hlaTest.hlaDRB1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>HLA DRB1</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="HLA DRB1"
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
                        name="hlaTest.hlaDQB1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>HLA DQB1</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="HLA DQB1"
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
                        name="praScore"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PRA Score</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="PRA Score"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* <div> */}
                {/* <FormField
                    control={form.control}
                    name="treatingInHospital"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Treating In Hospital</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Treating In Hospital"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name="treatingInHospital"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Treating In hospital</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                "text-muted-foreground",
                                            )}
                                        >
                                            {field.value
                                                ? hospital.find(
                                                    (item) =>
                                                        item.name ===
                                                        field.value,
                                                )?.name
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
                                                {hospital.map((item) => (
                                                    <CommandItem
                                                        value={item.name}
                                                        key={item.id}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "treatingInHospital",
                                                                item.name,
                                                            );
                                                        }}
                                                    >
                                                        {item.name}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                item.name ===
                                                                    field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0",
                                                            )}
                                                        />
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
                    name="insuranceDetails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Insurance Details</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Insurance Details"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* </div> */}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default PatientForm;

// Patient Form:
// - Name (input)
// - Blood Type (select: A+, A-, B+, B-, AB+, AB-, O+, O-)
// - Organ Needed (select: heart, kidney, liver, etc.)
// - Priority Status (select: 1-10)
// - Location (input)
// - Medical History (textarea)
// - Submit Button
