import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import  UserModel  from "@/lib/model/User";
import bcrypt from "bcryptjs";


// Ensure the database is connected
const LoadDb = async () => {
    await ConnectDB();
};
LoadDb();

// Define TypeScript types for FormData values
interface UserData {
   name: string ,
   email: string ,
   password: string
}

// POST request handler with TypeScript
export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const userData: UserData = {
            name: formData.get("name")?.toString() || "",
            email: formData.get("email")?.toString() || "",
            password: formData.get("password")?.toString() || "",
            
        };

      // Validate required fields
      if (!userData.name || !userData.email || !userData.password) {
        return NextResponse.json({ error: "Missing required Form fields" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Replace plain password with hashed password
        userData.password = hashedPassword;



        // Save blog data to the database
        await UserModel.create(userData);
        console.log("User Created successfully");

        return NextResponse.json({ success: true, msg: "User Created Successfully" });
    } catch (error) {

        console.error("Error processing user creation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });    }
}


