import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/model/User";
import { cookies } from "next/headers";


interface UserData {
  email: string,
  password: string
}


const LoadDb = async () => {
  await ConnectDB();
};
LoadDb();


export async function POST(request: Request) {

  try {
    const formData = await request.formData();

    const userData: UserData = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",

    };

    if (!userData.email || !userData.password) {
      return NextResponse.json({ error: "Missing required Form fields" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email: userData.email });


    if (!user) {
      return NextResponse.json({ error: "Invalid Email Or Password" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
console.log(isPasswordValid , 'is')
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid Email Or Password" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Set cookie (HTTP-Only for security)
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Login successful", token });
  } catch (error) {

    console.error("Error processing user Login:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

  }
}



