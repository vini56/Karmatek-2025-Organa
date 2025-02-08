const origin = "http://localhost:8000/api";

const routes = {
    addHospital: `${origin}/hospitals/`,
    getHospitals: `${origin}/hospitals/`,
    addPatient: `${origin}/patients/`,
    addOrgan: `${origin}/organs/`,
    login: `${origin}/auth/login/`,
    addStaff: `${origin}/register/staff`,
    getPatients: `${origin}/patients`,
};
export default routes;
