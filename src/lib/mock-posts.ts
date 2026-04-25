import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Urban Coffee Studio",
    "Growth Labs Agency",
    "Northside Fitness",
    "PixelCraft Design",
    "Prime Auto Care",
  ],
  classified: [
    "Used MacBook Pro 16",
    "Studio Space for Rent",
    "Hiring Frontend Developer",
    "Weekend Photography Gig",
    "City Center Apartment",
  ],
  article: [
    "Scaling Local SEO in 2026",
    "The Future of Directory Sites",
    "Design Systems for Multi-Site",
    "From MVP to Marketplace",
    "Content Ops That Ship Fast",
  ],
  image: [
    "Golden Hour Interiors",
    "Mountain Trail Series",
    "Studio Portrait Set",
    "Neon Night Market",
    "Minimal Workspace",
  ],
  profile: [
    "Aisha Khan",
    "Rohan Patel",
    "Studio R&R",
    "Team Northwind",
    "Maya Desai",
  ],
  social: [
    "Community Launch Update",
    "Collab Request: Designers",
    "Weekly Trend Digest",
    "New Partnerships Announced",
    "Creator Spotlight Series",
  ],
  pdf: [
    "Local SEO Playbook",
    "Marketplace UX Guide",
    "Outbound Sales Template",
    "Agency Pricing Deck",
    "SaaS Metrics Cheatsheet",
  ],
  org: [
    "Northwind Collective",
    "Brightline Media",
    "Atlas Labs",
    "Cobalt Studio",
    "Zenith Partners",
  ],
  sbm: [
    "SEO Checklist 2026",
    "Directory Growth Tactics",
    "Backlink Outreach Vault",
    "AI Writing Tools List",
    "Local Listing Audit",
  ],
  comment: [
    "Reply: Agency Growth Stack",
    "Commentary: Link Building",
    "Response: Listing Quality",
    "Thread: SEO Experiments",
    "Hot Take: Directory UX",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Marketing", "Tech", "Design", "Fitness", "Automotive"],
  classified: ["Jobs", "Real Estate", "Services", "Gigs", "Market"],
  article: ["Strategy", "SEO", "Product", "Growth", "Ops"],
  image: ["Lifestyle", "Travel", "Studio", "Urban", "Minimal"],
  profile: ["Founder", "Creator", "Agency", "Team", "Consultant"],
  social: ["Community", "News", "Updates", "Events", "Insights"],
  pdf: ["Guides", "Playbooks", "Templates", "Reports", "Docs"],
  org: ["Agency", "Studio", "Collective", "Partner", "Network"],
  sbm: ["Bookmarks", "Tools", "Resources", "SEO", "Research"],
  comment: ["Opinion", "Reply", "Discussion", "Feedback", "Debate"],
};

const taskContentTypes: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "profile",
  sbm: "social",
  comment: "article",
};

const latestSbmUploads = [
  {
    title: "OpenAI API Responses Quickstart",
    url: "https://platform.openai.com/docs/guides/responses",
    category: "Technology",
    description: "Official guide for building fast prompt and tool workflows with the Responses API.",
    domain: "platform.openai.com",
  },
  {
    title: "Vercel Next.js 16 Production Deployment Guide",
    url: "https://nextjs.org/docs/app/building-your-application/deploying",
    category: "Technology",
    description: "Reliable deployment checklist covering caching, revalidation, and performance flags.",
    domain: "nextjs.org",
  },
  {
    title: "Web.dev Core Web Vitals Optimization Handbook",
    url: "https://web.dev/vitals/",
    category: "Business",
    description: "Practical field guidance for improving LCP, CLS, and INP on production pages.",
    domain: "web.dev",
  },
  {
    title: "Ahrefs Technical SEO Checklist",
    url: "https://ahrefs.com/blog/technical-seo/",
    category: "Business",
    description: "Actionable crawl, index, and internal-link audits for real-world SEO maintenance.",
    domain: "ahrefs.com",
  },
  {
    title: "MDN CSS Container Queries Reference",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries",
    category: "Technology",
    description: "Reference patterns for building responsive components with container-aware layouts.",
    domain: "developer.mozilla.org",
  },
  {
    title: "Google Search Central Structured Data Docs",
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
    category: "News",
    description: "Schema guidance to improve rich-result eligibility and search appearance quality.",
    domain: "developers.google.com",
  },
  {
    title: "HubSpot Content Repurposing Framework",
    url: "https://blog.hubspot.com/marketing/repurpose-content",
    category: "Social Media",
    description: "Repurpose one article into multi-channel distribution assets with less production overhead.",
    domain: "hubspot.com",
  },
  {
    title: "Cloudflare Website Performance Basics",
    url: "https://developers.cloudflare.com/fundamentals/performance/",
    category: "Technology",
    description: "Caching and network performance fundamentals for faster global page delivery.",
    domain: "developers.cloudflare.com",
  },
];

const summaryByTask: Record<TaskKey, string> = {
  listing: "Verified business listing with trusted details.",
  classified: "Fresh deal posted by a verified seller.",
  article: "Long-form insight from industry experts.",
  image: "Curated visual story and gallery.",
  profile: "Featured creator profile and highlights.",
  social: "Community update and engagement thread.",
  pdf: "Downloadable resource for your team.",
  org: "Organization spotlight and services.",
  sbm: "Curated bookmark collection entry.",
  comment: "Response post with perspective and context.",
};

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  if (task === "sbm") {
    const now = Date.now();
    return latestSbmUploads.map((item, index) => {
      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return {
        id: `sbm-mock-latest-${index + 1}`,
        title: item.title,
        slug,
        summary: item.description,
        content: {
          type: "social",
          category: item.category,
          description: item.description,
          website: item.url,
          location: "Global",
          domain: item.domain,
        },
        media: [{ url: buildImage("sbm", index), type: "IMAGE" }],
        tags: ["social", "bookmark", item.category],
        authorName: "Community Curator",
        publishedAt: new Date(now - index * 1000 * 60 * 42).toISOString(),
      };
    });
  }

  return Array.from({ length: 5 }).map((_, index) => {
    const title = taskTitles[task][index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: taskContentTypes[task],
        category,
        location: "Delhi",
        description: summaryByTask[task],
        website: "https://example.com",
        phone: "+91-9999999999",
      },
      media: [{ url: buildImage(task, index), type: "IMAGE" }],
      tags: [task, category],
      authorName: "Site Master Pro",
      publishedAt: new Date().toISOString(),
    };
  });
};
