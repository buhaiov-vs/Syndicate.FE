import Routes from "@/lib/routes";
import { NextRequest, NextResponse } from "next/server"
import { CookieNames } from "@/lib/consts";

export function middleware(request: NextRequest) {
    if(!request.cookies.has(CookieNames.auth)) {
        return NextResponse.redirect(new URL(Routes.signIn, request.url))
    }

    return NextResponse.next();
  }

  export const config = {
    matcher: '/dashboard/:path*',
  }