import {Payment, TicketTable} from "@/components/ui/ticket-table";

const data: Payment[] = [
    {
        id: "a1b2c3d4",
        ticketId: "#12345",
        title: "Payment for Service A",
        category: "Service",
        username: "user1",
        status: "Opened",
        actions: "View",
    },
    {
        id: "e5f6g7h8",
        ticketId: "#67890",
        title: "Payment for Service B",
        category: "Service",
        username: "user2",
        status: "Opened",
        actions: "View",
    },
    {
        id: "i9j0k1l2",
        ticketId: "#11223",
        title: "Payment for Product C",
        category: "Product",
        username: "user3",
        status: "Closed",
        actions: "View",
    },
    {
        id: "m3n4o5p6",
        ticketId: "#44556",
        title: "Payment for Product D",
        category: "Product",
        username: "user4",
        status: "Opened",
        actions: "View",
    },
    {
        id: "q7r8s9t0",
        ticketId: "#77889",
        title: "Payment for Service E",
        category: "Service",
        username: "user5",
        status: "Opened",
        actions: "View",
    },
    {
        id: "q7r8s9t0",
        ticketId: "#77889",
        title: "Payment for Service E",
        category: "Service",
        username: "user5",
        status: "Opened",
        actions: "View",
    },
    {
        id: "q7r8s9t0",
        ticketId: "#77889",
        title: "Payment for Service E",
        category: "Service",
        username: "user5",
        status: "Opened",
        actions: "View",
    },
]

const TicketPage = () => {
    return (
        <TicketTable data={data}/>
    );
};

export default TicketPage;
