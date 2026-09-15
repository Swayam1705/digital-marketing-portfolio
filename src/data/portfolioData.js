/* =============================================================================
 *
 *  👉  EDIT THIS FILE FIRST.
 *
 *  This is the ONLY file you normally need to touch to personalize the site.
 *  Every component on the website reads its content from this file — you do
 *  NOT need to edit component files for normal content updates.
 *
 *  HOW TO USE IT
 *  -------------
 *  - Replace every [SQUARE BRACKETED] placeholder with your own information.
 *  - Add / remove items by copying the block they live in (e.g. one project
 *    object) and following the same shape.
 *  - Keep the quotes, commas and braces intact.
 *  - Do not invent metrics — only enter results you can stand behind.
 *
 *  See CUSTOMIZATION.md (in the project root) for a step-by-step guide.
 *
 * ========================================================================== */

export const portfolioData = {
  /* --------------------------------------------------------------------------
   *  PERSONAL / HERO
   * ------------------------------------------------------------------------ */
  personal: {
    name: "[YOUR NAME]",
    role: "Digital Marketing Student",

    // One sentence that defines your personal brand (shown under your name).
    tagline: "Turning attention into connection.",

    // 1–2 sentences for the hero section.
    intro:
      "[WRITE A SHORT 1–2 SENTENCE INTRODUCTION ABOUT YOUR DIGITAL MARKETING INTERESTS — THE CHANNELS, CAMPAIGNS OR AUDIENCES THAT EXCITE YOU.]",

    // 100–150 word biography used in the About section.
    bio: "[WRITE A 100–150 WORD BIOGRAPHY HERE. Cover your background, what first drew you to digital marketing, the kinds of campaigns, channels and audiences you enjoy exploring, what you are studying, and where you hope your marketing journey takes you next. Keep it human, specific and honest rather than listing buzzwords.]",

    // Replace this path with your own photo, e.g. "/images/my-profile.jpg"
    profileImage: "/images/profile-placeholder.svg",
    profileAlt: "Placeholder profile portrait illustration",

    email: "[YOUR EMAIL]",
    phone: "[YOUR PHONE]",
    location: "[YOUR CITY, COUNTRY]",

    // Short snapshot chips shown beside the biography.
    focusAreas: [
      "Social-first campaigns",
      "Content strategy",
      "Brand storytelling",
      "Learning from analytics",
    ],

    // Put your PDF in public/resume/ and keep this path in sync.
    resume: "/resume/your-resume.pdf",
  },

  /* --------------------------------------------------------------------------
   *  SOCIAL LINKS
   *  Add or remove platforms freely. `url` is where the icon/link goes.
   *  Common platforms (LinkedIn, Instagram, Behance, GitHub, X, YouTube)
   *  automatically get a matching icon in the footer/contact section.
   * ------------------------------------------------------------------------ */
  socials: [
    {
      platform: "LinkedIn",
      label: "[YOUR LINKEDIN HANDLE]",
      url: "#",
    },
    {
      platform: "Instagram",
      label: "[YOUR INSTAGRAM HANDLE]",
      url: "#",
    },
    {
      platform: "Behance",
      label: "[YOUR BEHANCE HANDLE]",
      url: "#",
    },
  ],

  /* --------------------------------------------------------------------------
   *  "WHAT I BELIEVE" — positioning statements, NOT claims of experience.
   * ------------------------------------------------------------------------ */
  beliefs: [
    {
      number: "01",
      title: "CURIOSITY",
      text: "Good marketing starts with better questions.",
    },
    {
      number: "02",
      title: "CREATIVITY",
      text: "Strategy gives creativity a direction.",
    },
    {
      number: "03",
      title: "MEASUREMENT",
      text: "Ideas become stronger when we learn from the data.",
    },
  ],

  /* --------------------------------------------------------------------------
   *  ABOUT — short personal journey timeline.
   *  Keep entries chronological (oldest first or newest first — be consistent).
   * ------------------------------------------------------------------------ */
  journey: [
    {
      period: "[YEAR OR PERIOD]",
      title: "[MILESTONE — e.g. FIRST MARKETING COURSE]",
      description: "[WHAT SPARKED YOUR INTEREST IN DIGITAL MARKETING?]",
    },
    {
      period: "[YEAR OR PERIOD]",
      title: "[MILESTONE — e.g. FIRST CAMPAIGN EXPERIMENT]",
      description: "[WHAT DID YOU TRY, MAKE OR LEARN?]",
    },
    {
      period: "[YEAR OR PERIOD]",
      title: "[MILESTONE — e.g. INTERNSHIP, CLUB OR FREELANCE WORK]",
      description: "[WHAT DID YOU TAKE AWAY FROM THE EXPERIENCE?]",
    },
    {
      period: "[YEAR OR PRESENT]",
      title: "[WHERE YOU ARE NOW]",
      description: "[WHAT YOU ARE STUDYING OR FOCUSING ON TODAY.]",
    },
  ],

  /* --------------------------------------------------------------------------
   *  MARKETING TOOLKIT — skills grouped by category.
   *  No fake percentages: skills are presented as a categorical toolkit.
   *  `icon` options: pen | trending | palette | chart
   *  Tap/click a skill to reveal its description.
   * ------------------------------------------------------------------------ */
  skillGroups: [
    {
      category: "CONTENT",
      tagline: "Messages people want to spend time with.",
      icon: "pen",
      items: [
        {
          name: "Social Media Marketing",
          description:
            "[DESCRIBE YOUR INTEREST OR EXPERIENCE — PLATFORMS, FORMATS, COMMUNITY THINKING.]",
        },
        {
          name: "Content Strategy",
          description:
            "[DESCRIBE HOW YOU PLAN CONTENT THEMES, PILLARS AND CALENDARS.]",
        },
        {
          name: "Copywriting",
          description:
            "[DESCRIBE THE VOICES, FORMATS OR PROJECTS YOU HAVE WRITTEN FOR.]",
        },
      ],
    },
    {
      category: "GROWTH",
      tagline: "Getting the right work in front of the right people.",
      icon: "trending",
      items: [
        {
          name: "SEO",
          description:
            "[DESCRIBE YOUR INTEREST IN KEYWORDS, ON-PAGE SEO OR SEARCH INTENT.]",
        },
        {
          name: "Email Marketing",
          description:
            "[DESCRIBE FLOWS, NEWSLETTERS OR SEGMENTATION YOU HAVE EXPLORED.]",
        },
        {
          name: "Campaign Planning",
          description:
            "[DESCRIBE HOW YOU APPROACH OBJECTIVES, TIMELINES AND CHANNEL MIX.]",
        },
      ],
    },
    {
      category: "BRAND",
      tagline: "A recognizable, consistent point of view.",
      icon: "palette",
      items: [
        {
          name: "Branding",
          description:
            "[DESCRIBE YOUR INTEREST IN POSITIONING, IDENTITY AND BRAND VOICE.]",
        },
        {
          name: "Visual Communication",
          description:
            "[DESCRIBE TOOLS YOU USE, e.g. CANVA / FIGMA, AND HOW YOU THINK ABOUT LAYOUT.]",
        },
        {
          name: "Audience Positioning",
          description:
            "[DESCRIBE HOW YOU THINK ABOUT AUDIENCE PERSONAS AND MESSAGING FIT.]",
        },
      ],
    },
    {
      category: "DATA",
      tagline: "Letting results shape the next decision.",
      icon: "chart",
      items: [
        {
          name: "Analytics",
          description:
            "[DESCRIBE PLATFORMS OR METRICS YOU ARE LEARNING, e.g. GA4 / META INSIGHTS.]",
        },
        {
          name: "Performance Tracking",
          description:
            "[DESCRIBE HOW YOU SET KPIs AGAINST A CAMPAIGN OBJECTIVE.]",
        },
        {
          name: "Reporting",
          description:
            "[DESCRIBE HOW YOU TURN NUMBERS INTO CLEAR, HONEST STORIES.]",
        },
      ],
    },
  ],

  /* --------------------------------------------------------------------------
   *  PROJECTS — your proof of work. Clicking a card opens a full case study.
   *  Copy a whole block to add another project; delete a block to remove one.
   *  Use only outcomes/metrics that are REAL — otherwise leave the learning.
   * ------------------------------------------------------------------------ */
  projects: [
    {
      title: "[PROJECT TITLE]",
      category: "Social Media Campaign",
      image: "/images/project-placeholder-1.svg",
      alt: "Placeholder social media campaign workspace image",
      objective:
        "[WHAT WAS THE PROBLEM OR BRIEF? WHO WERE YOU TRYING TO REACH?]",
      approach:
        "[WHAT STRATEGY, CHANNEL MIX, CONTENT OR EXPERIMENT DID YOU DESIGN, AND WHY?]",
      tools: ["[TOOL 1]", "[TOOL 2]", "[TOOL 3]"],
      outcome:
        "[REAL MEASURED RESULT OR HONEST LEARNING — DO NOT INVENT METRICS.]",
      link: "#",
      linkLabel: "View project",
    },
    {
      title: "[PROJECT TITLE]",
      category: "Content & SEO",
      image: "/images/project-placeholder-2.svg",
      alt: "Placeholder strategy and campaign planning board image",
      objective:
        "[WHAT WAS THE PROBLEM OR BRIEF? WHO WERE YOU TRYING TO REACH?]",
      approach:
        "[WHAT STRATEGY, KEYWORD OR CONTENT APPROACH DID YOU DESIGN, AND WHY?]",
      tools: ["[TOOL 1]", "[TOOL 2]"],
      outcome:
        "[REAL MEASURED RESULT OR HONEST LEARNING — DO NOT INVENT METRICS.]",
      link: "#",
      linkLabel: "View project",
    },
    {
      title: "[PROJECT TITLE]",
      category: "Email & Analytics",
      image: "/images/project-placeholder-3.svg",
      alt: "Placeholder email and analytics campaign dashboard image",
      objective:
        "[WHAT WAS THE PROBLEM OR BRIEF? WHO WERE YOU TRYING TO REACH?]",
      approach:
        "[WHAT SEGMENTS, FLOWS OR TESTS DID YOU DESIGN, AND HOW DID YOU TRACK THEM?]",
      tools: ["[TOOL 1]", "[TOOL 2]"],
      outcome:
        "[REAL MEASURED RESULT OR HONEST LEARNING — DO NOT INVENT METRICS.]",
      link: "#",
      linkLabel: "View project",
    },
  ],

  /* --------------------------------------------------------------------------
   *  PERFORMANCE THINKING — a funnel diagram with slots for REAL metrics.
   *  Leave the metric placeholders until you have actual numbers.
   * ------------------------------------------------------------------------ */
  funnel: [
    {
      stage: "REACH",
      question: "Who saw it?",
      metric: "[ADD REACH METRIC]",
      signals: "Impressions · reach · views",
    },
    {
      stage: "ENGAGEMENT",
      question: "Who interacted?",
      metric: "[ADD ENGAGEMENT METRIC]",
      signals: "Likes · comments · shares · clicks",
    },
    {
      stage: "CONVERSION",
      question: "Who acted?",
      metric: "[ADD CONVERSION METRIC]",
      signals: "Sign-ups · purchases · downloads",
    },
    {
      stage: "RETENTION",
      question: "Who came back?",
      metric: "[ADD RETENTION METRIC]",
      signals: "Return visits · repeats · subscribers",
    },
  ],

  /* --------------------------------------------------------------------------
   *  EDUCATION — chronological cards in the "Learning in motion" timeline.
   * ------------------------------------------------------------------------ */
  education: [
    {
      institution: "[INSTITUTION / UNIVERSITY]",
      program: "[PROGRAM / DEGREE NAME]",
      period: "[YEARS OR 'PRESENT']",
      description:
        "[OPTIONAL: RELEVANT COURSEWORK, SPECIALIZATION OR ACADEMIC FOCUS.]",
    },
    {
      institution: "[EARLIER INSTITUTION — DELETE IF NOT NEEDED]",
      program: "[PROGRAM / QUALIFICATION]",
      period: "[YEARS]",
      description: "[OPTIONAL DESCRIPTION.]",
    },
  ],

  /* --------------------------------------------------------------------------
   *  EXPERIENCE — internships, freelance, student clubs, part-time work...
   * ------------------------------------------------------------------------ */
  experience: [
    {
      organization: "[ORGANIZATION, CLUB OR FREELANCE CONTEXT]",
      role: "[ROLE — e.g. MARKETING INTERN]",
      period: "[DATES OR 'PRESENT']",
      description:
        "[WHAT YOU WERE RESPONSIBLE FOR AND WHAT YOU LEARNED — KEEP IT HONEST.]",
    },
    {
      organization: "[ORGANIZATION, CLUB OR FREELANCE CONTEXT]",
      role: "[ROLE — DELETE THIS ENTRY IF NOT NEEDED]",
      period: "[DATES]",
      description: "[WHAT YOU DID AND WHAT YOU LEARNED.]",
    },
  ],

  /* --------------------------------------------------------------------------
   *  SERVICES — areas you can offer OR are actively developing.
   *  Wording on the page is careful: these are capabilities, not guarantees.
   *  `icon` options: megaphone | newspaper | search | mail | palette
   *                  pen | target | chart
   * ------------------------------------------------------------------------ */
  services: [
    {
      title: "Social Media Strategy",
      icon: "megaphone",
      description:
        "[CHANNEL GOALS, CONTENT PILLARS AND POSTING RHYTHM — PLACEHOLDER.]",
      link: "#contact",
    },
    {
      title: "Content Strategy",
      icon: "newspaper",
      description:
        "[PLANNING CONTENT THAT SERVES BOTH THE AUDIENCE AND THE BRAND.]",
      link: "#contact",
    },
    {
      title: "SEO",
      icon: "search",
      description:
        "[SEARCH-INTENT RESEARCH AND ON-PAGE OPTIMIZATION FOUNDATIONS.]",
      link: "#contact",
    },
    {
      title: "Email Marketing",
      icon: "mail",
      description:
        "[WELCOME FLOWS, NEWSLETTERS AND SIMPLE SEGMENTATION IDEAS.]",
      link: "#contact",
    },
    {
      title: "Branding",
      icon: "palette",
      description:
        "[VOICE, POSITIONING AND VISUAL CONSISTENCY ACROSS TOUCHPOINTS.]",
      link: "#contact",
    },
    {
      title: "Copywriting",
      icon: "pen",
      description:
        "[CLEAR, ON-BRAND WRITING FOR CAPTIONS, EMAILS AND PAGES.]",
      link: "#contact",
    },
    {
      title: "Campaign Planning",
      icon: "target",
      description:
        "[OBJECTIVES, TIMELINES, CHANNEL MIX AND LEARNING PLANS.]",
      link: "#contact",
    },
    {
      title: "Analytics",
      icon: "chart",
      description:
        "[SETTING KPIs AND READING REPORTS TO IMPROVE THE NEXT ROUND.]",
      link: "#contact",
    },
  ],

  /* --------------------------------------------------------------------------
   *  BLOG / WRITING — set `featured: true` on ONE post for the large card.
   * ------------------------------------------------------------------------ */
  blogPosts: [
    {
      featured: true,
      title: "[FEATURED ARTICLE TITLE — YOUR BIGGEST CURRENT LEARNING]",
      category: "Strategy",
      readTime: "[X] min read",
      excerpt:
        "[2–3 SENTENCE EXCERPT THAT EXPLAINS THE IDEA AND WHY IT MATTERS TO OTHER MARKETERS.]",
      image: "/images/blog-placeholder-1.svg",
      alt: "Placeholder blog illustration: notebook and idea spark",
      link: "#",
    },
    {
      title: "[ARTICLE TITLE]",
      category: "Analytics",
      readTime: "[X] min read",
      excerpt: "[ONE-SENTENCE EXCERPT FROM THE ARTICLE.]",
      image: "/images/blog-placeholder-2.svg",
      alt: "Placeholder blog illustration: magnifier over a chart",
      link: "#",
    },
    {
      title: "[ARTICLE TITLE]",
      category: "Content",
      readTime: "[X] min read",
      excerpt: "[ONE-SENTENCE EXCERPT FROM THE ARTICLE.]",
      image: "/images/blog-placeholder-3.svg",
      alt: "Placeholder blog illustration: connected content channels",
      link: "#",
    },
  ],
}
