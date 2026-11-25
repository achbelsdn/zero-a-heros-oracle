import { createFileRoute } from "@tanstack/react-router";
import { FichesPage } from "@/components/fiches-page";

export const Route = createFileRoute("/fiches")({
  component: FichesPage,
});
