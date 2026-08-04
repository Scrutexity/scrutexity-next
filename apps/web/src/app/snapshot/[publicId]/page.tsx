import { redirect } from 'next/navigation';

export default async function SnapshotRedirectPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  redirect(`/claim-audit/${publicId}`);
}
