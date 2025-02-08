import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";


const app = express();
app.use(cors());
app.use(json()); // Enable JSON body parsing

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (change for security)
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// API route to trigger a notification
app.post("/send-notification", (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    io.emit("update_matches", { message }); // Broadcast to all connected clients
    res.json({ success: true, message: "Notification sent" });
});

server.listen(4000, () => {
    console.log("Server running on port 4000");

});


// AI

const GEMINI_API_KEY = "AIzaSyDNmJDzrdHX0pAoXT6p0Zc507yPFlbQjwQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ai", async (req, res) => {
    // const prompt = req.body.prompt;
    const patient = req.body.patient;
    const organ = req.body.organ;
    const match = req.body.match;
    const prompt = `
Generate a detailed analysis of the organ transplant match, including patient and organ compatibility, surgical considerations, and expected outcomes:

### Patient Information:
- **Blood Type**: ${patient.blood_type}
- **Priority Status**: ${patient.priority_status}
- **Medical History**: ${patient.medical_history}
- **HLA A**: ${patient.hla_test.hlaA}
- **HLA B**: ${patient.hla_test.hlaB}
- **HLA C**: ${patient.hla_test.hlaC}
- **HLA DRB1**: ${patient.hla_test.hlaDRB1}
- **HLA DQB1**: ${patient.hla_test.hlaDQB1}
- **Comorbidities**: ${patient.comorbidities}
- **Current Medications**: ${patient.current_medications}
- **Weight (kg)**: ${patient.weight_in_kg}
- **Height (cm)**: ${patient.height_in_cm}
- **Date of Birth**: ${patient.date_of_birth}
- **Primary Diagnosis**: {patient.primary_diagnosis}

### Organ Information:
- **Organ Type**: ${organ.organ_type}
- **Donor Age**: ${organ.donor_age}
- **Donor Blood Type**: ${organ.donor_blood_type}
- **Donor Gender**: ${organ.donor_gender}
- **Organ Condition**: ${organ.organ_condition_rating}
- **Recovery Date**: ${organ.recovery_date}
- **HLA A**: ${organ.hla_a}
- **HLA B**: ${organ.hla_b}
- **HLA C**: ${organ.hla_c}
- **HLA DRB1**: ${organ.hla_drb1}
- **HLA DQB1**: ${organ.hla_dqb1}
- **Expected Preservation Time**: ${organ.expected_preservation_time}
- **Viral Testing Status**: ${organ.viral_testing_status}
- **Organ Biopsy Results**: ${organ.organ_biopsy_results}

### Match Details:
- **Organ Needed**: ${patient.organ_needed}
- **Status**: ${match.status}
- **Organ Preservation Status**: ${organ.status}
- **Transportation Arrangements**: ${organ.transport_arrangements}

### Requested Insights:
1. **Compatibility**: How well does the organ match the patient? Is the organ suitable for transplantation given the patient's medical condition and history?
2. **Surgical Complexity**: What are the potential surgical challenges considering the organ's condition, donor details, and patient medical history?
3. **Risk of Rejection**: What are the chances of organ rejection, and what pre-emptive measures can be taken?
4. **Post-Transplant Care**: What is the recommended post-surgical care for the patient, considering medications, immune-suppressants, and regular monitoring?
5. **Prognosis**: What is the expected outcome for the patient, both short-term and long-term, after the transplant?
6. **Additional Considerations**: Are there any other key factors or concerns that need to be addressed regarding this organ transplant match?

Generate the insights based on the data provided above to ensure the best possible outcomes for the patient.

    `;
    const result = await model.generateContent(prompt);
    return res.json({ data:result.response.candidates[0].content.parts[0].text });
    
});

