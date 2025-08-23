import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { addService, getAllService } from '../../services/beautyTreatmentService';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);

    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const [newService, setNewService] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
    });

    useEffect(() => {
        fetchService();
    }, []);

    const fetchService = async () => {
        try {
            const res = await getAllService();
            setServices(res);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddOrUpdate = async () => {
        if (!newService.name || !newService.duration) {
            alert('Please fill all required fields.');
            return;
        }

        try {
            if (editingService) {
                // await editStaff(formData?.id, formData);
            } else {
                await addService(newService);
            }
            fetchService();
            handleClose();
        } catch (error) {
            console.error("Error saving service:", error);
        }

        setShowModal(false);
        setEditingService(null);
        setNewService({ name: '', description: '', price: '', duration: '' });
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setNewService({
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration,
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(service => service.id !== id));
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingService(null);
        setNewService({ name: '', description: '', price: '', duration: '' });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Service Management</h2>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FaPlus />}
                    onClick={() => setShowModal(true)}
                >
                    Add Service
                </Button>
            </div>

            <TextField
                label="Search service..."
                variant="outlined"
                fullWidth
                className="mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Description</th>
                            {/* <th className="border p-2">Price ($)</th> */}
                            <th className="border p-2">Duration</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.map(service => (
                            <tr key={service.id}>
                                <td className="border text-center p-2">{service.name}</td>
                                <td className="border text-center p-2">{service.description}</td>
                                {/* <td className="border text-center p-2">{service.price}</td> */}
                                <td className="border text-center p-2">{service.duration}</td>
                                <td className="border p-2 flex gap-2 justify-center">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleEdit(service)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(service.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredServices.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No services found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            <Dialog open={showModal} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Service Name"
                        variant="outlined"
                        margin="normal"
                        value={newService.name}
                        onChange={(e) =>
                            setNewService({ ...newService, name: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        value={newService.description}
                        onChange={(e) =>
                            setNewService({ ...newService, description: e.target.value })
                        }
                    />
                    {/* <TextField
            fullWidth
            label="Price"
            type="number"
            variant="outlined"
            margin="normal"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: e.target.value })
            }
          /> */}
                    <TextField
                        fullWidth
                        label="Duration"
                        placeholder="e.g., 30 mins"
                        variant="outlined"
                        margin="normal"
                        value={newService.duration}
                        onChange={(e) =>
                            setNewService({ ...newService, duration: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleAddOrUpdate} variant="contained" color="primary">
                        {editingService ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServiceManagement;