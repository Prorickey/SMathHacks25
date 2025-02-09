import {PrismaClient} from "@prisma/client";
import { config } from "dotenv";

config()

// Fill out this data with the information you want to insert
const populate = false
const lat = 0.15
const long = 0.1
const data = {
	id: "STATION_1",
	name: "Biology",
}

const prisma = new PrismaClient();

(async () => {

	const res = await prisma.station.create({
		data: data
	})

	console.log(res)

	let quieries = []

	if(!populate) return
	const start = new Date().getMilliseconds() - 1000 * 60 * 60 * 24 * 7 // 1 week ago
	for(let i = 0; i < 604800 * 5; i++) {
		quieries.push({
			stationId: res.id,

			latitude: lat,
			longitude: long,
			wind: Math.random() * 50, // Mars wind speeds range from 2-50 m/s
			pressure: Math.random() * (900 - 600) + 600, // 600-900 Pa (very low compared to Earth)
			temperature: Math.random() * (-20 - (-120)) + (-120), // -120 to -20°C
			humidity: Math.random() * (0.1 - 0.001) + 0.001, // 0.001% to 0.1% (extremely dry)
			co2: Math.random() * (960000 - 950000) + 950000, // 95-96% CO2 (in ppm)
			dust: Math.random() * (1.5 - 0.1) + 0.1, // Arbitrary dust levels (scaled 0.1-1.5 for variability)
			light: Math.random() * (600 - 200) + 200, // Solar radiation in W/m² (Mars gets ~200-600 W/m²)

			uv: Math.random() * (50 - 15) + 15,
			ir: Math.random() * (15 - 1) + 1,
			moisture: Math.random() * 0.01,

			accelX: Math.random() * (0.05 - (-0.05)) + (-0.05), // Minimal movement in g's
			accelY: Math.random() * (0.05 - (-0.05)) + (-0.05),
			accelZ: Math.random() * (0.38 - 0.37) + 0.37, // Mars gravity ~0.38g

			angVelX: Math.random() * (0.1 - (-0.1)) + (-0.1), // Small angular velocities
			angVelY: Math.random() * (0.1 - (-0.1)) + (-0.1),
			angVelZ: Math.random() * (0.1 - (-0.1)) + (-0.1),

			timeTaken: new Date(start + (i*200)).toISOString() // Current timestamp in ISO format
		})

		if(quieries.length >= 100000) {
			console.log("Filled out structure")
			await prisma.weatherData.createMany({
				data: quieries
			})
			quieries = []
		}
	}
})();