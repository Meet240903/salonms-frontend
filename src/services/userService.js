import API from "../utils/apiDetails";

export const addUser = async (userData) => {
  const response = await API.post('/auth/registration/add-user', userData);
  return response.data;
};

export const getCustomers = async (userData) => {
  const response = await API.post('/auth/registration/get-customers');
  return response.data;
};

export const loginWithApi = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  console.log("response data login::", response?.data);

  return response.data;
};
