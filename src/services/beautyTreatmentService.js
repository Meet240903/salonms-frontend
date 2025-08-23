import API from "../utils/apiDetails";

export const addService = async (serviceData) => {
  const response = await API.post('/services/add-service', serviceData);
  return response.data;
};

export const getAllService = async () => {
  const response = await API.post('/services/list-all-services');
  return response.data;
};