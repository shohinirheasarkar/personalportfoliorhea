export type ResearchInterest = {
  id: string;
  title: string;
  description: string;
};

export const researchInterests: ResearchInterest[] = [
  {
    id: "ml-scientific-discovery",
    title: "Machine learning for scientific discovery",
    description:
      "Applying AI to scientific problems in areas such as neuroscience, healthcare, and space.",
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    description:
      "Exploring how the algorithms we use can be tuned for better performance, interpretability, and to reduce bias.",
  },
  {
    id: "interpretable-ml",
    title: "Interpretable ML",
    description:
      "Building models and visual tools that make learned decisions inspectable for scientists, analysts, and domain experts.",
  },
];

export type FeaturedResearch = {
  statusLabel: string;
  year: number;
  title: string;
  subtitle: string;
  longDescription: string;
  highlights: string[];
  role: string;
  techStack: string[];
  tags: string[];
  writeupHref: string;
  paperPdf: string;
};

export const featuredResearch: FeaturedResearch = {
  statusLabel: "Research · 2024",
  year: 2024,
  title: "Satellite Gateway Placement using ML",
  subtitle:
    "Explainable Geospatial AI for Satellite Ground Station Siting Using LiDAR-Derived Terrain Intelligence",
  longDescription:
    "This work uses machine learning to predict local obstruction height from open geospatial data, improving on fixed ITU land-use clutter assumptions used in radio propagation and satellite ground-station planning. The project trains interpretable regression models on LiDAR-derived labels and global remote-sensing features, showing that LightGBM can predict clutter height more accurately while remaining efficient and explainable. Results include benchmark comparisons, SHAP-based feature analysis, ablation studies, and international validation to support globally deployable RF planning. This work is pending publication at IEEE CASE.",
  highlights: [
    "Built a LightGBM-based pipeline to predict representative clutter height from land-cover, terrain, demographic, thermal, and optical geospatial features",
    "Improved over the ITU-R P.452 baseline with 1.79 m MAE and R² = 0.765, reducing error by over 60%",
    "Used SHAP, ablation studies, and landcover-matched validation to analyze model interpretability and global deployment potential",
  ],
  role: "Machine Learning Technical Lead (led a team of 10+ engineers to develop a state-of-the-art ML pipeline to determine representative clutter height)",
  techStack: [
    "Python",
    "scikit-learn",
    "NumPy",
    "Pandas",
    "SHAP Interpretability",
  ],
  tags: [
    "Machine Learning",
    "Satellite",
    "Interpretability",
    "Open-Source",
  ],
  writeupHref:
    "https://drive.google.com/file/d/1SlRuOhTpmkgAvjNH19U4-5BH7kl2Yqed/view?usp=sharing",
  paperPdf: "/research/paper1.pdf",
};

export type ResearchProject = {
  id: string;
  organization: string;
  date: string;
  title: string;
  description: string;
  highlights: string[];
  projectHref: string;
  /** Optional local PDF (poster, slides) in /public/research */
  documentPdf?: string;
  documentLabel?: string;
};

/** Projects with local PDFs first (most compelling first), then external-link-only. */
export const researchProjects: ResearchProject[] = [
  {
    id: "arl-summer-2025",
    organization: "Army Research Lab",
    date: "Summer 2025",
    title: "Neuron–Astrocyte Communication & Functional Connectivity",
    description:
      "This project investigates neuron–astrocyte communication, improves pipelines for extracting meaningful spike activity from fluorescence traces, and applies functional connectivity methods to understand how neurons influence one another.",
    highlights: [
      "Developed calcium trace analysis workflows using CaImAn-style processing, denoising, deconvolution, and peak-detection methods including template matching, CASCADE, z-score thresholding, Savitzky-Golay smoothing, and wavelet denoising",
      "Built functional connectivity approaches to infer relationships between neurons, including logistic-regression-based prediction matrices and experiments with Granger causality and Adaptive Higher Order Coordination methods",
    ],
    projectHref:
      "https://drive.google.com/file/d/1cN1lMOO4pTaimbgfs4h9XiOTUDOLnSNJ/view?usp=sharing",
    documentPdf: "/research/arlposter.pdf",
    documentLabel: "View poster (PDF)",
  },
  {
    id: "umd-dualstream-spring-2026",
    organization: "University of Maryland",
    date: "Spring 2026",
    title: "DualStream Functional Connectivity Inference",
    description:
      "DualStream Functional Connectivity Inference explores whether calcium imaging traces can be used to infer directed neuron-to-neuron connectivity without relying on a long traditional pipeline of segmentation, spike extraction, peak detection, and Granger-style postprocessing. The project proposes a dual-timescale model inspired by Brain-Mamba, where a shared temporal encoder learns patterns in each neuron’s calcium trace before splitting the representation into fast and slow streams. The fast stream is used to estimate directed neural communication, while the slow stream captures astrocyte-related, modulatory, or background dynamics that may otherwise confuse the connectivity estimate.",
    highlights: [
      "Designed an end-to-end pipeline that preprocesses ΔF/F calcium traces, segments recordings into temporal windows, benchmarks baseline connectivity methods, and returns a directed connectivity matrix",
      "Implemented a prototype temporal encoder using GRUs to learn time-dependent neural activity patterns before separating latent representations into fast neuronal and slow modulatory streams",
      "Compared against Pearson correlation, lagged correlation, and Granger causality baselines while planning future upgrades to full Mamba/selective state-space modules and training on real data",
    ],
    projectHref:
      "https://docs.google.com/presentation/d/1sF1XRkH8Be5mYlKKSMWSRF_XD3WtmunAnLIlTEUdXvM/edit?usp=sharing",
    documentPdf: "/research/losertpresospring.pdf",
    documentLabel: "View slides (PDF)",
  },
  {
    id: "leo-dashboard-fall-2024",
    organization: "Amazon Project Leo",
    date: "Fall 2024 Semester",
    title: "Project Leo Satellite Monitoring Dashboard",
    description:
      "Project Leo Satellite Monitoring Dashboard explores whether machine learning and full-stack visualization can help identify anomalous satellite behavior and predict when parked satellites transition into operational orbit. The project uses historical TLE data from Space-Track, engineered orbital features, and models such as XGBoost, C-LSTM, Transformers, HDBSCAN, and Isolation Forest to support satellite monitoring, parking-status prediction, and anomaly detection. Results are presented through an interactive dashboard with confidence visualizations, model comparisons, and orbit-behavior graphs for more informed satellite operations analysis.",
    highlights: [
      "Built machine learning pipelines to classify satellites as parking or operational using historical TLE data and engineered orbital features",
      "Compared XGBoost, C-LSTM, Transformer, HDBSCAN, and Isolation Forest models for parking prediction and anomaly detection",
      "Developed dashboard visualizations for satellite monitoring, confidence analysis, orbital-element trends, and anomalous-behavior detection",
    ],
    projectHref:
      "https://docs.google.com/presentation/d/1tKtJBIVN0h29yyzfFnK1NCUoe5qw7-ab/edit?usp=sharing&ouid=105673530550827954201&rtpof=true&sd=true",
    documentPdf: "/research/amznfalldemo24.pdf",
    documentLabel: "View slides (PDF)",
  },
  {
    id: "lbnl-2022",
    organization: "Lawrence Berkeley National Laboratory",
    date: "Summer 2022",
    title: "Quantum Simulation for Chemistry & Materials",
    description:
      "This project explores how quantum computer simulators can model molecular and material behavior through hybrid quantum-classical optimization. The project uses the Variational Quantum Eigensolver to estimate molecular ground-state energies across interatomic distances, compares optimizer performance across COBYLA, SLSQP, and SPSA, and experiments with IBM quantum backends and simulators. Additional simulations modeled magnetization dynamics in rhenium-doped MoSe₂ under different excitation factors, with readout error mitigation used to reduce the gap between noisy and ideal quantum outputs.",
    highlights: [
      "Implemented VQE-based chemistry simulations to estimate molecular energy curves by iteratively optimizing wavefunction parameters across interatomic distances",
      "Compared quantum simulation backends, optimizers, and iteration counts to improve convergence and reduce local-minimum issues in molecular energy prediction",
      "Simulated magnetization behavior in rhenium-doped MoSe₂ and implemented readout error mitigation to compare ideal, noisy, and corrected quantum outputs",
    ],
    projectHref:
      "https://docs.google.com/presentation/d/1-Ydh__FEOTbwPcYafWYqDqKxTCEbKyL4QKaAtx8zknE/edit?slide=id.p2#slide=id.p2",
    documentPdf: "/research/lbnlpreso.pdf",
    documentLabel: "View presentation (PDF)",
  },
  {
    id: "leo-airport-fall-2025",
    organization: "Amazon Project Leo",
    date: "Fall 2025 Semester",
    title: "Airport Boundary Generator",
    description:
      "Airport Boundary Generator uses computer vision and geospatial processing to automatically create airport exclusion-zone boundaries from latitude and longitude inputs. The project addresses the slow and inconsistent process of manually drawing airport exclusion zones by training a U-Net segmentation model on satellite imagery and binary airport masks, then postprocessing the predicted masks into usable polygon shapefiles. The system achieved strong segmentation performance with IoU above 0.90 and supports faster airport-boundary generation for planning, mapping, and exclusion-zone analysis.",
    highlights: [
      "Built a U-Net-based image segmentation pipeline to detect airport boundaries from satellite imagery at the pixel level",
      "Expanded and prepared training data using HDX airport boundary masks, ArcGIS airport metadata, and generated satellite image crops across European airports",
      "Developed postprocessing and shapefile conversion steps using morphological filtering, contour cleanup, convex hull generation, and georeferenced polygon export",
    ],
    projectHref:
      "https://www.canva.com/design/DAG6-lPOWlk/0AakfvzyyXHSIFPYcYYzZg/view?utm_content=DAG6-lPOWlk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h6eea30775c#5",
  },
  {
    id: "uchicago-dsi-2023",
    organization: "University of Chicago Data Science Institute",
    date: "Summer 2023",
    title: "RL for Astronomical Observation Scheduling",
    description:
      "This project explores how reinforcement learning can automate astronomical observation scheduling by helping telescopes decide where to point based on scientific priorities and changing sky conditions. The project uses an online telescope simulation environment where an RL agent learns to choose right ascension and declination actions, receive rewards, and update its policy over time. Multiple RL algorithms and hyperparameter settings were tested across different wavelength bands, with reward shaping and tuning used to improve sustained training performance.",
    highlights: [
      "Developed reinforcement learning agents to optimize telescope observation scheduling using simulated sky conditions, telescope actions, and reward-based policy updates",
      "Tuned PPO-style hyperparameters, including gamma, update steps, and clipping range, to improve reward stability and long-term learning performance",
      "Built visualizations to evaluate model behavior across wavelength bands, analyze system response, and identify future improvements for rare-event observation tasks like fast radio burst detection",
    ],
    projectHref:
      "https://datascience.uchicago.edu/people/shohini-sarkar/",
  },
];

export type ResearchExperience = {
  id: string;
  date: string;
  organization: string;
  role: string;
  description: string;
  projectHref?: string;
};

export const researchExperience: ResearchExperience[] = [
  {
    id: "arl-2025",
    date: "May 2025 — Present",
    organization: "U.S. Army Research Laboratory",
    role: "Research Intern",
    description:
      "Applied machine learning and scientific computing to defense research problems—developing reproducible pipelines, running controlled experiments, and collaborating with researchers on analysis and reporting.",
    projectHref: "/research",
  },
  {
    id: "fermilab-2023",
    date: "Jun 2023 — Aug 2023",
    organization: "Fermi National Accelerator Laboratory",
    role: "Research Intern",
    description:
      "Supported particle physics research through large-scale data processing, analysis tooling, and documentation for scientific datasets used in collaboration-wide studies.",
    projectHref: "/research",
  },
  {
    id: "umd-research",
    date: "2023 — Present",
    organization: "University of Maryland",
    role: "Undergraduate Researcher",
    description:
      "Coursework- and lab-adjacent research spanning machine learning, neuroscience-inspired modeling, and open-source scientific software across independent and collaborative projects.",
    projectHref: "/projects",
  },
];

export type ResearchOutputItem = {
  title: string;
  href: string;
};

export type ResearchOutputCategory = {
  id: string;
  title: string;
  description: string;
  items: ResearchOutputItem[];
};

export const researchOutputCategories: ResearchOutputCategory[] = [
  {
    id: "publications",
    title: "Publications",
    description: "Written research and technical reports.",
    items: [
      {
        title:
          "Explainable Geospatial AI for Satellite Ground Station Siting Using LiDAR-Derived Terrain Intelligence (pending publication at IEEE CASE)",
        href: "/research/paper1.pdf",
      },
    ],
  },
  {
    id: "posters",
    title: "Posters",
    description: "Conference and symposium posters.",
    items: [
      {
        title: "Neuron–Astrocyte Communication & Functional Connectivity (ARL)",
        href: "/research/arlposter.pdf",
      },
    ],
  },
  {
    id: "presentations",
    title: "Presentations",
    description: "Talks, demos, and lab presentations.",
    items: [
      {
        title: "Project Leo Satellite Monitoring Dashboard (Amazon, Fall 2024)",
        href: "/research/amznfalldemo24.pdf",
      },
      {
        title: "DualStream Functional Connectivity Inference (UMD, Spring 2026)",
        href: "/research/losertpresospring.pdf",
      },
      {
        title: "Quantum Simulation for Chemistry & Materials (LBNL, Summer 2022)",
        href: "/research/lbnlpreso.pdf",
      },
    ],
  },
];
