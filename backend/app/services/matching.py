from sqlalchemy.orm import Session
from .. import models
from typing import List

class MatchingService:
    @staticmethod
    def calculate_match_score(organ: models.Organ, patient: models.Patient) -> float:
        score = 0
        
        # Blood type compatibility
        if organ.blood_type == patient.blood_type:
            score += 0.4
            
        # Priority status (0-1 scaled)
        score += (patient.priority_status / 10) * 0.6
        
        return round(score, 2)

    @staticmethod
    def find_matches(organ: models.Organ, db: Session) -> List[dict]:
        # Find all waiting patients that need this organ type
        potential_patients = db.query(models.Patient).filter(
            models.Patient.organ_needed == organ.type,
            models.Patient.status == "waiting"
        ).all()
        
        matches = []
        for patient in potential_patients:
            score = MatchingService.calculate_match_score(organ, patient)
            if score > 0:
                matches.append({
                    "patient": patient,
                    "score": score
                })
        
        # Sort by score
        matches.sort(key=lambda x: x["score"], reverse=True)
        return matches