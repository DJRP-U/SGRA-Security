'use server'
import { cookies } from 'next/headers'

export async function saveSessionAction(
  token: string,
  userName: string
) {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  cookieStore.set({
    name: 'userName',
    value: userName,
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}
