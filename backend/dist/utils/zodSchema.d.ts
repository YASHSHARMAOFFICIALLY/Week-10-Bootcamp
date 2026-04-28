import { z } from 'zod';
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=zodSchema.d.ts.map