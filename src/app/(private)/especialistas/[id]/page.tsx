import { SpecialistDetailPage } from "@/components/pages/specialist-detail-page";

export default async function EspecialistaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SpecialistDetailPage id={id} />;
}
