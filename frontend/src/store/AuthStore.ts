import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type HlaTest = {
    hlaA: string;
    hlaB: string;
    hlaC: string;
    hlaDQB1: string;
    hlaDRB1: string;
};

type PatientData = {
    name: string;
    blood_type: string;
    organ_needed: string;
    priority_status: number;
    location: string;
    zip_code: number;
    medical_history: string;
    date_of_birth: string;
    gender: string;
    weight_in_kg: number;
    height_in_cm: number;
    email: string;
    phone_number: string;
    primary_diagnosis: string;
    hla_test: HlaTest;
    pra_score: number;
    previous_transplant: number;
    comorbidities: string;
    current_medications: string;
    treating_in_hospital: string;
    insurance_details: string;
    id: number;
    status: string;
    created_at: string;
};

type RecipientData = {
    organ_type: string;
    recovery_date: string;
    expected_preservation_time: number;
    donor_age: number;
    donor_blood_type: string;
    donor_gender: string;
    cause_of_death: string;
    organ_size: string;
    organ_condition_rating: string;
    hla_a: string;
    hla_b: string;
    hla_c: string;
    hla_drb1: string;
    hla_dqb1: string;
    donor_hospital: string;
    current_location: string;
    transport_arrangements: string;
    medical_history: string;
    viral_testing_status: string;
    organ_biopsy_results: string;
    location: string;
    status: string;
    hospital_id: number;
};

type Notification = {
    title: string;
    description: string;
    date: string;
    patientData: PatientData;
    recipientData: RecipientData;
};

type User = {
    email?: string;
    staffId?: string;
    hospitalName?: string;
    notifications?: Notification[];
    accessToken?: string;
};

interface UserState {
    user?: User;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
    addNotification: (notification: Notification) => void;
    removeNotification: (index: number) => void;
    notifications?: Notification[];
}

const useAuth = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: {
                    email: "",
                    staffId: "",
                    hospitalName: "",
                    accessToken: "",
                    notifications: [],
                },
                isLoggedIn: false, // Authentication status

                // Action to log in a user
                login: (userData: User) =>
                    set({
                        user: userData,
                        isLoggedIn: true,
                    }),

                // Action to log out a user
                logout: () =>
                    set({
                        user: {
                            email: "",
                            staffId: "",
                            hospitalName: "",
                            accessToken: "",
                            notifications: [],
                        },
                        isLoggedIn: false,
                    }),

                // Action to add a notification
                addNotification: (notification: Notification) =>
                    set((state) => ({
                        user: {
                            ...state.user,
                            notifications: [
                                ...(state.user?.notifications || []),
                                notification,
                            ],
                        },
                    })),
                removeNotification: (index: number) =>
                    set((state) => {
                        const notifications = state.user?.notifications || [];
                        notifications.splice(index, 1);
                        return {
                            user: {
                                ...state.user,
                                notifications,
                            },
                        };
                    }),
            }),
            {
                name: "user-storage",
            },
        ),
    ),
);

export default useAuth;
