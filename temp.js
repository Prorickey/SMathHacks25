import {PrismaClient} from "@prisma/client";
import { config } from "dotenv";

config()

const prisma = new PrismaClient();

(async () => {

    const data = await prisma.station.findMany({
        include: {
            weatherData: {
                orderBy: {
                    timeTaken: "asc"
                },
                where: {
                    timeTaken: {
                        gte: new Date(new Date().getMilliseconds() - 1000 * 60 * 60 * 5) // Last 5 hours
                    }
                }
            },
        }
    })

})();