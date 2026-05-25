export type TimelineEntry = {
  id: string;
  date: string;
  organization: string;
  role: string;
  description: string;
  highlights?: string[];
  projectHref?: string;
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: "amazon-2026",
    date: "Summer 2026",
    organization: "Amazon",
    role: "Software Development Engineer Intern",
    description: "Incoming summer 2026.",
    projectHref: "/projects",
  },
  {
    id: "ucsf-tensorlab",
    date: "May 2026",
    organization: "UCSF Medical School",
    role: "TensorLab Fellow",
    description:
      "Incoming summer research fellow, using AI to better diagnose Greater Trochanteric Pain Syndrome and improve women's health outcomes.",
    projectHref: "/research",
  },
  {
    id: "arl-2024-2025",
    date: "Sep 2024 – May 2025",
    organization: "Army Research Laboratory",
    role: "Summer Research Intern",
    description: "",
    highlights: [
      "Designed deep learning enabled peak detection pipelines to extract neuronal firing events from calcium imaging data",
      "Developed neural connectivity pipelines using logistic regression to quantify neuron–neuron influence",
      "Processed over 2TB of two-photon imaging data using custom scripts to produce analysis-ready formats",
    ],
    projectHref: "/research",
  },
  {
    id: "umd-app-dev-leo",
    date: "2023 – 2025",
    organization: "UMD App Dev Club in collaboration with Amazon Project Leo",
    role: "Machine Learning Technical Lead",
    description:
      "Promoted from ML Engineer to Technical Lead, directing a 10+ person team working on satellite ML systems.",
    highlights: [
      "Designed satellite state transition classifiers to achieve 97% accuracy across multi-class prediction tasks",
      "Developed a clutter height prediction pipeline using feature engineering to improve accuracy from 44% to 76%",
    ],
    projectHref: "/projects",
  },
  {
    id: "fermilab-2023",
    date: "Jun 2023",
    organization:
      "Fermi National Laboratory / University of Chicago Data Science Institute",
    role: "AI Research Intern",
    description: "",
    highlights: [
      "Developed RL agents using policy optimization to automate telescope positioning for astronomical event detection",
      "Tuned exploration strategies and reward functions in resource-constrained environments; presented findings at the UChicago DSI Symposium",
    ],
    projectHref: "/research",
  },
  {
    id: "lbnl-2022",
    date: "Jun 2022",
    organization: "Lawrence Berkeley National Laboratory",
    role: "Quantum Computing Research Intern",
    description: "",
    highlights: [
      "Implemented the Variational Quantum Eigensolver using Qiskit to compute molecular ground state energies across multiple quantum backends",
      "Contributed to readout error mitigation algorithms to improve quantum error correction accuracy",
    ],
    projectHref: "/research",
  },
  {
    id: "ucsf-sirota-2021",
    date: "Jun 2021",
    organization: "UCSF Sirota Lab",
    role: "AI4ALL Research Assistant",
    description: "",
    highlights: [
      "Utilized AI to extract enhancer vs. non-enhancer regions from DNA sequences",
      "Participated in machine learning workshops and keynotes from leading researchers in AI and medicine at UCSF",
    ],
    projectHref: "/research",
  },
];
