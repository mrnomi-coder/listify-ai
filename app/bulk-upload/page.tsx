import { AppShell, PageHeading } from "@/components/app-shell";
import { BulkUploadClient } from "@/components/bulk-upload";

export default function BulkUploadPage() {
  return <AppShell><PageHeading eyebrow="Batch processing" title="Bulk image upload" description="Drop a full product shoot, queue AI generation in the background, and review each listing as it becomes ready." /><BulkUploadClient /></AppShell>;
}
