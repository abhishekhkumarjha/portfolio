import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  name: "Abhishekh Kumar Jha",
  title: "AI/ML & Cybersecurity Engineer | Full-Stack Developer",
  email: ["avishekhjhaaj@gmail.com", "abhishekh_kumarjha@srmap.edu.in"],
  phone: ["+977-9702529061", "+91-7479716648"],
  linkedin: "https://www.linkedin.com/in/abhishekh-kumar-jha-9788a9420?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/abhishekhkumarjha",
  summary: "Innovative and driven Computer Science Engineering student with a passion for building intelligent, secure, and scalable solutions. Combining a solid foundation in full-stack development and AI-driven automation with hands-on industry experience in cybersecurity and machine learning. Oracle and MongoDB Certified Professional with proven academic and practical experience in cloud computing, database engineering, and building automated risk-mitigation software platforms.",
  experience: [
    {
      id: "exp-cloudinntech-aiml",
      role: "AI/ML Intern",
      company: "Cloudinntech",
      period: "Jul 2026 - Present",
      location: "Enterprise / Remote",
      bullets: [
        "Design and optimize machine learning models and NLP workflows to automate data processing and enhance predictive accuracy.",
        "Collaborate with cross-functional teams to integrate AI-driven features into core software platforms using Python and relevant frameworks."
      ]
    },
    {
      id: "exp-cloudinntech-cyber",
      role: "Cybersecurity Intern",
      company: "Cloudinntech",
      period: "Apr 2026 - Jun 2026",
      location: "Enterprise / Remote",
      bullets: [
        "Monitored network infrastructure and analyzed traffic anomalies to proactively identify and isolate potential security threats.",
        "Assisted in implementing privacy-preserving protocols and secure system architectures to safeguard sensitive application data."
      ]
    },
    {
      id: "exp-infosys",
      role: "Infosys Springboard Intern",
      company: "Infosys (Virtual)",
      period: "Feb 2026 - Apr 2026",
      location: "Virtual",
      bullets: [
        "Participated in Springboard 6.0, gaining hands-on exposure to industry-standard enterprise software engineering practices and advanced professional tracks.",
        "Successfully engineered and deployed the mandatory assignment project: \"AI-Powered Regulatory Compliance Checker for Contracts\"."
      ]
    },
    {
      id: "exp-salesforce",
      role: "Salesforce Virtual Intern",
      company: "SmartBridge & SRM University AP (Virtual)",
      period: "May 2025 - Aug 2025",
      location: "Virtual",
      bullets: [
        "Completed over 100 hours of rigorous technical training and cloud project development; earned professional Superbadges in Apex programming and Lightning Web Components (LWC)."
      ]
    },
    {
      id: "exp-jnj",
      role: "Robotics & AWS Architecture Intern",
      company: "Johnson & Johnson MedTech | Forage (Job Simulations)",
      period: "Apr 2025 - Jun 2025",
      location: "Job Simulations",
      bullets: [
        "Optimized surgical robotic arm mathematical tracking and performance metrics utilizing Python, translating data into design modifications for increased hardware durability.",
        "Designed scalable, fault-tolerant architecture using AWS Elastic Beanstalk to address complex high-growth client traffic performance issues."
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
      github: "https://github.com/abhishekhkumarjha/AI_Powered_Regulatory_Compilance_Checker_for_Contracts",
      highlights: [
        "Systematic NLP & Machine Learning parsing of legal contract text",
        "Automated identification and flagging of non-compliant clauses",
        "Detailed structural risk mitigation logging and reporting dashboard"
      ],
      architectureSteps: [
        "1. [DOCUMENT INGESTION]: Legal contract text ingestion & chunk indexing.",
        "2. [NLP PARSING ENGINE]: Semantic chunking, clause extraction, and NLP parsing.",
        "3. [ML VERIFIER]: Real-time regulatory rule comparison & risk scoring.",
        "4. [RISK LOGGING]: Automated structural risk mitigation logs & dashboard export."
      ]
    },
    {
      id: "proj2",
      title: "SecureMind AI",
      date: "2026",
      category: "AI & ML",
      threeIconType: "shield",
      tags: ["AI Analytics", "Privacy Protocols", "Mental Health Data", "Localized Processing"],
      description: "Engineered an AI-backed mental health data protection and analytics framework focusing on secure, private, and localized processing. Implemented privacy-preserving algorithms alongside a responsive system flow to ensure sensitive user insights remain confidential and contextually accurate.",
      link: "https://secure-mind-ai-zeta.vercel.app/",
      github: "https://github.com/abhishekhkumarjha/secureMindAI",
      highlights: [
        "Zero-cloud localized processing architecture protecting confidential mental health data",
        "Mathematical privacy-preserving algorithms safeguarding confidential insights",
        "Responsive system flow ensuring insights remain contextually accurate"
      ],
      architectureSteps: [
        "1. [CLIENT GATEWAY]: Sensitive user data intake strictly bounded to local memory.",
        "2. [PRIVACY ALGORITHMS]: Differential privacy mathematical filters and localized encryption.",
        "3. [LOCALIZED ML]: Responsive on-device analytics evaluating sentiment and trends.",
        "4. [SECURE DELIVERY]: Confidential insights presentation layer with zero-cloud leakage."
      ]
    },
    {
      id: "proj3",
      title: "Antigena AI Defense System",
      date: "2026",
      category: "Cyber & Security",
      threeIconType: "network",
      tags: ["Cyber Defense", "Autonomous Threat Response", "Anomaly Detection", "Network Integrity"],
      description: "Designed a cyber defense simulation framework modeled after autonomous threat response patterns. Built smart validation logic to continuously monitor infrastructure traffic anomalies, isolating malicious attack signatures while maintaining overall network integrity.",
      github: "https://github.com/abhishekhkumarjha/antigena_ai_defense_system",
      highlights: [
        "Cyber defense simulation modeled after autonomous threat response patterns",
        "Smart validation logic continuously monitoring infrastructure traffic anomalies",
        "Autonomous isolation of malicious attack signatures while preserving network integrity"
      ],
      architectureSteps: [
        "1. [TRAFFIC INGESTION]: Real-time telemetry monitoring network infrastructure packets.",
        "2. [ANOMALY DETECTION]: Smart validation logic analyzing traffic deviation patterns.",
        "3. [AUTONOMOUS RESPONSE]: Immediate isolation of malicious attack signatures.",
        "4. [RESILIENCE ENGINE]: Dynamic mitigation preserving core network integrity & uptime."
      ]
    },
    {
      id: "proj4",
      title: "OceanGuardian Disaster Management System",
      date: "2026",
      category: "Full-Stack",
      threeIconType: "globe",
      tags: ["Crisis Response", "Geographic Data", "Contextual Streams", "Resource Allocation", "Dispatch Tracking"],
      description: "Developed an integrated disaster crisis response blueprint leveraging rapid-coordination workflows. Engineered logic handling for geographic and contextual data streams to optimize resource allocation, dispatch tracking, and resilience metrics during complex environmental threats.",
      github: "https://github.com/rjb-meerkat-hx/OceanGuardian_disaster_management",
      highlights: [
        "Integrated disaster crisis response blueprint leveraging rapid-coordination workflows",
        "High-performance logic handling for streaming geographic and contextual data",
        "Optimized resource allocation, dispatch tracking, and resilience metrics"
      ],
      architectureSteps: [
        "1. [GEO-STREAM INGESTION]: Real-time ingestion of geographic coordinates & hazard telemetry.",
        "2. [SPATIAL LOGIC ENGINE]: Dynamic multi-vector crisis classification & threat radius mapping.",
        "3. [DISPATCH TRACKING]: Algorithmic resource allocation balancing proximity & urgency.",
        "4. [RESILIENCE METRICS]: Integrated situational awareness dashboard for environmental threats."
      ]
    }
  ],
  skills: [
    {
      category: "Core Domains",
      items: ["Artificial Intelligence (AI)", "NLP", "Machine Learning (ML)", "Cyber Defense"]
    },
    {
      category: "Languages",
      items: ["Java (SE 17)", "Python", "C/C++", "JS", "PHP", "Prolog"]
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
      category: "Cloud & Tools",
      items: ["AWS", "Salesforce", "Git", "GitHub", "Figma"]
    }
  ],
  certifications: [
    {
      name: "Certificate of Internship in Cybersecurity",
      date: "Jun 2026",
      authority: "Cloudinntech",
      credLink: ""
    },
    {
      name: "Oracle Certified Professional (Java SE 17)",
      date: "Mar 2026",
      authority: "Oracle",
      credLink: ""
    },
    {
      name: "MongoDB Certified Associate Developer",
      date: "May 2026",
      authority: "MongoDB / Credly",
      credLink: "https://credly.com/go/FZUSnFxI"
    },
    {
      name: "Infosys Springboard Certification",
      date: "Jun 2026",
      authority: "Infosys / Springboard",
      credLink: "https://verify.onwingspan.com"
    },
    {
      name: "Salesforce Developer Champion",
      date: "Aug 2025",
      authority: "Salesforce / SmartBridge",
      credLink: ""
    }
  ],
  events: {
    hackathons: [
      {
        title: "JPD Hub Hackathon (Advitiya'26)",
        organizerOrRole: "Participant",
        date: "Advitiya'26"
      },
      {
        title: "Eonverse (Team X-CUTION)",
        organizerOrRole: "Odoo 24h Comp.",
        date: "24h Comp."
      }
    ]
  }
};
