import express, { Request, Response } from 'express';

import { paginationAndSearch } from '../helper/PagenationAndSearch';



//models
import { Course } from '../Model/AddCourseModel';

//types

import { course } from '../types/course'








export const addCousrse = async (req: Request, res: Response) => {
    try {
        let { title, description, recurring ,isActive} = req.body;
        let file = req.file;
        if (!file) {
            res.json({ status: false, message: 'No PDF file provided for the course.' });
        }
        await Course.find({ title }).then(async (existingData) => {
            if (existingData.length > 0) {
                res.json({ status: false, message: "Course Already Added" });
                res.end();
                return
            } else {
                const coursepdf = `${file?.originalname}`;
                let insertObj: course = new Course({
                    title,
                    description,
                    coursepdf,
                    isActive,
                    recurring
                })
                await Course.insertOne(insertObj).then((insertData) => {
                    if (insertData) {
                        res.json({ status: true, message: "Course Added Sucessfully" });
                        res.end();
                        return;
                    } else {
                        res.json({ status: false, message: "Failed to Add Course" });
                        res.end();
                        return;
                    }
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}
export const getAllcourse = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            filter,
            status
        } = req.body;
        const courseSearchFields = ['title', 'description', 'recurring'];
        const courseFilter: Record<string, any> = { ...(filter || {}) }
        if (status === 'active') {
            courseFilter.isActive = true;
        } else if (status === 'inactive') {
            courseFilter.isActive = false;
        }

        const data = await paginationAndSearch({
            searchFields: courseSearchFields,
            searchKeyword: search,
            filter: courseFilter,
            model: Course,
            page: Number(page),
            limit: Number(limit),
        })
        res.json({ status: true, ...data })
    } catch (e) {
        console.log(e)
    }
}


export const editCourese = async (req: Request, res: Response) => {
    try {
        let { _id, description, recurring,isActive } = req.body;
        console.log("req.body",req.body)
        let file = req.file
        await Course.find({ _id }).then(async (existingData) => {
            if (existingData.length == 0) {
                res.json({ status: false, message: "Course Not Found" });
                res.end();
                return
            } else {
                if (file) {
                    const coursepdf = `${file?.originalname}`;
                    await Course.findByIdAndUpdate(_id, { $set: { coursepdf,description, recurring, isActive,updatedAt: new Date } }, {
                        new: true, runValidators: true
                    }).then((updateData) => {
                        if (updateData) {
                            res.json({ status: true, message: "Updated SuccessFully" });
                        } else {
                            res.json({ status: false, message: "Update Course Fail" });
                        }
                    });
                } else {
                    await Course.findByIdAndUpdate(_id, { $set: { description, recurring,isActive, updatedAt: new Date } }, {
                        new: true, runValidators: true
                    }).then((updateData) => {
                        if (updateData) {
                            res.json({ status: true, message: "Updated SuccessFully" });
                        } else {
                            res.json({ status: false, message: "Update Course Fail" });
                        }
                    });
                }
            }
        })
    } catch (e) {
        console.log(e)
        res.json({ status: false, message: "Something Went Wrong in Catch" });
        res.end();
        return;
    }
}