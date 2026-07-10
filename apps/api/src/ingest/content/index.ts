import type { CollegeContentPack } from "./types";
import { iitMadras } from "./iit-madras";
import { engBatch2 } from "./eng-batch2";
import { engBatch3 } from "./eng-batch3";
import { engBatch4 } from "./eng-batch4";

// All hand-authored content packs. New batches append here.
export const ALL_PACKS: CollegeContentPack[] = [iitMadras, ...engBatch2, ...engBatch3, ...engBatch4];
