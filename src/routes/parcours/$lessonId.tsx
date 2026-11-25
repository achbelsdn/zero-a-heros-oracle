import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "@/components/lesson-view";

export const Route = createFileRoute("/parcours/$lessonId")({
  component: LessonRoute,
});

function LessonRoute() {
  const { lessonId } = Route.useParams();
  return <LessonPage lessonId={lessonId} />;
}
