
export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface LogEntityOptions {
	level: LogSeverityLevel;
	message: string;
	createdAt?: Date;
	origin: string;
}

export class LogEntity {

	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor( options: LogEntityOptions ) {

		const { level, message, origin, createdAt } = options;

		this.level = level;
		this.message = message;
		this.createdAt = new Date();
		this.origin = origin;
	}

	static fromJson( json: string ): LogEntity {

		const { message, level, createdAt, origin } = JSON.parse( json );

		const log = new LogEntity( {
			message,
			level,
			createdAt,
			origin,
		} );

		return log;

	}

}