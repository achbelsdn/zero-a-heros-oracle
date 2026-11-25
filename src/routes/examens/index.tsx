import { createFileRoute } from "@tanstack/react-router";
import { ExamsPage } from "@/components/exam-view";

export const Route = createFileRoute("/examens/")({
  component: ExamsPage,
});
