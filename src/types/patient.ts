export interface IPatient {
    name: string,
    dob: Date,
    gender: "Male" | "female",
    contactNumber: number,
    address: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
    isDelete?: Boolean,
}
