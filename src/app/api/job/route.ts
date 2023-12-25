import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET() {
  const jobs = await prisma.job.findMany();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const job = await prisma.job.create({ data: body });
  revalidatePath(`/company/${body.companyId}`);
  return NextResponse.json(job);
}
