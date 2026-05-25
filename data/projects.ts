export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectCategory =
  | "machine-learning"
  | "research"
  | "data-visualization"
  | "scientific-computing"
  | "web-development";

export type ProjectSection =
  | "satellite"
  | "neuroscience"
  | "science"
  | "personal";

export type ProjectLinkType = "demo" | "repo" | "paper" | "writeup" | "external";

export type ProjectLink = {
  label: string;
  href: string;
  type: ProjectLinkType;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  organization: string;
  period: string;
  description: string;
  longDescription: string;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  section: ProjectSection;
  category: ProjectCategory;
  tags: string[];
  techStack: string[];
  links: ProjectLink[];
  highlights: string[];
  role: string;
};

export const projectSectionLabels: Record<ProjectSection, string> = {
  satellite: "Satellite & geospatial",
  neuroscience: "Neuroscience & imaging",
  science: "Scientific computing & astronomy",
  personal: "Design & engineering",
};

export const projectSectionOrder: ProjectSection[] = [
  "satellite",
  "neuroscience",
  "science",
  "personal",
];

export const projects: Project[] = [
  {
    slug: "satellite-clutter-height",
    title: "Satellite Gateway Placement using ML",
    subtitle:
      "Predicting local obstruction height from open geospatial data",
    organization: "Amazon Project Leo",
    period: "2024",
    description:
      "Machine learning models that predict how tall local obstacles are using open map and land data—helping improve radio planning for satellite ground stations compared with fixed land-use assumptions.",
    longDescription:
      "The project trains clear, interpretable regression models on laser-measured height labels and global remote-sensing features. LightGBM outperformed the standard ITU approach while staying efficient, with feature analysis and validation tests to support use worldwide.",
    year: 2024,
    status: "completed",
    featured: true,
    section: "satellite",
    category: "machine-learning",
    tags: [
      "Machine Learning",
      "Satellite",
      "Interpretability",
      "Geospatial",
      "LightGBM",
    ],
    techStack: ["Python", "scikit-learn", "NumPy", "Pandas", "SHAP"],
    links: [
      {
        label: "Project write-up",
        href: "https://drive.google.com/file/d/1SlRuOhTpmkgAvjNH19U4-5BH7kl2Yqed/view?usp=sharing",
        type: "writeup",
      },
      {
        label: "Paper (PDF)",
        href: "/research/paper1.pdf",
        type: "paper",
      },
    ],
    highlights: [
      "Built a LightGBM pipeline using land cover, terrain, population, temperature, and optical map features",
      "Reduced error by over 60% compared with the ITU-R P.452 baseline (1.79 m average error, R² = 0.765)",
      "Used SHAP analysis and validation tests to study interpretability and global deployment",
    ],
    role: "Machine Learning Technical Lead",
  },
  {
    slug: "leo-satellite-dashboard",
    title: "Project Leo Satellite Monitoring Dashboard",
    subtitle: "Machine learning and visualization for satellite monitoring",
    organization: "Amazon Project Leo",
    period: "Fall 2024",
    description:
      "Explores whether machine learning and interactive charts can help spot unusual satellite behavior and predict when parked satellites begin normal operations, using historical orbit records and engineered movement features.",
    longDescription:
      "The work compares several model types for parking-status prediction and anomaly detection, then presents results in a dashboard with confidence views, model comparisons, and orbit-behavior graphs.",
    year: 2024,
    status: "completed",
    featured: true,
    section: "satellite",
    category: "machine-learning",
    tags: ["Satellite", "Anomaly detection", "Dashboard", "Machine learning"],
    techStack: ["Python", "XGBoost", "PyTorch", "HDBSCAN", "Pandas"],
    links: [
      {
        label: "Presentation",
        href: "https://docs.google.com/presentation/d/1tKtJBIVN0h29yyzfFnK1NCUoe5qw7-ab/edit?usp=sharing",
        type: "external",
      },
      {
        label: "Slides (PDF)",
        href: "/research/amznfalldemo24.pdf",
        type: "paper",
      },
    ],
    highlights: [
      "Built pipelines to classify satellites as parked or operational from historical orbit data",
      "Compared gradient boosting, sequence models, transformers, and clustering methods",
      "Developed dashboard views for monitoring, confidence, orbit trends, and anomalies",
    ],
    role: "ML engineer & visualization developer",
  },
  {
    slug: "leo-airport-boundary",
    title: "Airport Boundary Generator",
    subtitle: "Automatic airport exclusion zones from satellite imagery",
    organization: "Amazon Project Leo",
    period: "Fall 2025",
    description:
      "Uses computer vision and map processing to draw airport exclusion-zone boundaries from coordinates, training a U-Net on satellite images and masks and exporting usable map polygon files.",
    longDescription:
      "The system addresses slow manual boundary drawing by segmenting airports from imagery, cleaning predicted masks, and converting them into georeferenced shapefiles—with strong overlap scores above 0.90 on held-out data.",
    year: 2025,
    status: "completed",
    featured: false,
    section: "satellite",
    category: "machine-learning",
    tags: ["Computer vision", "U-Net", "Geospatial", "Segmentation"],
    techStack: ["Python", "PyTorch", "OpenCV", "ArcGIS", "GeoPandas"],
    links: [
      {
        label: "Project deck",
        href: "https://www.canva.com/design/DAG6-lPOWlk/0AakfvzyyXHSIFPYcYYzZg/view?utm_content=DAG6-lPOWlk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h6eea30775c#5",
        type: "external",
      },
    ],
    highlights: [
      "Built a U-Net pipeline to detect airport boundaries at the pixel level from satellite imagery",
      "Prepared training data using public airport masks, map metadata, and image crops across European airports",
      "Converted cleaned masks into shapefiles with filtering, contour cleanup, and polygon export",
    ],
    role: "ML engineer",
  },
  {
    slug: "dualstream-connectivity",
    title: "DualStream Functional Connectivity Inference",
    subtitle: "Directed connectivity from calcium imaging traces",
    organization: "University of Maryland · Losert Lab",
    period: "Spring 2026",
    description:
      "Studies whether calcium imaging traces can support directed neuron-to-neuron connectivity estimates without a long pipeline of segmentation, spike extraction, peak detection, and follow-up statistics.",
    longDescription:
      "The project uses a dual-timescale model: a shared encoder learns patterns in each neuron’s trace, then splits into a fast stream for neural communication and a slow stream for background or supporting-cell dynamics that may affect the estimate.",
    year: 2026,
    status: "in-progress",
    featured: true,
    section: "neuroscience",
    category: "research",
    tags: [
      "Neuroscience",
      "Calcium imaging",
      "Functional connectivity",
      "Deep learning",
    ],
    techStack: ["Python", "PyTorch", "NumPy", "pandas"],
    links: [
      {
        label: "Presentation",
        href: "https://docs.google.com/presentation/d/1sF1XRkH8Be5mYlKKSMWSRF_XD3WtmunAnLIlTEUdXvM/edit?usp=sharing",
        type: "external",
      },
      {
        label: "Slides (PDF)",
        href: "/research/losertpresospring.pdf",
        type: "paper",
      },
    ],
    highlights: [
      "Designed an end-to-end pipeline for trace preprocessing, time windows, baseline methods, and connectivity matrices",
      "Implemented a temporal encoder that separates fast neural and slow background representations",
      "Compared against correlation and Granger-style baselines; planning upgrades with newer sequence models",
    ],
    role: "Undergraduate researcher",
  },
  {
    slug: "arl-neuron-astrocyte",
    title: "Neuron–Astrocyte Communication & Functional Connectivity",
    subtitle: "Calcium trace analysis and connectivity methods",
    organization: "U.S. Army Research Laboratory",
    period: "Summer 2025",
    description:
      "Investigates neuron–astrocyte communication, improves pipelines for extracting meaningful activity from fluorescence traces, and applies connectivity methods to understand how neurons influence one another.",
    longDescription:
      "Work includes calcium trace processing, denoising, peak detection, and building connectivity approaches such as prediction matrices and experiments with time-based influence measures.",
    year: 2025,
    status: "completed",
    featured: false,
    section: "neuroscience",
    category: "scientific-computing",
    tags: [
      "Neuroscience",
      "Calcium imaging",
      "Functional connectivity",
      "Signal processing",
    ],
    techStack: ["Python", "NumPy", "SciPy", "CaImAn", "pandas"],
    links: [
      {
        label: "Poster (Drive)",
        href: "https://drive.google.com/file/d/1cN1lMOO4pTaimbgfs4h9XiOTUDOLnSNJ/view?usp=sharing",
        type: "external",
      },
      {
        label: "Poster (PDF)",
        href: "/research/arlposter.pdf",
        type: "paper",
      },
    ],
    highlights: [
      "Developed calcium trace workflows with denoising, deconvolution, and multiple peak-detection approaches",
      "Built connectivity methods to infer relationships between neurons, including regression-based matrices",
      "Experimented with time-based influence measures and higher-order coordination methods",
    ],
    role: "Research intern",
  },
  {
    slug: "uchicago-rl-telescope",
    title: "RL for Astronomical Observation Scheduling",
    subtitle: "Automating telescope pointing in simulation",
    organization: "University of Chicago Data Science Institute",
    period: "Summer 2023",
    description:
      "Explores how reinforcement learning can help schedule astronomical observations by choosing where a telescope should point based on science goals and changing sky conditions in an online simulation.",
    longDescription:
      "An agent learns to select pointing actions, receive rewards, and update its policy over time. Multiple algorithms and settings were tested across wavelength bands, with tuning to improve stable long-term learning.",
    year: 2023,
    status: "completed",
    featured: false,
    section: "science",
    category: "machine-learning",
    tags: [
      "Reinforcement learning",
      "Astronomy",
      "Simulation",
      "Policy optimization",
    ],
    techStack: ["Python", "RLlib", "NumPy", "matplotlib"],
    links: [
      {
        label: "DSI profile",
        href: "https://datascience.uchicago.edu/people/shohini-sarkar/",
        type: "external",
      },
    ],
    highlights: [
      "Developed agents to optimize observation scheduling using simulated sky conditions and rewards",
      "Tuned PPO-style settings to improve reward stability and long-term learning",
      "Built visualizations across wavelength bands to evaluate behavior and rare-event goals",
    ],
    role: "Research intern",
  },
  {
    slug: "lbnl-quantum-simulation",
    title: "Quantum Simulation for Chemistry & Materials",
    subtitle: "Molecular energies and materials on quantum simulators",
    organization: "Lawrence Berkeley National Laboratory",
    period: "Summer 2022",
    description:
      "Explores how quantum computer simulators can model molecules and materials by combining quantum and classical optimization, comparing optimizers and testing IBM quantum backends and simulators.",
    longDescription:
      "Work includes estimating molecular ground-state energies across atom distances, studying magnetization in doped materials, and applying readout error correction to compare ideal, noisy, and corrected outputs.",
    year: 2022,
    status: "completed",
    featured: false,
    section: "science",
    category: "scientific-computing",
    tags: ["Quantum computing", "Chemistry", "Materials", "Simulation"],
    techStack: ["Python", "Qiskit", "NumPy", "matplotlib"],
    links: [
      {
        label: "Presentation",
        href: "https://docs.google.com/presentation/d/1-Ydh__FEOTbwPcYafWYqDqKxTCEbKyL4QKaAtx8zknE/edit?slide=id.p2#slide=id.p2",
        type: "external",
      },
      {
        label: "Slides (PDF)",
        href: "/research/lbnlpreso.pdf",
        type: "paper",
      },
    ],
    highlights: [
      "Implemented chemistry simulations to estimate energy curves across atom distances",
      "Compared simulation backends and optimizers to improve convergence",
      "Modeled magnetization behavior and applied readout error mitigation on noisy hardware",
    ],
    role: "Research intern",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    subtitle: "Personal site for research, projects, art, and writing",
    organization: "Personal",
    period: "2025 — Present",
    description:
      "A portfolio built with modern web tools, combining research, software projects, writing, and art with responsive layout, dark mode, and motion that respects reduced-motion preferences.",
    longDescription:
      "Uses the Next.js App Router, typed content modules, reusable UI components, and shared visual patterns so new sections can be added without major structural changes.",
    year: 2026,
    status: "in-progress",
    featured: false,
    section: "personal",
    category: "web-development",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
    links: [{ label: "Live site", href: "/", type: "demo" }],
    highlights: [
      "Structured content as typed data modules under /data",
      "Command palette, theme toggle, and portfolio chat",
      "Consistent glass, gradient, and motion styling across pages",
    ],
    role: "Designer & full-stack developer",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(
  category: ProjectCategory,
): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getProjectsBySection(section: ProjectSection): Project[] {
  return projects.filter((project) => project.section === section);
}
