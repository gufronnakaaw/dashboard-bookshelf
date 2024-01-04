import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  if (req.nextUrl.pathname == '/') {
    const token = await getToken({ req, secret: 'bookshelfjwt' });

    if (!token) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    return NextResponse.next();
  }
}
