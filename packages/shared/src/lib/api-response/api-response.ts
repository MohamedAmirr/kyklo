import {Type, Static, TSchema} from "@sinclair/typebox";

export const APIResponse = <TData extends TSchema>(dataSchema: TData) =>    Type.Object({
        success: Type.Boolean(),
        code: Type.String(),
        data: dataSchema,
    });

export type APIResponse<TData> = {
    success: boolean;
    code: string;
    data: TData;
};

// export type APIResponse = Static<typeof APIResponse>;