import React, { useState } from "react";
import ProjectModal from "./ProjectModal";

const defaultProjects = [
  {
    id: 1,
    title: "Viral TikTok & Reels Growth Engine",
    category: "Organic Growth & Content",
    description: "Designed a short-form video content strategy generating multi-million organic impressions.",
    objective: "Increase brand reach among Gen-Z demographics without paid ad spend.",
    approach: "Utilized psychological hooks, trending audio patterns, and community comment bait.",
    metrics: [
      { value: "3.2M+", label: "Organic Impressions" },
      { value: "+180%", label: "Follower Growth" },
      { value: "8.4%", label: "Avg Engagement" }
    ],
    tools: ["TikTok Ads Manager", "CapCut", "Google Analytics 4", "Notion"],
    outcome: "Generated 3.2M organic views in 60 days, driving a 28% increase in website landing traffic."
  },
  {
    id: 2,
    title: "Omnichannel Funnel & ROAS Optimization",
    category: "Performance Marketing",
    description: "A complete overhaul of Meta & Google Search ad campaigns for an e-commerce brand.",
    objective: "Lower Customer Acquisition Cost (CAC) while scaling monthly ad spend.",
    approach: "A/B tested creative variations, implemented dynamic retargeting, and built custom landing pages.",
    metrics: [
      { value: "4.2x", label: "Return on Ad Spend" },
      { value: "-32%", label: "Customer Acquisition Cost" },
      { value: "+145%", label: "Conversion Rate" }
    ],
    tools: ["Meta Ads Manager", "Google Ads", "Shopify", "Klaviyo"],
    outcome: "Achieved a 4.2x ROAS over 90 days while scaling monthly ad spend by 200%."
  },
  {
    id: 3,
    title: "SEO Content Architecture & Authority Building",
    category: "Search Engine Optimization",
    description: "Built a topic cluster SEO framework to capture high-intent search queries.",
    objective: "Outrank entrenched competitors on key high-volume commercial keywords.",
    approach: "Executed technical site audits, programmatic internal linking, and strategic guest outreach.",
    metrics: [
      { value: "#1", label: "Google Rank for Core Terms" },
      { value: "+210%", label: "Organic Search Traffic" },
      { value: "14.2k", label: "Monthly Organic Clicks" }
    ],
    tools: ["Ahrefs", "SEMrush", "Google Search Console", "WordPress"],
    outcome: "Secured top-3 rankings for 14 high-converting keywords within 5 months."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h2 className="projects-title">Featured Campaigns</h2>
        <p className="projects-subtitle">Click any project to inspect the strategy, metrics & marketing stack.</p>
      </div>

      <div className="projects-grid">
        {defaultProjects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => setSelectedProject(project)}
            data-cursor="VIEW"
          >
            <div className="project-card-top">
              <span className="project-cat">{project.category}</span>
              <span className="project-arrow">↗</span>
            </div>
            
            <h3 className="project-name">{project.title}</h3>
            <p className="project-desc">{project.description}</p>

            {project.metrics && (
              <div className="project-card-metrics">
                <span className="card-stat-num">{project.metrics[0].value}</span>
                <span className="card-stat-lbl">{project.metrics[0].label}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Case Study Slide-over Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
