import {
  ErrorCode,
  NewTicket,
  PickUpError,
  puId,
  SeekPage,
  Tickets,
} from "@pickup/shared";
import { repoFactory } from "../core/db/repo-factory";
import { TicketsEntity } from "./tickets.entity";
import { paginationHelper } from "../helper/pagination/pagination-utils";
import { buildPaginator } from "../helper/pagination/build-paginator";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const ticketsRepo = repoFactory(TicketsEntity);

export const ticketsService = {
  async create(
    params: CreateParams,
    createdById: string,
    schoolId: string
  ): Promise<Tickets> {
    const id = puId();
    const ticket: Tickets = {
      ...params,
      id,
      status: "open",
      created: dayjs().toISOString(),
      updated: dayjs().toISOString(),
      raisedById: createdById,
      schoolId: schoolId,
    };

    return ticketsRepo().save(ticket);
  },
  async closeTicket(id: string): Promise<Tickets> {
    const updateResult = await ticketsRepo().update(
      {
        id,
      },
      {
        status: "closed",
      }
    );

    if (updateResult.affected !== 1) {
      throw new PickUpError({
        code: ErrorCode.ENTITY_NOT_FOUND,
        params: {
          entityType: "ticket",
          entityId: id,
        },
      });
    }
    return ticketsRepo().findOneByOrFail({
      id,
    });
  },
  async openTicket(id: string): Promise<Tickets> {
    const updateResult = await ticketsRepo().update(
      {
        id,
      },
      {
        status: "open",
      }
    );

    if (updateResult.affected !== 1) {
      throw new PickUpError({
        code: ErrorCode.ENTITY_NOT_FOUND,
        params: {
          entityType: "ticket",
          entityId: id,
        },
      });
    }
    return ticketsRepo().findOneByOrFail({
      id,
    });
  },
  async list({
    schoolId,
    request,
  }: {
    schoolId: string;
    request: { cursor?: string; limit?: number };
  }): Promise<SeekPage<Tickets>> {
    const decodedCursor = paginationHelper.decodeCursor(request.cursor ?? null);

    const paginator = buildPaginator({
      entity: TicketsEntity,
      query: {
        limit: request.limit ?? 10,
        order: "ASC",
        afterCursor: decodedCursor.nextCursor,
        beforeCursor: decodedCursor.previousCursor,
      },
    });
    const { data, cursor } = await paginator.paginate(
      ticketsRepo().createQueryBuilder().where({ schoolId })
    );

    return paginationHelper.createPage<Tickets>(data, cursor);
  },
};

type CreateParams = NewTicket;
