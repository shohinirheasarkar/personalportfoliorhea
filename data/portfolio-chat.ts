export type SuggestedQuestion = {
  id: string;
  question: string;
  placeholderAnswer: string;
};

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: "projects",
    question: "What projects has Rhea worked on?",
    placeholderAnswer:
      "Rhea’s projects span satellite ML (clutter-height modeling, Leo monitoring, airport segmentation), neuroscience (DualStream connectivity, ARL calcium imaging), quantum simulation at LBNL, RL telescope scheduling at UChicago, and this portfolio site—with PDFs and slide decks on the Projects page.",
  },
  {
    id: "dualstream",
    question: "What is DualStream?",
    placeholderAnswer:
      "DualStream Functional Connectivity Inference (UMD, Spring 2026) uses dual-timescale GRU encoders on calcium imaging traces to infer directed neuron-to-neuron connectivity—see the Projects and Research pages for slides and details.",
  },
  {
    id: "ml-experience",
    question: "What ML experience does Rhea have?",
    placeholderAnswer:
      "Experience spans PyTorch pipelines, experiment design, scientific datasets (Fermilab, ARL), and applied ML internships. Skills and roles are summarized on the Resume page and throughout Research.",
  },
  {
    id: "contact",
    question: "How can I contact Rhea?",
    placeholderAnswer:
      "Use the Reach out section in the footer for email, GitHub, and LinkedIn — or open the command palette (⌘K) and jump to Connect links.",
  },
];
