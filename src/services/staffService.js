import API from "../utils/apiDetails";

export const addStaff = async (staffData) => {
  const response = await API.post('/staff/add-staff', staffData);
  return response.data;
};

export const editStaff = async (id, staffData) => {
  const response = await API.put(`/staff/edit-staff/${id}`, staffData);
  return response.data;
};

export const deleteStaff = async (staffData) => {
  const response = await API.delete('/staff/delete-staff',
    {
      data: staffData
    }
  );
  return response.data;
};

export const showStaffList = async () => {
  const response = await API.post('/staff/show-staff-list');
  return response.data;
};