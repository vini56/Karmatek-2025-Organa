import google.generativeai as genai
from ..config import settings

# Configure Gemini AI
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

class AIService:
    @staticmethod
    async def analyze_medical_compatibility(organ_data: dict, patient_data: dict):
        """
        Analyzes the compatibility of an organ for a patient based on blood type, medical history, and priority.
        """
        prompt = f"""
        Analyze organ donation compatibility based on:

        Organ Details:
        - Type: {organ_data.get('type', 'Unknown')}
        - Blood Type: {organ_data.get('blood_type', 'Unknown')}

        Patient Details:
        - Blood Type: {patient_data.get('blood_type', 'Unknown')}
        - Medical History: {patient_data.get('medical_history', 'Unknown')}
        - Priority Status: {patient_data.get('priority_status', 'Unknown')}

        Provide a compatibility score (0-1) and key factors affecting the match.
        """

        try:
            response = await model.generate_content(prompt)
            return response.text if response else "No response received from AI model."
        except Exception as e:
            return f"Error in AI analysis: {str(e)}"

    @staticmethod
    async def prioritize_patient(patient_data: dict):
        """
        Analyzes the priority of a patient for organ transplant based on medical history, condition, and waiting time.
        """
        prompt = f"""
        Analyze patient priority for organ transplant based on:
        - Medical History: {patient_data.get('medical_history', 'Unknown')}
        - Current Status: {patient_data.get('status', 'Unknown')}
        - Waiting Time: {patient_data.get('created_at', 'Unknown')}

        Suggest a priority score (1-10) and provide key factors.
        """

        try:
            response = await model.generate_content(prompt)
            return response.text if response else "No response received from AI model."
        except Exception as e:
            return f"Error in AI prioritization: {str(e)}"
