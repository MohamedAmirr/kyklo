import {Type, TSchema} from "@sinclair/typebox";

export const ApiResponse = <TData extends TSchema>(dataSchema: TData) => Type.Object({
        success: Type.Boolean(),
        code: Type.String(),
        data: dataSchema,
    });

export type ApiResponse<TData> = {
    success: boolean;
    code: string;
    data: TData;
};