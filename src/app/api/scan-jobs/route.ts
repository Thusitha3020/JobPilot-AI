import { NextResponse } from "next/server";
import { scanSriLankanWebsites } from "@/lib/scrapers/sriLankaJobScanner";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { keyword, location } = body;

    const scanResult = await scanSriLankanWebsites({ keyword, location });

    // Attempt to persist scanned jobs to database if Prisma is connected
    let persistedCount = 0;
    try {
      for (const job of scanResult.jobs) {
        await prisma.job.upsert({
          where: {
            source_sourceJobId: {
              source: job.companyLogo === "⚡" ? "Direct" : "Ikman.lk",
              sourceJobId: job.id,
            },
          },
          update: {
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            description: job.description,
            requirements: job.requirements,
            matchingSkills: job.matchingSkills,
            missingSkills: job.missingSkills,
            matchPercentage: job.matchPercentage,
            lastCheckedAt: new Date(),
          },
          create: {
            source: job.companyLogo === "⚡" ? "Direct" : "Ikman.lk",
            sourceJobId: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            employmentType: job.jobType,
            salary: job.salary,
            description: job.description,
            requirements: job.requirements,
            matchingSkills: job.matchingSkills,
            missingSkills: job.missingSkills,
            matchPercentage: job.matchPercentage,
            postedAt: new Date(),
          },
        });
        persistedCount++;
      }
    } catch (dbError) {
      console.warn("DB offline during job scan ingestion, returning in-memory scan result:", dbError);
    }

    return NextResponse.json({
      success: true,
      persistedToDb: persistedCount > 0,
      scanResult,
    });
  } catch (error) {
    console.error("Error executing Sri Lanka web scan:", error);
    return NextResponse.json(
      { success: false, error: "Failed to scan Sri Lanka job websites." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") || undefined;
  const location = searchParams.get("location") || undefined;

  try {
    const scanResult = await scanSriLankanWebsites({ keyword, location });
    return NextResponse.json({
      success: true,
      scanResult,
    });
  } catch (error) {
    console.error("Error in GET scan-jobs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch scanned Sri Lanka jobs." },
      { status: 500 }
    );
  }
}
