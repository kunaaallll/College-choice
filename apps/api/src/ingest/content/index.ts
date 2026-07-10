import type { CollegeContentPack } from "./types";
import { iitMadras } from "./iit-madras";
import { engBatch2 } from "./eng-batch2";
import { engBatch3 } from "./eng-batch3";
import { engBatch4 } from "./eng-batch4";
import { engBatch5 } from "./eng-batch5";
import { engBatch6 } from "./eng-batch6";
import { engBatch7 } from "./eng-batch7";
import { engBatch8 } from "./eng-batch8";
import { dentalBatch1 } from "./dental-batch1";
import { dentalBatch2 } from "./dental-batch2";
import { dentalBatch3 } from "./dental-batch3";
import { dentalBatch4 } from "./dental-batch4";
import { dentalBatch5 } from "./dental-batch5";

// All hand-authored content packs. New batches append here.
export const ALL_PACKS: CollegeContentPack[] = [
  iitMadras,
  ...engBatch2,
  ...engBatch3,
  ...engBatch4,
  ...engBatch5,
  ...engBatch6,
  ...engBatch7,
  ...engBatch8,
  ...dentalBatch1,
  ...dentalBatch2,
  ...dentalBatch3,
  ...dentalBatch4,
  ...dentalBatch5,
];
