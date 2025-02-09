import {PrismaClient} from "@prisma/client";
import { config } from "dotenv";

config()

// Fill out this data with the information you want to insert
const populate = false
const data = [
	{ // Real station
		id: "STATION_1",
		name: "Perseverance (1)",
		lat: 0.15,
		long: 0.1
	},
	{ // Simulated station
		id: "STATION_2",
		name: "Ingenuity (2)",
		lat: 0.05,
		long: 0.18
	},
	{ // Simulated station
		id: "STATION_3",
		name: "Curiosity (3)",
		lat: 0.15,
		long: 0.15
	},
	{ // Simulated station
		id: "STATION_4",
		name: "Spirit (4)",
		lat: 0.05,
		long: 0.05
	},
	{ // Simulated station
		id: "STATION_5",
		name: "Odyssey (5)",
		lat: 0.09,
		long: 0.05
	},
	{ // Simulated station
		id: "STATION_6",
		name: "Express (6)",
		lat: 0.18,
		long: 0.05
	}
]

const prisma = new PrismaClient();

(async () => {

	for (let dat of data) {
		const res = await prisma.station.create({
			data: {
				id: dat.id,
				name: dat.name,
			}
		})

		console.log(res)

		await prisma.weatherData.create({
			data: {
				stationId: res.id,

				latitude: dat.lat,
				longitude: dat.long,
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

				timeTaken: new Date().toISOString() // Current timestamp in ISO format
			}
		})

		let quieries = []

		if(populate) {
			const start = new Date().getMilliseconds() - 1000 * 60 * 60 * 24 * 7 // 1 week ago
			for(let i = 0; i < 604800; i++) {
				quieries.push({
					stationId: res.id,

					latitude: dat.lat,
					longitude: dat.long,
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

					timeTaken: new Date(start + (i*1000)).toISOString() // Current timestamp in ISO format
				})

				if(quieries.length >= 100000) {
					console.log("Filled out structure")
					await prisma.weatherData.createMany({
						data: quieries
					})
					quieries = []
				}
			}

			await prisma.weatherData.createMany({
				data: quieries
			})
		}
	}
})();