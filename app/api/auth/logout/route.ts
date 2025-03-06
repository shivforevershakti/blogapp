import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // ✅ Await `cookies()`
  cookieStore.set("token", "", { expires: new Date(0), path: "/" }); // ✅ Expire the cookie

  return NextResponse.json({ success: true, msg: "Logged out" }, { status: 200 });
}
