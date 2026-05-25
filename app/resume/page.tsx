import type { Metadata } from "next";

import { ResumeView } from "@/components/resume/resume-view";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Shohini Rhea Sarkar — machine learning, research software, and full-stack engineering experience.",
};

export default function ResumePage() {
  return <ResumeView />;
}
