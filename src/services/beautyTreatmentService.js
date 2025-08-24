import API from "../utils/apiDetails";

export const addService = async (serviceData) => {
    const response = await API.post('/services/add-service', serviceData);
    return response.data;
};

export const editService = async (id, serviceData) => {
    const response = await API.put(`/services/edit-service/${id}`, serviceData);
    return response.data;
};

export const deleteService = async (serviceData) => {
    const response = await API.delete('/services/delete-service',
        {
            data: serviceData
        }
    );
    return response.data;
};

export const getAllService = async () => {
    const response = await API.post('/services/list-all-services');
    return response.data;
};