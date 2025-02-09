import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

// JSON Data Structure
export interface WeatherPayload {
	stations: WeatherStationPayload[]
}

export interface WeatherStationPayload {
	id: string // I will supply this id

	// position data
	latitude: number
	longitude: number

	// data
	pressure: number
	temperature: number
	humidity: number
	uv: number
	ir: number
	moisture: number
	accel: {
		x: number
		y: number
		z: number
	}
	angVelocity: {
		x: number
		y: number
		z: number
	}

	timeOffset: number
}

export interface WeatherStation {
	id: string
	name: string
	weatherData: WeatherData[]
}
 
export interface WeatherData {
	latitude: number
	longitude: number
	pressure: number
	temperature: number
	humidity: number
	co2: number
	dust: number
	wind: number
	uv: number
	ir: number
	moisture: number
	accellX: number
	accellY: number
	accellZ: number
	angVelX: number
	angVelY: number
	angVelZ: number
	timeTaken: Date
}

export async function GET() {
	const prisma = new PrismaClient();

	const data = await prisma.station.findMany({
		include: {
			weatherData: {
				orderBy: {
					timeTaken: "desc"
				},
				take: 100
			}
		}
	})

	return new NextResponse(JSON.stringify(data), { status: 200 })
}

export async function POST(req: Request) {
	const key = req.headers.get("Authorization")
	if (key !== "Bearer " + process.env.KEY)
		return new NextResponse("Unauthorized", { status: 401 })

	const data: WeatherPayload = await req.json()
	const prisma = new PrismaClient();

	const time = new Date()
	for (const station of data.stations) {
		await prisma.weatherData.create({
			data: {
				latitude: station.latitude,
				longitude: station.longitude,
				stationId: station.id,
				pressure: station.pressure,
				temperature: station.temperature,
				humidity: station.humidity,
				co2: Math.random() * (960000 - 950000) + 950000, // 95-96% CO2 (in ppm)
				dust: Math.random() * (1.5 - 0.1) + 0.1, // Arbitrary dust levels (scaled 0.1-1.5 for variability)
				light: Math.random() * (600 - 200) + 200, // Solar radiation in W/m² (Mars gets ~200-600 W/m²)
				wind: Math.random() * 50, // Mars wind speeds range from 2-50 m/s
				uv: station.uv,
				ir: station.ir,
				moisture: station.moisture,
				accelX: station.accel.x,
				accelY: station.accel.y,
				accelZ: station.accel.z,
				angVelX: station.angVelocity.x,
				angVelY: station.angVelocity.y,
				angVelZ: station.angVelocity.z,
				timeTaken: new Date(time.getMilliseconds()-station.timeOffset),
			}
		}).then(() => {
			console.log("Data saved for station " + station.id)
		}).catch((error) => {
			console.error(error.stack)
		})
	}

	return new NextResponse("Data saved", { status: 200 })
}