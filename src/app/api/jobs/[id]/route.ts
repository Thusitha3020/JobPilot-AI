import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SEED_JOBS } from "@/data/seedJobs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // 1. Try querying PostgreSQL database
    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (job) {
      return NextResponse.json({
        success: true,
        source: "postgresql",
        job: {
          id: job.id,
          title: job.title,
          company: job.company,
          companyLogo: getCompanyLogo(job.company),
          location: job.location,
          jobType: job.employmentType || "Full-time",
          matchPercentage: job.matchPercentage,
          matchingSkills: job.matchingSkills,
          missingSkills: job.missingSkills,
          postedDate: formatRelativeDate(job.postedAt),
          salary: job.salary || "Competitive",
          description: job.description,
          requirements: job.requirements,
          url: job.url,
          source: job.source,
          sourceJobId: job.sourceJobId,
        },
      });
    }
  } catch (error) {
    console.warn("PostgreSQL single job query fallback:", error);
  }

  // 2. Fallback check in SEED_JOBS dataset
  const fallbackMatch = SEED_JOBS.find(
    (j) => j.sourceJobId === id || j.title.toLowerCase().includes(id.toLowerCase())
  );

  if (fallbackMatch) {
    return NextResponse.json({
      success: true,
      source: "seed_fallback",
      job: {
        id: fallbackMatch.sourceJobId,
        title: fallbackMatch.title,
        company: fallbackMatch.company,
        companyLogo: getCompanyLogo(fallbackMatch.company),
        location: fallbackMatch.location,
        jobType: fallbackMatch.employmentType || "Full-time",
        matchPercentage: fallbackMatch.matchPercentage,
        matchingSkills: fallbackMatch.matchingSkills,
        missingSkills: fallbackMatch.missingSkills,
        postedDate: formatRelativeDate(new Date(fallbackMatch.postedAt)),
        salary: fallbackMatch.salary || "Competitive",
        description: fallbackMatch.description,
        requirements: fallbackMatch.requirements,
        url: fallbackMatch.url,
        source: fallbackMatch.source,
        sourceJobId: fallbackMatch.sourceJobId,
      },
    });
  }

  return NextResponse.json(
    { success: false, error: `Job with ID "${id}" was not found.` },
    { status: 404 }
  );
}

function getCompanyLogo(company: string): string {
  if (company.includes("WSO2")) return "☁️";
  if (company.includes("99x")) return "🚀";
  if (company.includes("Sysco")) return "🧠";
  if (company.includes("IFS")) return "🏢";
  if (company.includes("Virtusa")) return "🏢";
  if (company.includes("Surge")) return "⚡";
  if (company.includes("Dialog")) return "📱";
  if (company.includes("Commercial Bank")) return "🏦";
  if (company.includes("Axiata")) return "🌐";
  if (company.includes("Creative")) return "💻";
  if (company.includes("Ikman")) return "🇱🇰";
  return "🏢";
}

function formatRelativeDate(date: Date): string {
  const diffHours = Math.round((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
  if (diffHours < 24) return `${diffHours || 2} hours ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
