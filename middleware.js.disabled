// middleware.js

import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = new URL(request.url)
  const ref = url.searchParams.get('ref')

  if (ref) {
    const response = NextResponse.next()

    // Set the referral cookie for 30 days
    response.cookies.set('ref', ref, {
      maxAge: 60 * 24 * 60 * 60, // 60 days
      path: '/',
    })

    return response
  }

  return NextResponse.next()
}
