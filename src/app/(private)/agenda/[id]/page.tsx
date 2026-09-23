import { EventDetailPage } from "@/components/pages/event-detail-page";

export default async function AgendaEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetailPage id={id} />;
}
