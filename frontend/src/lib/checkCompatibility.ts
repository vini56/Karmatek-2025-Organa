type Organ = {
    organ_type: string;
    donor_blood_type: string;
    donor_age: number;
    donor_gender: string;
    hla_a?: string;
    hla_b?: string;
    hla_c?: string;
    hla_drb1?: string;
    hla_dqb1?: string;
};

type Patient = {
    id: number | string;
    name: string;
    blood_type: string;
    organ_needed: string;
    priority_status: number;
    hla_test?: {
        hla_a?: string;
        hla_b?: string;
        hla_c?: string;
        hla_drb1?: string;
        hla_dqb1?: string;
    };
    location: string;
    gender: string;
    age: number;
    score?: number;
};

function checkCompatibility(
    organ: Organ,
    patients: Patient[],
): { patient: Patient; score: number }[] {
    return patients.map((patient) => {
        let score = 0;

        // Blood type compatibility (assume universal donor/recipient rules)
        if (
            organ.donor_blood_type === patient.blood_type ||
            patient.blood_type === "AB"
        ) {
            score += 30; // Blood type match is critical
        }

        // Organ type match
        if (organ.organ_type === patient.organ_needed) {
            score += 20;
        }

        // HLA typing match
        const hlaMatches = [
            "hla_a",
            "hla_b",
            "hla_c",
            "hla_drb1",
            "hla_dqb1",
        ].reduce((matches, hlaKey) => {
            if (
                organ[hlaKey as keyof Organ] &&
                patient.hla_test?.[hlaKey as keyof Patient["hla_test"]] ===
                    organ[hlaKey as keyof Organ]
            ) {
                return matches + 1;
            }
            return matches;
        }, 0);
        score += hlaMatches * 5; // Each HLA match adds 5 points

        // Priority status
        score += patient.priority_status * 10; // Priority status is scaled up

        // Gender match (optional, but can factor into some organ types)
        if (organ.donor_gender === patient.gender) {
            score += 5;
        }

        // Age proximity (younger donors for younger patients, older donors for older patients)
        const ageDifference = Math.abs(organ.donor_age - patient.age);
        if (ageDifference <= 10) {
            score += 10;
        } else if (ageDifference <= 20) {
            score += 5;
        }

        // Return patient with their calculated score
        return {
            patient: patient,
            score: Math.min(score, 100),
        }; // Cap score at 100
    });
}

export default checkCompatibility;
