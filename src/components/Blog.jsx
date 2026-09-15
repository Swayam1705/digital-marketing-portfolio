import { ArrowRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Blog() {
  const posts = portfolioData.blogPosts;
  const featured = posts.find((post) => post.featured) || posts[0];
  const rest = posts.filter((post) => post !== featured);

  return (
    <section id="blog" className="section" aria-labelledby="blog-title">
      <div className="container">
        <SectionHeading
          eyebrow="Field notes"
          title={
            <span id="blog-title">
              Things I&rsquo;m learning, testing &amp; thinking about.
            </span>
          }
          intro="Writing helps me think clearly. These are works in progress — experiments, breakdowns and questions from my marketing learning."
        />

        {featured && (
          <Reveal variant="scale">
            <a className="blog__featured" href={featured.link} aria-label={`Featured article: ${featured.title}`}>
              <img src={featured.image} alt={featured.alt} loading="lazy" />
              <div className="blog__featured-body">
                <p className="blog__meta">
                  <span>Featured</span>
                  <span className="dot" aria-hidden="true" />
                  <span>{featured.category}</span>
                  <span className="dot" aria-hidden="true" />
                  <span>{featured.readTime}</span>
                </p>
                <h3 className="blog__title">{featured.title}</h3>
                <p className="blog__excerpt">{featured.excerpt}</p>
                <span className="ulink">
                  Read the article
                  <ArrowRight aria-hidden="true" />
                </span>
              </div>
            </a>
          </Reveal>
        )}

        <div className="blog__grid">
          {rest.map((post, i) => (
            <Reveal as="article" className="blog-card" key={post.title} delay={i * 110}>
              <a href={post.link} aria-label={`Article: ${post.title}`}>
                <img src={post.image} alt={post.alt} loading="lazy" />
                <div className="blog-card__body">
                  <p className="blog__meta">
                    <span>{post.category}</span>
                    <span className="dot" aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </p>
                  <h3 className="blog__title" style={{ fontSize: "var(--text-lg)" }}>
                    {post.title}
                  </h3>
                  <p className="blog__excerpt">{post.excerpt}</p>
                  <span className="ulink">
                    Read more
                    <ArrowRight aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
