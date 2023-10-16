import nodemailer from 'nodemailer';
import { envs } from '../../config/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

interface Attachment {
	filename: string;
	path: string;
}

export class EmailService {

	private transporter = nodemailer.createTransport( {
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		}
	} );

	constructor() { }

	async sendEmail( options: SendMailOptions ): Promise<boolean> {

		const { to, subject, htmlBody, attachments = [] } = options;

		try {

			const sentInformation = await this.transporter.sendMail( {
				to,
				subject,
				attachments,
				html: htmlBody,
			} );

			return true;
		} catch ( error ) {
			return false;
		}

	}

	sendEmailWithFileSystemLogs( to: string | string[] ) {

		const subject = 'Logs de Sistema';
		const htmlBody = `
			<h3>Logs de Sistema - NOC</h3>
			<p>Quis aliqua mollit incididunt veniam proident eiusmod minim consequat nisi. Non dolore ad enim minim ut id ullamco adipisicing. Enim laborum labore nisi pariatur fugiat esse id culpa veniam mollit. Ut aliquip exercitation nulla eu qui proident ex do irure mollit adipisicing elit eu. Duis Lorem sit qui proident deserunt nulla cillum eu laboris elit ad officia sunt. Incididunt et do id non tempor laboris nisi non esse ipsum et fugiat.</p>
			<p>Ver logs adjuntos</p>
		`;
		const attachments: Attachment[] = [
			{ filename: 'logs-all.log', path: './logs/logs-all.log' },
			{ filename: 'logs-high.log', path: './logs/logs-high.log' },
			{ filename: 'logs-medium.log', path: './logs/logs-medium.log' },
		];

		return this.sendEmail( {
			to,
			subject,
			htmlBody,
			attachments,
		} );

	}

}