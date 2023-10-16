import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {

	public static start() {

		console.log( 'Server started...' );

		// Mandar email
		// new SendEmailLogs(
		// 	emailService,
		// 	fileSystemLogRepository
		// ).execute(
		// 	[ 'thepanicend@gmail.com' ]
		// );

		// CronService.createJob(
		// 	'*/5 * * * * *',
		// 	() => {
		// 		const url = 'https://www.google.com';
		// 		new CheckService(
		// 			fileSystemLogRepository,
		// 			() => console.log( `${ url } is ok` ),
		// 			( error ) => console.log( error )
		// 		).execute( url );
		// 	}
		// );

	}

}