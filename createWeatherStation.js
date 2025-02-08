import {PrismaClient} from "@prisma/client";

// Fill out this data with the information you want to insert
const data = {
	name: "Water",
}

const prisma = new PrismaClient();

(async () => {

	const res = await prisma.station.create({
		data: data
	})

	console.log(res)
})();