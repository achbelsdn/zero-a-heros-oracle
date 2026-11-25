import { createFileRoute } from "@tanstack/react-router";
import { TpPage } from "@/components/tp-page";

export const Route = createFileRoute("/tp")({
  component: TpPage,
});
