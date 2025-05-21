import express, { Request, Response } from 'express';
import { IPatient } from '../types/patient';
import { patient } from '../Model/PatientModel';
import { paginationAndSearch } from '../helper/PagenationAndSearch';

export const PatientCrud = async (req: Request, res: Response) => {
    try {
        let { type } = req.query;
        let { name, dob, gender, contactNumber, address, email, page, limit, search = "", id, _id } = req.body;

        if (type === 'insert') {
            // Basic email validation
            let existingUser = await patient.find({ email })
            if (existingUser.length > 0) {
                res.json({ status: true, message: "Patient Already Exists" });
                res.end();
                return;
            }
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ status: false, message: "Invalid email format" });
                return
            }
            const newPatient: IPatient = new patient({
                name,
                dob,
                gender,
                contactNumber,
                address,
                email,
            });

            const savedPatient = await patient.insertOne(newPatient);
            if (savedPatient) {
                res.status(201).json({ status: true, message: 'Patient Added Successfully' });
            } else {
                res.status(500).json({ status: false, message: 'Patient Not Added Successfully' });
            }
        } else if (type === 'update') {
            const updatePatient = await patient.findByIdAndUpdate(
                id || _id,
                {
                    $set: {
                        name,
                        dob,
                        gender,
                        contactNumber,
                        address,
                        email,
                        updatedAt: new Date(),
                    },
                },
                { new: true, runValidators: true }
            );

            if (!updatePatient) {
                res.status(404).json({ status: false, message: 'Patient Not Found' });
                return;
            }
            res.status(200).json({ status: true, message: 'Patient Updated Successfully' });
        } else if (type === 'delete') {
            const deletedPatient = await patient.findByIdAndUpdate(
                id || _id,
                { $set: { isDelete: true, updatedAt: new Date() } },
                { new: true, runValidators: true }
            );

            if (!deletedPatient) {
                res.status(404).json({ status: false, message: 'Patient Not Found' });
                return;
            }
            res.status(200).json({ status: true, message: 'Patient Deleted Successfully' });
        } else if (type === 'get') {
            let finalData;
            if (page !== undefined && limit !== undefined && search !== undefined) {
                finalData = await paginationAndSearch({
                    page: Number(page),
                    limit: Number(limit),
                    searchFields: ['name', 'email', 'address'],
                    searchKeyword: String(search),
                    model: patient,
                    filter: { isDelete: false },
                });
            } else {
                const allPatients = await patient.find({ isDelete: false }).lean();
                finalData = {
                    data: allPatients,
                    total: allPatients.length,
                    page: 1,
                    limit: allPatients.length,
                    totalPages: 1,
                };
                console.log('Fetching all patients (pagination/search parameters missing)');
            }
            res.status(200).json({ status: true, ...finalData });
        } else {
            res.status(400).json({ status: false, message: 'Type is Required' });
        }
    } catch (error: any) {
        res.status(500).json({ status: false, message: 'Add Patient Catch Error', error: error.message });
    }
};




