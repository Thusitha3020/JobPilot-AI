import { PrismaClient } from "@prisma/client";
import { SEED_JOBS } from "../src/data/seedJobs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding PostgreSQL database with 10 IT vacancies...");

  // Seed default User
  await prisma.user.upsert({
    where: { email: "alex.morgan@example.com" },
    update: {},
    create: {
      email: "alex.morgan@example.com",
      name: "Alex Morgan",
    },
  });

  // Seed 10 IT Jobs with Duplicate Protection (source + sourceJobId)
  for (const job of SEED_JOBS) {
    await prisma.job.upsert({
      where: {
        source_sourceJobId: {
          source: job.source,
          sourceJobId: job.sourceJobId,
        },
      },
      update: {
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        requirements: job.requirements,
        salary: job.salary,
        employmentType: job.employmentType,
        url: job.url,
        matchPercentage: job.matchPercentage,
        matchingSkills: job.matchingSkills,
        missingSkills: job.missingSkills,
        lastCheckedAt: new Date(),
      },
      create: {
        source: job.source,
        sourceJobId: job.sourceJobId,
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        requirements: job.requirements,
        salary: job.salary,
        employmentType: job.employmentType,
        url: job.url,
        matchPercentage: job.matchPercentage,
        matchingSkills: job.matchingSkills,
        missingSkills: job.missingSkills,
        postedAt: new Date(job.postedAt),
        discoveredAt: new Date(),
        lastCheckedAt: new Date(),
      },
    });
  }

  console.log("Seeding complete! 10 IT vacancies inserted/updated in PostgreSQL.");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
