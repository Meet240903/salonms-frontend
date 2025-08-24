import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,
    Box,
    TextField,
    OutlinedInput,
    Checkbox,
    ListItemText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { addStaff, deleteStaff, editStaff, showStaffList } from "../../services/staffService";
import FullScreenLoader from "../../components/FullScreenLoader";

const roles = [
    "Admin",
    "Manager",
    "Receptionist",
    "Stylist",
    "Beautician",
    "Massage Therapist",
    "Nail Technician",
    "Makeup Artist",
    "Assistant",
    "Cleaner",
];

const StaffManagement = () => {
    const [staffList, setStaffList] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", roles: [] });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch staff list on load
    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const res = await showStaffList();
            setStaffList(res);
            console.log("staffList::", staffList);
            console.log("staffListres::", res);

        } catch (error) {
            console.error("Error fetching staff:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleOpen = (staff = null) => {
        if (staff) {
            const normalized = {
                ...staff,
                roles: Array.isArray(staff.roles)
                    ? staff.roles
                    : (staff.roles ? staff.roles.split(",").map((s) => s.trim()) : []),
            };
            setFormData(normalized);
            setEditing(true);
        } else {
            setFormData({ name: "", email: "", phone: "", roles: [] });
            setEditing(false);
        }
        setOpen(true);
    };

    const handleRemoveRole = (roleToRemove) => {
        setFormData((prev) => ({
            ...prev,
            roles: prev.roles.filter((r) => r !== roleToRemove),
        }));
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ name: "", email: "", phone: "", roles: [] });
        setEditing(false)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        const {
            target: { value },
        } = e;
        setFormData({ ...formData, roles: typeof value === "string" ? value.split(",") : value });
    };

    const handleSave = async () => {
        setLoading(true)
        try {
            if (editing) {
                await editStaff(formData?.id, formData);
            } else {
                await addStaff(formData);
            }
            fetchStaff();
            handleClose();
        } catch (error) {
            console.error("Error saving staff:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff?")) {
            setLoading(true)
            try {
                const staff = {
                    id: id
                };
                console.log("staff 123", staff);

                await deleteStaff(staff);
                fetchStaff();
            } catch (error) {
                console.error("Error deleting staff:", error);
            } finally {
                setLoading(false)
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            {loading && <FullScreenLoader />}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage Staff</h2>
                <button
                    className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition"
                    onClick={() => setOpen(true)}
                >
                    <FaPlus /> Add Staff
                </button>
            </div>

            {/* Staff Table */}
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffList?.map((staff) => (
                            <TableRow key={staff.id}>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.email}</TableCell>
                                <TableCell>{staff.phone}</TableCell>
                                <TableCell>
                                    {Array.isArray(staff.roles)
                                        ? staff.roles.join(", ")
                                        : staff.roles}
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpen(staff)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(staff.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal with Animation */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white rounded shadow-lg p-6 w-100 animate-scaleFade">
                        <h3 className="text-xl font-bold mb-4">
                            {editing ? "Edit Staff" : "Add Staff"}
                            {editing}
                        </h3>
                        <TextField
                            margin="dense"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                        />

                        <FormControl margin="dense" fullWidth className="mb-4">
                            <InputLabel id="roles-label">Roles</InputLabel>
                            <Select
                                labelId="roles-label"
                                id="roles"
                                multiple
                                value={formData.roles}
                                onChange={handleRoleChange}
                                input={<OutlinedInput label="Roles" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                onDelete={() => handleRemoveRole(value)}
                                            />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200,
                                            width: 250,
                                        },
                                    },
                                    disableScrollLock: true,
                                }}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        <Checkbox checked={formData.roles.indexOf(role) > -1} />
                                        <ListItemText primary={role} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div className="flex justify-end gap-2 mt-3">
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
                                {editing ? "Update" : "Save"}
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

export default StaffManagement;