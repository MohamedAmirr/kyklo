import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"
import {FastifyRequest} from "fastify";
import { ticketService } from "./ticket.service";

export const ticketController: FastifyPluginAsyncTypebox = async (app) => {
    app.get('',async (request:FastifyRequest)=>{
        // const tickets = await ticketService.list()
        // return tickets
    })
}
