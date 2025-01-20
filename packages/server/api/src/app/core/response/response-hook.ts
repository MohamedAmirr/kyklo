import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse, ErrorCode } from "@pickup/shared";

export default function addGlobalResponseFormat(fastify: FastifyInstance) {
  fastify.addHook(
    "preSerialization",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
      payload
    ): Promise<APIResponse<unknown>> => {
        const responseCode: string | undefined = reply.responseCode;

        if (reply.statusCode < 300) {
          return {
            success: true,
            code: responseCode || "SUCCESS",
            data: payload,
          }
        }
        else{
            reply.status(200);
            return {
                success: false,
                code: responseCode || ErrorCode.SYSTEM_PROP_INVALID,
                data: payload,
            };
        }
    }
  );
}
