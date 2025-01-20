import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyRequest } from "fastify";
import { ticketsService } from "./tickets.service";
import { NewTicket } from "@pickup/shared";

export const ticketsController: FastifyPluginAsyncTypebox = async (app) => {
  app.get("", async (request: FastifyRequest) => {
    const schoolId = request.principal.schoolId;
    return await ticketsService.list(schoolId);
  });
  app.post(
    "",
    {
      schema: {
        body: NewTicket,
      },
    },
    async (request: FastifyRequest<{ Body: NewTicket }>) => {
      await ticketsService.create(request.body);
      return { message: "Ticket created" };
    }
  );
  app.patch<{ Params: { id: string } }>(
    "/:id/close",
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      await ticketsService.closeTicket(request.params.id);
      return { message: "Ticket closed" };
    }
  );
  app.patch<{ Params: { id: string } }>(
    "/:id/open",
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      await ticketsService.openTicket(request.params.id);
      return { message: "Ticket opened" };
    }
  );
};
