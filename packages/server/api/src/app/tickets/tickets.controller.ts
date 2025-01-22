import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyRequest } from "fastify";
import { ticketsService } from "./tickets.service";
import {
  EndpointScope,
  ListTicketsRequest,
  NewTicket,
  PrincipalType,
} from "@pickup/shared";

export const ticketsController: FastifyPluginAsyncTypebox = async (app) => {
  app.get("", ListTicketsParams, async (request) => {
    const schoolId = request.principal.schoolId;
      return await ticketsService.list({
      schoolId,
      request: request.query,
    });
  });
  app.post(
    "",
    {
      schema: {
        body: NewTicket,
      },
    },
    async (request: FastifyRequest<{ Body: NewTicket }>) => {
      await ticketsService.create(
        request.body,
        request.principal.userId,
        request.principal.schoolId
      );
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

const ListTicketsParams = {
  config: {
    allowedPrincipals: [PrincipalType.USER],
    scope: EndpointScope.PLATFORM,
  },
  schema: {
    querystring: ListTicketsRequest,
  },
};
