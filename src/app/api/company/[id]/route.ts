import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const company = await prisma.company.findUnique({
    where: {
      id: id,
    },
    include: {
      jobs: true,
    },
  });
  return NextResponse.json(company);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await request.json();
  const company = await prisma.company.update({
    where: {
      id: id,
    },
    data: body,
  });
  return NextResponse.json(company);
}
