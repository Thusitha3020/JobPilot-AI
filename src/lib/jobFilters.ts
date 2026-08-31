export interface JobQueryOptions {
  keyword?: string;
  location?: string;
  employmentType?: string;
  source?: string;
  postedDate?: '24h' | '7d' | '30d' | 'all';
  minMatchScore?: number;
  sortBy?: 'newest' | 'oldest' | 'match_high' | 'match_low' | 'title_asc';
  page?: number;
  limit?: number;
}

export function filterJobsList<T extends {
  title: string;
  company: string;
  location: string;
  description: string;
  matchingSkills?: string[];
  employmentType?: string | null;
  source?: string;
  matchPercentage: number;
  postedAt?: Date | string;
}>(jobs: T[], options: JobQueryOptions): {
  filteredJobs: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const {
    keyword = "",
    location = "",
    employmentType = "all",
    source = "all",
    postedDate = "all",
    minMatchScore = 0,
    sortBy = "newest",
    page = 1,
    limit = 6,
  } = options;

  let result = [...jobs];

  // 1. Keyword Filter (title, company, description, matchingSkills)
  if (keyword.trim()) {
    const k = keyword.toLowerCase().trim();
    result = result.filter(
      (job) =>
        job.title.toLowerCase().includes(k) ||
        job.company.toLowerCase().includes(k) ||
        job.description.toLowerCase().includes(k) ||
        (job.matchingSkills && job.matchingSkills.some((s) => s.toLowerCase().includes(k)))
    );
  }

  // 2. Location Filter
  if (location.trim() && location.toLowerCase() !== "all") {
    const loc = location.toLowerCase().trim();
    result = result.filter((job) => job.location.toLowerCase().includes(loc));
  }

  // 3. Employment Type Filter
  if (employmentType && employmentType.toLowerCase() !== "all") {
    const emp = employmentType.toLowerCase();
    result = result.filter((job) =>
      job.employmentType ? job.employmentType.toLowerCase().includes(emp) : true
    );
  }

  // 4. Source Filter
  if (source && source.toLowerCase() !== "all") {
    const src = source.toLowerCase();
    result = result.filter((job) => (job.source ? job.source.toLowerCase() === src : true));
  }

  // 5. Minimum Match Score Filter
  if (minMatchScore > 0) {
    result = result.filter((job) => job.matchPercentage >= minMatchScore);
  }

  // 6. Posted Date Filter
  if (postedDate && postedDate !== "all") {
    const now = new Date().getTime();
    let maxAgeHours = 24;
    if (postedDate === "7d") maxAgeHours = 7 * 24;
    if (postedDate === "30d") maxAgeHours = 30 * 24;

    result = result.filter((job) => {
      if (!job.postedAt) return true;
      const postedTime = new Date(job.postedAt).getTime();
      const ageHours = (now - postedTime) / (1000 * 60 * 60);
      return ageHours <= maxAgeHours;
    });
  }

  // 7. Sorting
  result.sort((a, b) => {
    if (sortBy === "match_high") return b.matchPercentage - a.matchPercentage;
    if (sortBy === "match_low") return a.matchPercentage - b.matchPercentage;
    if (sortBy === "title_asc") return a.title.localeCompare(b.title);
    if (sortBy === "oldest") {
      const timeA = a.postedAt ? new Date(a.postedAt).getTime() : 0;
      const timeB = b.postedAt ? new Date(b.postedAt).getTime() : 0;
      return timeA - timeB;
    }
    // Default: newest
    const timeA = a.postedAt ? new Date(a.postedAt).getTime() : 0;
    const timeB = b.postedAt ? new Date(b.postedAt).getTime() : 0;
    return timeB - timeA;
  });

  // 8. Pagination
  const totalCount = result.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * limit;
  const paginatedJobs = result.slice(startIndex, startIndex + limit);

  return {
    filteredJobs: paginatedJobs,
    totalCount,
    page: currentPage,
    limit,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
