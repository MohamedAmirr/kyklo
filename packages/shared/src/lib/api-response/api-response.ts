import { Type, Static } from "@sinclair/typebox";

export const APIResponse = Type.Object({
  success: Type.Boolean(),
  code: Type.String(),
  data: Type.Any(),
});

export type APIResponse = Static<typeof APIResponse>;
