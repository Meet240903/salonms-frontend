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
import { addStaff, deleteStaff, editStaff, getCustomers, showStaffList } from "../../services/userService";

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

const CustomerList = () => {
    const [customerList, setCustomerList] = useState([]);

    // Fetch staff list on load
    useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchCustomer = async () => {
        try {
            const res = await getCustomers();
            setCustomerList(res);

        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Customers</h2>
            </div>

            {/* Staff Table */}
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerList?.map((cust) => (
                            <TableRow key={cust.id}>
                                <TableCell>{cust.userId}</TableCell>
                                <TableCell>{cust.name}</TableCell>
                                <TableCell>{cust.email}</TableCell>
                                <TableCell>{cust.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomerList;