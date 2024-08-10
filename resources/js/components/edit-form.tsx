"use client";

import { z } from "zod";

const formSchema = z.object({
    title: z.string().min(2).max(50),
    body: z.string().min(2),
});
