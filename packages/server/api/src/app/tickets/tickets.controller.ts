import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { ticketsService } from "./tickets.service";
import {
  CreateTicketRequestBody,
  PrincipalType,
  ListTicketsRequestQuery,
  UpdateTicketRequestBody,
} from "@pickup/shared";

const DEFAULT_PAGING_LIMIT = 10

export const ticketsController: FastifyPluginAsyncTypebox = async (app) => {

  app.get('/', ListTicketsParams, async (request) => {
      const schoolId = request.principal.school.id;
      return await ticketsService.list({
        schoolId,
        cursor: request.query.cursor ?? null,
        limit: request.query.limit ?? DEFAULT_PAGING_LIMIT,
      });
  });

  app.post('/', CreateTicketParams, async (request) => {
      await ticketsService.create({
        title: request.body.title,
        description: request.body.description,
        categoryId: request.body.categoryId,
        schoolId: request.principal.school.id,
      });
      return { message: "Ticket created" };
  });

  app.post('/:id', UpdateTicketParams, async (request) => {
    await ticketsService.update({
      id: request.params.id,
      schoolId: request.principal.school.id,
      status: request.body.status,
      categoryId: request.body.categoryId,
    });
    
    return { message: "Ticket updated" };
  });

};

const ListTicketsParams = {
  config: {
    allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
  },
  schema: {
    querystring: ListTicketsRequestQuery,
  },
};

const CreateTicketParams = {
  config: {
    allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
  },
  schema: {
    body: CreateTicketRequestBody,
  },
};

const UpdateTicketParams = {
  config: {
    allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
  },
  schema: {
    params: Type.Object({
      id: Type.String(),
    }),
    body: UpdateTicketRequestBody,
  },
};