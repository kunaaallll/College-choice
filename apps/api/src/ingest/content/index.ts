import type { CollegeContentPack } from "./types";
import { iitMadras } from "./iit-madras";
import { engBatch2 } from "./eng-batch2";

// All hand-authored content packs. New batches append here.
export const ALL_PACKS: CollegeContentPack[] = [iitMadras, ...engBatch2];
