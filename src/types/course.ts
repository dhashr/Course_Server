

export enum recurring {
    monthly = "monthly",
    yearly = "yearly",
    weekly = 'weekly'
}


export interface course {
    // courseCode: string;
    coursepdf: string;
    title: string;
    description: string;
    recurring: recurring;
    isActive: boolean;
    cratedAt: Date;
    updatedAt: Date
}