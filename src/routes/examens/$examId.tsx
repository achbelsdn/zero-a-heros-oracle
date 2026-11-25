import { createFileRoute } from "@tanstack/react-router";
import { ExamPage } from "@/components/exam-view";

export const Route = createFileRoute("/examens/$examId")({
  component: ExamRoute,
});

function ExamRoute() {
  const { examId } = Route.useParams();
  return <ExamPage examId={examId} />;
}
