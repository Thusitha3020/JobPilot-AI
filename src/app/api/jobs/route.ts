import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SEED_JOBS } from "@/data/seedJobs";
import { filterJobsList, JobQueryOptions } from "@/lib/jobFilters";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const options: JobQueryOptions = {
    keyword: searchParams.get("keyword") || undefined,
    location: searchParams.get("location") || undefined,
    employmentType: searchParams.get("employmentType") || undefined,
    source: searchParams.get("source") || undefined,
    postedDate: (searchParams.get("postedDate") as any) || "all",
    minMatchScore: searchParams.get("minMatchScore") ? Number(searchParams.get("minMatchScore")) : 0,
    sortBy: (searchParams.get("sortBy") as any) || "newest",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 6,
  };

  try {
    // Construct PostgreSQL query filters if DB server is active
    const whereClause: any = {};

    if (options.keyword) {
      whereClause.OR = [
        { title: { contains: options.keyword, mode: "insensitive" } },
        { company: { contains: options.keyword, mode: "insensitive" } },
        { description: { contains: options.keyword, mode: "insensitive" } },
        { location: { contains: options.keyword, mode: "insensitive" } },
      ];
    }

    if (options.location && options.location !== "all") {
      whereClause.location = { contains: options.location, mode: "insensitive" };
    }

    if (options.employmentType && options.employmentType !== "all") {
      whereClause.employmentType = { contains: options.employmentType, mode: "insensitive" };
    }

    if (options.source && options.source !== "all") {
      whereClause.source = { equals: options.source, mode: "insensitive" };
    }

    if (options.minMatchScore && options.minMatchScore > 0) {
      whereClause.matchPercentage = { gte: options.minMatchScore };
    }

    // Sort order mapping
    let orderByClause: any = { postedAt: "desc" };
    if (options.sortBy === "match_high") orderByClause = { matchPercentage: "desc" };
    if (options.sortBy === "match_low") orderByClause = { matchPercentage: "asc" };
    if (options.sortBy === "title_asc") orderByClause = { title: "asc" };
    if (options.sortBy === "oldest") orderByClause = { postedAt: "asc" };

    const page = options.page || 1;
    const limit = options.limit || 6;
    const skip = (page - 1) * limit;

    const [totalCount, dbJobs] = await Promise.all([
      prisma.job.count({ where: whereClause }),
      prisma.job.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip,
        take: limit,
      }),
    ]);

    if (dbJobs.length > 0 || totalCount > 0) {
      const totalPages = Math.max(1, Math.ceil(totalCount / limit));
      return NextResponse.json({
        success: true,
        source: "postgresql",
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        jobs: dbJobs.map((job) => ({
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
        })),
      });
    }
  } catch (error) {
    console.warn("PostgreSQL query fallback to seed dataset:", error);
  }

  // Fallback to dataset filtering
  const result = filterJobsList(SEED_JOBS, options);
  const formattedFallbackJobs = result.filteredJobs.map((job, idx) => ({
    id: `job-seed-${idx + 1}`,
    title: job.title,
    company: job.company,
    companyLogo: getCompanyLogo(job.company),
    location: job.location,
    jobType: job.employmentType || "Full-time",
    matchPercentage: job.matchPercentage,
    matchingSkills: job.matchingSkills,
    missingSkills: job.missingSkills,
    postedDate: formatRelativeDate(new Date(job.postedAt)),
    salary: job.salary || "Competitive",
    description: job.description,
    requirements: job.requirements,
    url: job.url,
    source: job.source,
    sourceJobId: job.sourceJobId,
  }));

  return NextResponse.json({
    success: true,
    source: "seed_fallback",
    page: result.page,
    limit: result.limit,
    totalCount: result.totalCount,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
    jobs: formattedFallbackJobs,
  });
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
