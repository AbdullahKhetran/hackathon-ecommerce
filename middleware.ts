import { NextResponse } from "next/server"

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [`${process.env.NEXT_PUBLIC_PREVIEW_URL}`, `${process.env.SECRET_URL}`, `${process.env.NEXT_PUBLIC_URL}`, `${process.env.STRIPE_WEBHOOK_EVENT_REQUEST_URL}`]
    : ["http://localhost:3000"]

export function middleware(request: Request) {

    const origin = request.headers.get('origin')
    console.log("Origin is", origin)

    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    console.log('Middleware!')

    console.log("Request method is", request.method)
    console.log("Request URL is", request.url)

    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}