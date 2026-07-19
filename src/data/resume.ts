import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  name: "Abhishekh Kumar Jha",
  title: "AI Engineer & Cybersecurity Specialist",
  email: ["abhishek.jha@cloudinntech.co.in", "sales@cloudinntech.co.in"],
  phone: ["+91-9311258178", "+91-7479716648"],
  linkedin: "https://www.linkedin.com/in/abhishekh-kumar-jha-9788a9420?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  summary: "Professional AI Engineer and Cybersecurity Specialist with over 5 years of experience leading secure AI system design, automated compliance platforms, and cyber defense simulation frameworks at CloudInntech. Expert in deploying privacy-preserving algorithms, optimizing large language models (LLMs), and securing enterprise database architectures.",
  experience: [
    {
      id: "exp0",
      role: "AI Engineer & Cybersecurity Specialist",
      company: "CloudInntech",
      period: "2021 - Present",
      location: "Remote / Hybrid",
      bullets: [
        "Led the design, development, and secure deployment of AI-driven automation platforms and large language models (LLMs).",
        "Designed and implemented localized privacy-preserving algorithms and cyber defense frameworks for threat and anomaly detection.",
        "Optimized enterprise security architectures, securing cloud database infrastructures (MongoDB, MySQL) and API integrations."
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "AI Powered Regulatory Compliance Checker for Contracts",
      date: "Mar 2026",
      category: "AI & ML",
      threeIconType: "contract",
      tags: ["Python", "NLP", "Machine Learning", "Streamlit", "Risk Mitigation"],
      description: "Developed an intelligent automation platform designed to analyze legal contracts against evolving regulatory frameworks. Utilized NLP and Machine Learning models to systematically parse document text, flags non-compliant clauses, and generate detailed structural risk mitigation logs.",
      link: "https://ai-powered-regulatory-compilance-ch.vercel.app/",
      highlights: [
        "NLP-driven clause parsing & indexing",
        "Machine learning regulatory rule comparison",
        "Risk mitigation logging & Streamlit dashboard integration"
      ],
      architectureSteps: [
        "1. [USER INTERFACE]: Legal document text input uploads.",
        "2. [NLP PARSING ENGINE]: Custom parsing and chunk indexing.",
        "3. [ML VERIFIER]: Compares clause embeddings to standard legal rulesets.",
        "4. [RISK MONITOR]: Outputs system violation flags & mitigation logs."
      ]
    },
    {
      id: "proj2",
      title: "SecureMind AI",
      date: "2026",
      category: "AI & ML",
      threeIconType: "shield",
      tags: ["AI", "Privacy Algorithms", "Confidential Computing", "Localized Processing"],
      description: "Engineered an AI-backed mental health data protection and analytics framework focusing on secure, private, and localized processing. Implemented privacy-preserving algorithms alongside a responsive system flow to ensure sensitive user insights remain confidential and contextually accurate.",
      link: "https://secure-mind-ai-zeta.vercel.app/",
      highlights: [
        "Zero-cloud client-side storage validation",
        "Differential privacy algorithm integration",
        "Localized sentiment analysis & machine learning"
      ],
      architectureSteps: [
        "1. [LOCAL STORAGE]: Standard zero-cloud private browser storage limits.",
        "2. [PRIVACY PIPELINE]: Client-side mathematical differential privacy filters.",
        "3. [LOCALIZED ML]: Real-time sentiment analysis models executed locally.",
        "4. [SECURE ENDPOINT]: Guarantees user keys & credentials stay offline."
      ]
    },
    {
      id: "proj3",
      title: "Hollow Socks Product Page",
      date: "2026",
      category: "Full-Stack",
      threeIconType: "shopping-cart",
      tags: ["E-commerce", "Conversion Rate", "Mobile-First", "UX Optimization"],
      description: "Custom product flow with optimized UX and high-performance layout for Hollow Socks.",
      link: "https://hollowsocks.com/products/crew-performance-alpaca-socks?variant=42647235297449",
      highlights: [
        "Custom Bundle Discount Flow",
        "Optimized Product Page UX",
        "Strong Trust & Assurance Integration",
        "Social Proof & Testimonials",
        "Mobile-First Responsive Design"
      ],
      architectureSteps: [
        "1. [PRODUCT INTERFACE]: Responsive crew alpaca performance display.",
        "2. [DISCOUNT ENGINE]: Dynamic custom bundle discount calculation logic.",
        "3. [TRUST MODULE]: Integrated assurances and payment security validation.",
        "4. [FEEDBACK SYSTEM]: Aggregated social proof and testimonial panels."
      ]
    },
    {
      id: "proj4",
      title: "PlumPlay UK",
      date: "2026",
      category: "Full-Stack",
      threeIconType: "database",
      tags: ["Magento 2", "Analytics", "Security", "Speed Optimization"],
      description: "Full CRO overhaul with improved performance and site navigation for PlumPlay UK.",
      link: "https://plumplay.co.uk/",
      highlights: [
        "Magento 2.4.5-P1 Upgrade for Enhanced Security & Stability",
        "Tailored Modules for Checkout, Shipping & Security",
        "User-Centric Category & Navigation Enhancements",
        "Comprehensive Speed Optimization for Better Performance",
        "Integrated GA4 Analytics & Product Customization"
      ],
      architectureSteps: [
        "1. [PLATFORM ENGINE]: Stable Magento 2.4.5-P1 server core.",
        "2. [CUSTOM MODULES]: High efficiency shipping and secure checkout routing.",
        "3. [CATALOG NAVIGATION]: Enhanced product categorization user flow.",
        "4. [METRICS HUB]: Integrated GA4 custom event tracking."
      ]
    },
    {
      id: "proj5",
      title: "Dash into Learning",
      date: "2026",
      category: "Full-Stack",
      threeIconType: "layout",
      tags: ["Shopify Migration", "Liquid Theme", "UX Polish", "Checkout Conversion"],
      description: "Migrated to Shopify with custom theme & optimized checkout for Dash into Learning.",
      link: "https://dashintolearning.com/",
      highlights: [
        "Seamless Migration to Shopify",
        "Custom Shopify Theme Aligned with Brand Identity",
        "Enhanced Site Navigation & User Experience",
        "Optimized Checkout Experience for Higher Conversions",
        "Performance-Forward Improvements & UX Polish"
      ],
      architectureSteps: [
        "1. [SHOPIFY SYSTEM]: High scalability backend and automated products sync.",
        "2. [THEME ENGINE]: Custom Liquid templating and brand visual components.",
        "3. [NAV ROUTING]: Clean search, tags, and category hierarchy.",
        "4. [CONVERSION FLOW]: Tailored checkout flow for minimized bounce rate."
      ]
    },
    {
      id: "proj6",
      title: "Vitamin H2",
      date: "2026",
      category: "Full-Stack",
      threeIconType: "smartphone",
      tags: ["Mobile-First Layout", "Custom Filtering", "Responsive Design"],
      description: "Clean mobile-first layout with custom filtering for Vitamin H2.",
      link: "https://vitaminh2.com/en",
      highlights: [
        "Clean mobile-first layout with custom filtering",
        "Optimized navigation and responsive styling"
      ],
      architectureSteps: [
        "1. [VIEWPORT LAYOUT]: Compact, fluid mobile-first responsive template.",
        "2. [FILTER ENGINE]: Fast, local client-side catalog tag filters.",
        "3. [ASSET LOAD]: Highly compressed imagery and lightweight fonts.",
        "4. [USER JOURNEY]: Frictionless landing page conversion steps."
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["Java (SE 17)", "Python", "C/C++", "JavaScript", "PHP", "Prolog"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["Node.js", "React.js", "Flask", "Flutter", "Bootstrap"]
    },
    {
      category: "Databases",
      items: ["MongoDB", "MySQL", "SQLite"]
    },
    {
      category: "Core Domains",
      items: ["Artificial Intelligence (AI)", "NLP", "Machine Learning (ML)", "Cyber Defense"]
    },
    {
      category: "Cloud & Tools",
      items: ["AWS", "Salesforce", "Git", "GitHub", "Figma"]
    }
  ]
};
