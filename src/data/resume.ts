import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  name: "Abhishekh Kumar Jha",
  title: "AI Engineer & Cybersecurity Specialist",
  email: "abhishek.jha@cloudinntech.co.in",
  phone: ["+977-9702529061", "+91-7479716648"],
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
      description: "Developed an intelligent automation platform designed to analyze legal contracts against evolving regulatory frameworks. Utilized NLP and Machine Learning models to systematically parse document text, flags non-compliant clauses, and generate detailed structural risk mitigation logs."
    },
    {
      id: "proj2",
      title: "SecureMind AI",
      date: "2026",
      category: "AI & ML",
      threeIconType: "shield",
      tags: ["AI", "Privacy Algorithms", "Confidential Computing", "Localized Processing"],
      description: "Engineered an AI-backed mental health data protection and analytics framework focusing on secure, private, and localized processing. Implemented privacy-preserving algorithms alongside a responsive system flow to ensure sensitive user insights remain confidential and contextually accurate."
    },
    {
      id: "proj3",
      title: "Antigena AI Defense System",
      date: "2026",
      category: "Cyber & Security",
      threeIconType: "network",
      tags: ["Cyber Defense", "AI", "Traffic Anomaly Detection", "Threat Response"],
      description: "Designed a cyber defense simulation framework modeled after autonomous threat response patterns. Built smart validation logic to continuously monitor infrastructure traffic anomalies, isolating malicious attack signatures while maintaining overall network integrity."
    },
    {
      id: "proj4",
      title: "OceanGuardian Disaster Management System",
      date: "2026",
      category: "Full-Stack",
      threeIconType: "globe",
      tags: ["Disaster Tech", "Geographic Streams", "Resource Allocation", "React", "Node.js"],
      description: "Developed an integrated disaster crisis response blueprint leveraging rapid-coordination workflows. Engineered logic handling for geographic and contextual data streams to optimize resource allocation, dispatch tracking, and resilience metrics during complex environmental threats."
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
