import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { showStaffList } from "../../services/staffService";
import { getCustomers } from "../../services/userService";
import { addNewAppointment, deleteAppointment, editAppointment, getAllAppointments } from "../../services/appointmentService";
import { getAllService } from "../../services/beautyTreatmentService";
import FullScreenLoader from "../../components/FullScreenLoader";

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStaff();
        fetchCustomer();
        fetchAppointments();
        fetchServices();
    }, []);

    const fetchCustomer = async () => {
        try {
            const res = await getCustomers();
            setCustomerList(res);

        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await getAllService();
            setServiceList(res);

        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchAppointments = async () => {
        setLoading(true)
        try {
            const res = await getAllAppointments();
            setAppointments(res);

        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false)
        }
    };

    const fetchStaff = async () => {
        try {
            const res = await showStaffList();
            setStaffList(res);

        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    const todayDate = new Date().toISOString().split("T")[0];

    const getMinTime = () => {
        const now = new Date();
        now.setHours(now.getHours() + 1); // add 1 hour
        return now.toTimeString().slice(0, 5); // returns "HH:mm"
    };

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [estimatedTime, setEstimatedTime] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);
    const [newAppointment, setNewAppointment] = useState({
        userId: "",
        services: [],
        staffId: "",
        appointmentDate: todayDate,
        appointmentTime: getMinTime(),
        estimatedTimeToComplete: estimatedTime,
        status: "Pending",
    });

    const addDurations = (durations) => {
        let totalMinutes = 0;

        durations.forEach(duration => {
            const hrMatch = duration.match(/(\d+)\s*hr/);
            const minMatch = duration.match(/(\d+)\s*min/);

            const hours = hrMatch ? parseInt(hrMatch[1]) : 0;
            const minutes = minMatch ? parseInt(minMatch[1]) : 0;

            totalMinutes += (hours * 60 + minutes);
        });

        const hrs = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;

        if (hrs && mins) return `${hrs} hr ${mins} min`;
        if (hrs) return `${hrs} hr`;
        return `${mins} min`;
    };

    // const filteredAppointments = appointments.filter(
    //     (a) =>
    //         a.client.toLowerCase().includes(search.toLowerCase()) ||
    //         a.service.toLowerCase().includes(search.toLowerCase())
    // );

    const handleEdit = (appointment) => {
        const selectedServices = Array.isArray(appointment.services) ? appointment.services : [];
        const matchedServices = serviceList.filter(s => selectedServices.includes(s.name));
        const selectedDurations = matchedServices.map(s => s.duration);
        const total = addDurations(selectedDurations);

        setIsEditMode(true);
        setEditingAppointmentId(appointment.id);

        setNewAppointment({
            userId: appointment.userId,
            services: selectedServices,
            staffId: appointment.staffId,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            estimatedTimeToComplete: total,
            status: appointment.status,
        });

        setEstimatedTime(total);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (
            !newAppointment.userId ||
            !newAppointment.services ||
            !newAppointment.staffId ||
            !newAppointment.appointmentDate ||
            !newAppointment.appointmentTime
        ) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true)
        try {
            const payload = {
                ...newAppointment,
                estimatedTimeToComplete: estimatedTime,
            };

            if (isEditMode) {
                await editAppointment(editingAppointmentId, payload);
            } else {
                await addNewAppointment(payload);
            }

            // Reset form
            setShowModal(false);
            setNewAppointment({
                userId: "",
                services: [],
                staffId: "",
                appointmentDate: todayDate,
                appointmentTime: getMinTime(),
                estimatedTimeToComplete: "",
                status: "Pending",
            });
            setEstimatedTime("");
            setIsEditMode(false);
            setEditingAppointmentId(null);
            fetchAppointments();
        } catch (error) {
            console.error("Error saving appointment:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setNewAppointment({
            userId: "",
            services: [],
            staffId: "",
            appointmentDate: todayDate,
            appointmentTime: getMinTime(),
            estimatedTimeToComplete: "",
            status: "Pending",
        });
        setEstimatedTime("");
        setIsEditMode(false);
        setEditingAppointmentId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            setLoading(true)
            try {
                const payload = {
                    id: id
                };
                await deleteAppointment(payload);
            } catch (error) {
                console.error("Error while deleting appointment:", error);
            } finally {
                setLoading(false)
            }
            setAppointments(appointments.filter((a) => a.id !== id));
        }
    };

    return (
        <div className="p-4">
            {loading && <FullScreenLoader />}
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage Appointments</h2>
                <button
                    className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Add Appointment
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by client or service..."
                className="border p-2 rounded w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Appointment Id</th>
                            <th className="border p-2">Client</th>
                            <th className="border p-2">Service</th>
                            <th className="border p-2">Staff</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Arrival Time</th>
                            <th className="border p-2">Estimated Completion Time</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments?.map((a) => (
                            <tr key={a?.id}>
                                <td className="border text-center p-2">{a?.appointmentId}</td>
                                <td className="border text-center p-2">{a?.userName}</td>
                                <td className="border text-center p-2 whitespace-pre-line">
                                    {Array.isArray(a?.services)
                                        ? a.services.map((s, index) => (
                                            <div key={index}>{s}</div>
                                        ))
                                        : a.services}
                                </td>
                                <td className="border text-center p-2">{a?.staffName}</td>
                                <td className="border text-center p-2">{a?.appointmentDate}</td>
                                <td className="border text-center p-2">{a?.appointmentTime}</td>
                                <td className="border text-center p-2">{a?.estimatedTimeToComplete}</td>
                                <td className="border text-center p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm ${a.status === "Confirmed"
                                            ? "bg-green-500"
                                            : a?.status === "Pending"
                                                ? "bg-yellow-500"
                                                : "bg-gray-500"
                                            }`}
                                    >
                                        {a?.status}
                                    </span>
                                </td>
                                <td className="border p-2 flex gap-2 justify-center">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleEdit(a)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(a.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {appointments?.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    No appointments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal with Animation */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white rounded shadow-lg p-6 w-96 animate-scaleFade">
                        <h3 className="text-xl font-bold mb-4">
                            {isEditMode ? "Edit" : "Add"} Appointment</h3>

                        <Autocomplete
                            fullWidth
                            options={customerList}
                            getOptionLabel={(option) => option.name}
                            value={customerList.find(c => c.userId === newAppointment.userId) || null}
                            onChange={(e, newValue) =>
                                setNewAppointment({ ...newAppointment, userId: newValue ? newValue.userId : "" })
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Client" margin="normal" />
                            )}
                        />

                        <Autocomplete
                            multiple
                            fullWidth
                            options={serviceList}
                            getOptionLabel={(option) => option.name}
                            value={serviceList.filter(s => newAppointment.services.includes(s.name))}
                            onChange={(e, newValue) => {
                                const selectedNames = newValue.map(s => s.name);
                                const selectedDurations = newValue.map(s => s.duration);
                                const total = addDurations(selectedDurations);

                                setNewAppointment({ ...newAppointment, services: selectedNames, estimatedTimeToComplete: total });
                                setEstimatedTime(total);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Service(s)" margin="normal" />
                            )}
                        />

                        {estimatedTime && (
                            <div className="text-sm text-gray-700 mt-2">
                                <strong>Estimated Duration to complete task:</strong><br /> <b>{estimatedTime}</b>
                            </div>
                        )}

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Stylist</InputLabel>
                            <Select
                                value={newAppointment.staffId}
                                label="Staff"
                                onChange={(e) =>
                                    setNewAppointment({ ...newAppointment, staffId: e.target.value })
                                }
                            >
                                {
                                    staffList?.map((staff) => (
                                        <MenuItem value={staff?.staffId}>{staff?.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Date"
                            type="date"
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={newAppointment.appointmentDate}
                            onChange={(e) =>
                                setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })
                            }
                            inputProps={{
                                min: todayDate,
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Time"
                            type="time"
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={newAppointment.appointmentTime}
                            onChange={(e) =>
                                setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })
                            }
                            inputProps={{
                                min:
                                    newAppointment.appointmentTime === todayDate
                                        ? getMinTime()
                                        : undefined,
                            }}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={newAppointment.status}
                                label="Status"
                                onChange={(e) =>
                                    setNewAppointment({ ...newAppointment, status: e.target.value })
                                }
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Confirmed">Confirmed</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                            </Select>
                        </FormControl>

                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleSave}
                            >
                                {isEditMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tailwind Animation */}
            <style>{`
        @keyframes scaleFade {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scaleFade {
          animation: scaleFade 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default ManageAppointments;