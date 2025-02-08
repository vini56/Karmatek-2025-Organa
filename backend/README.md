# Setup

## Requirements

- Python (`python --version`)   
- Pip (`pip --version`)

## Create A Virtual Environment

```py
cd backend
python -m venv venv
```

## Activate The Virtual Env

```py
./venv/Scripts/activate
```

## Install All the dependencies

```
pip install -r requirements.txt
```

## Run the developmen server

```
uvicorn app.main:app --reload
```
OR
```
fastapi dev app/main.py
```

## Deactivate The Virtual Env

```
deactivate
```


## Authenticaltion routes

POST /api/auth/register

-   Register new hospital staff/admin
-   Body: { email, password, hospital_name, role }

POST /api/auth/login

-   Login user
-   Body: { email, password }
-   Returns: JWT token

## Patient routes

POST /api/patients/

-   Create new patient
-   Body: { name, blood_type, organ_needed, priority_status, location, medical_history }

GET /api/patients/

-   Get all patients
-   Protected: Requires JWT

GET /api/patients/{id}

-   Get specific patient
-   Protected: Requires JWT

PUT /api/patients/{id}

-   Update patient details
-   Body: { priority_status?, status?, medical_history? }
-   Protected: Requires JWT

## Organ routes

POST /api/organs/

-   Register new organ
-   Body: { type, blood_type, location }
-   Protected: Requires JWT

GET /api/organs/

-   Get all available organs
-   Protected: Requires JWT

PUT /api/organs/{id}

-   Update organ status/location
-   Body: { status?, location? }
-   Protected: Requires JWT

## Matching routes

GET /api/matching/organ/{organ_id}/matches

-   Get potential matches for an organ
-   Protected: Requires JWT
-   Returns: List of matches with scores

POST /api/matching/approve/{match_id}

-   Approve a match
-   Protected: Requires JWT
-   Updates both organ and patient status

schemas define the data validation and serialization for your API using Pydantic.

Each schema file (organ.py, patient.py, user.py) follows a clean structure:

Base schema (OrganBase, PatientBase, UserBase) for shared attributes.
Create schema (OrganCreate, PatientCreate, UserCreate) for data input during creation.
Out schema (OrganOut, PatientOut, UserOut) for responses.
Update schema (OrganUpdate, PatientUpdate) for partial updates.
This setup looks solid. Let me know if you run into validation or serialization issues later!
