import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET() {
  const companies = await prisma.company.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return NextResponse.json(companies);
}

export async function POST(request: Request) {
  const body = await request.json();
  const company = await prisma.company.create({ data: body });
  return NextResponse.json(company);
}
