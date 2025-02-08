import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

// JSON Data Structure
export interface WeatherPayload {
	time: number // given by station, milliseconds
	stations: WeatherStationPayload[]
}

export interface WeatherStationPayload {
	id: string // should be supplied by api server - need to init with server before starting requests

	// position data
	latitude: number
	longitude: number

	// data
	pressure: number
	temperature: number
	humidity: number
	co2: number
	dust: number
	wind: number
	light: number
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
	light: number
	accellX: number
	accellY: number
	accellZ: number
	angVelX: number
	angVelY: number
	angVelZ: number
	timeTaken: Date
}

export async function GET(req: Request, res: Response) {
	const prisma = new PrismaClient();

	const data = await prisma.station.findMany({
		include: {
			weatherData: {
				orderBy: {
					timeTaken: "desc"
				},
				take: 10
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

	const time = new Date(data.time)
	for (const station of data.stations) {
		await prisma.weatherData.create({
			data: {
				latitude: station.latitude,
				longitude: station.longitude,
				stationId: station.id,
				timeTaken: time,
				pressure: station.pressure,
				temperature: station.temperature,
				humidity: station.humidity,
				co2: station.co2,
				dust: station.dust,
				wind: station.wind,
				light: station.light,
				accelX: station.accel.x,
				accelY: station.accel.y,
				accelZ: station.accel.z,
				angVelX: station.angVelocity.x,
				angVelY: station.angVelocity.y,
				angVelZ: station.angVelocity.z
			}
		}).then(() => {
			console.log("Data saved for station " + station.id)
		}).catch((error) => {
			console.error(error.stack)
		})
	}

	return new NextResponse("Data saved", { status: 200 })
}