import bcrypt from 'bcrypt';

let saltRounds = 12;

//for encryptPassword 
export const encryptPassword = async (plainTextPassword: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainTextPassword, salt);
        return hash;
    } catch (error) {
        console.error("Error encrypting password:", error);
        throw new Error("Failed to encrypt password");
    }
};

// for comparePassword 
export const comparePassword = async (plainTextPassword: string, hashedPasswordFromDatabase: string): Promise<boolean> => {
    try {
        const match = await bcrypt.compare(plainTextPassword, hashedPasswordFromDatabase);
        return match;
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};

 