import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { User } from '@/app/_repositories/User';
import { UserRepository } from '@/app/_repositories/User';

export async function POST(request: NextRequest) {
  try {
    const user: User = await request.json();
    const createdUser = UserRepository.create(user);
    console.log(user);
    return NextResponse.json(createdUser);
  } catch (e) {

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
