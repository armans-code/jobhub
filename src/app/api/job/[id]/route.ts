import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
    include: {
      applicants: true,
    },
  });
  return NextResponse.json(job);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await request.json();
  const job = await prisma.job.update({
    where: {
      id: id,
    },
    data: body,
  });
  return NextResponse.json(job);
}
