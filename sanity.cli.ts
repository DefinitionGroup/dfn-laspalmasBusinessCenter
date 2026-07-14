import { defineCliConfig } from "sanity/cli";
import { dataset, studioProjectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId: studioProjectId, dataset },
});
