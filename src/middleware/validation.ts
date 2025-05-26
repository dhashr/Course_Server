import { Request, Response, NextFunction } from "express";
const { body, validationResult } = require('express-validator');

//add user validation
export const validateUserInput = [
    body('username').trim().escape().notEmpty().withMessage('Username is required'),
    body('email').normalizeEmail().isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('role').optional().isIn(['Admin']).withMessage('Invalid admin role'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc: Record<string, string>, error: Record<string, string>) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res.status(400).json({
                status: 400,
                message: 'Validation failed',
                errors: formattedErrors,
            });
        }
        next();
    },
];

//userLogin Validate
export const validateUserLoginInput = [
    body('email').normalizeEmail().isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc: Record<string, string>, error: Record<string, string>) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res.status(400).json({
                status: 400,
                message: 'Validation failed',
                errors: formattedErrors,
            });
        }
        next();
    },
];

export const ReportValidation = [
    body('sampleId').isString().notEmpty().withMessage("Sample ID is required"),
    body('testId').isString().notEmpty().withMessage("Test ID is required"),
    body('pathologistId').isString().notEmpty().withMessage("Pathologist ID is required"),
    body('patientId').isString().notEmpty().withMessage("Patient ID is required"),
    body('diagnosis').isString().notEmpty().withMessage("Diagnosis result is required"),
    body('reportDate').isDate().notEmpty().withMessage("Reporte Date is required"),
    body('signed').isBoolean().notEmpty().withMessage("Signed is required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc: Record<string, string>, error: Record<string, string>) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res.status(400).json({
                status: 400,
                message: 'Validation Failes',
                error: formattedErrors
            })
        }
        next();
    }

]

//Validation for Test
export const validateTest = [
    body("type")
        .notEmpty().withMessage("Type is required")
        .isIn(["insert", "update", "delete", "get"]).withMessage("Type is Required"),

    body("sampletestId")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("sampletestId"),

    body("patientId")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("patientId is required"),

    body("result")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("result is required"),

    body("sampletestId")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("result is required"),

    body("id")
        .if(body("type").isIn(["update", "delete"]))
        .notEmpty().withMessage("ID is required"),

    body("testName")
        .if(body("type").equals("update"))
        .notEmpty().withMessage("testName is required"),

    body("page")
        .if(body("type").isIn("update"))
        .notEmpty().withMessage("page is required"),

    body("limit")
        .if(body("type").equals("get"))
        .notEmpty().withMessage("limit is required")
];

//Validation for Patient
export const validatePatient = [
    body("type")
        .notEmpty().withMessage("Type is required")
        .isIn(["insert", "update", "delete", "get"]).withMessage("Type is Required"),

    body("name")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("Name is required"),

    body("gender")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("Gender is required"),

    body("contactNumber")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("contactNumber is required"),

    body("email")
        .if(body("type").equals("insert"))
        .notEmpty().withMessage("email is required"),

    body("id")
        .if(body("type").isIn(["update", "delete"]))
        .notEmpty().withMessage("ID is required"),

    body("limit")
        .if(body("type").equals("get"))
        .notEmpty().withMessage("limit is required")
];

export const addCourseValidation = [
    body('title').trim().escape().notEmpty().withMessage('Title is required'),
    body('description').trim().escape().notEmpty().withMessage('Description is required'),
    body('coursepdf').trim().escape().notEmpty().withMessage('CoursePdf is required'),
    body('recurring').optional().isIn(['weekly', 'monthly', 'yearly']).withMessage('Invalid Recurring'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc: Record<string, string>, error: Record<string, string>) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res.status(400).json({
                status: 400,
                message: 'Validation failed',
                errors: formattedErrors,
            });
        }
        next();
    },
];