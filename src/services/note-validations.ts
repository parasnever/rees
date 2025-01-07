import { z } from "zod";
export const CreateNoteSchema = z.object({
  name: z.string().min(1).max(5),
  description: z.string().min(5).max(255),
  priority: z.number().min(1).max(5),
});
