import API from "../utils/apiDetails";

export const addNewAppointment = async (appointmentData) => {
    const response = await API.post('/appointment/add-appointment', appointmentData);
    return response.data;
};

export const getAllAppointments = async () => {
    const response = await API.post('/appointment/get-all-appointments');
    return response.data;
};

export const editAppointment = async (id, appointmentData) => {
    const response = await API.put(`/appointment/edit-appointment/${id}`, appointmentData);
    return response.data;
};

export const deleteAppointment = async (appointmentData) => {
    const response = await API.delete('/appointment/delete-appointment', appointmentData);
    return response.data;
};