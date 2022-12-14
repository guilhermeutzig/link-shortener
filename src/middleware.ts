import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api") || pathname === "/") {
    console.log("Returning early");
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();
  const res = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  const data = await res.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}
