import { createListingWorker } from "@/lib/queue";
const worker = createListingWorker();
worker.on("completed", (job) => console.log(`Completed AI listing job ${job.id}`));
worker.on("failed", (job, error) => console.error(`AI listing job ${job?.id ?? "unknown"} failed`, error));
console.log("Listify AI worker is running.");
