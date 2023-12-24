import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET() {
  const applicants = await prisma.applicant.findMany();
  return NextResponse.json(applicants);
}

export async function POST(request: Request) {
  const body = await request.json();
  const applicant = await prisma.applicant.create({ data: body });
  return NextResponse.json(applicant);
}
