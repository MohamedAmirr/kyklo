import { TicketCategoriesEntity, TicketsEntity } from "./tickets.entity";
import { UserEntity } from "../user/user.entity";
import { SchoolEntity } from "../school/school.entity";
import { databaseConnection } from "../database/database-connection";

async function seedTickets() {
  const ticketCategoryRepo = databaseConnection().getRepository(
    TicketCategoriesEntity
  );
  const userRepo = databaseConnection().getRepository(UserEntity);
  const schoolRepo = databaseConnection().getRepository(SchoolEntity);
  const ticketsRepo = databaseConnection().getRepository(TicketsEntity);

  for (let i = 0; i < 5; i++) {
    const ticketCategory = ticketCategoryRepo.create({
      id: `sample-category-${i}`,
      name: `Sample Category ${i}`,
    });
      await ticketCategoryRepo.save(ticketCategory);
  }

  for (let i = 0; i < 10; i++) {
    const randomCategory = await ticketCategoryRepo
      .createQueryBuilder("category")
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();

    const randomUser = await userRepo
      .createQueryBuilder("user")
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();

    const randomSchool = await schoolRepo
      .createQueryBuilder("school")
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();

    if (!randomCategory || !randomUser || !randomSchool) {
      throw new Error(
        "Failed to find random related entities for ticket seeding."
      );
    }

    const random = Math.floor(Math.random() * 1000);

    const ticket = ticketsRepo.create({
      id: `sample-ticket-${random}`,
      title: `Sample Ticket Title ${random}`,
      status: i % 2 === 0 ? "open" : "closed",
      category: randomCategory,
      raisedBy: randomUser,
      school: randomSchool,
      description: `This is a sample description for ticket ${random}.`,
      schoolId: randomSchool.id,
      categoryId: randomCategory.id,
      raisedById: randomUser.id,
    });

    await ticketsRepo.save(ticket);
    console.log(`Ticket ${random} created successfully:`, ticket);
  }
}

export async function seedDevTickets() {
  try {
    await seedTickets();
  } catch (error) {
    console.error("Error during ticket seeding:", error);
  }
}
