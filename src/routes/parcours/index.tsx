import { createFileRoute } from "@tanstack/react-router";
import { ParcoursPage } from "@/components/lesson-view";

export const Route = createFileRoute("/parcours/")({
  component: ParcoursPage,
});
