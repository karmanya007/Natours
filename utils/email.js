const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
	constructor(user, url, event) {
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = `Karmanya Veer Sharma <${process.env.EMAIL_FROM}>`;
		if (event) {
			this.id = event.data.object.id;
			this.payment_method = event.data.object.payment_method_types[0];
			this.price = event.data.object.amount_total / 100;
			this.tour = event.data.object.cancel_url
				.slice(32)
				.toUpperCase()
				.split('-')
				.join(' ');
			this.createdAt = new Date(event.created * 1000).toLocaleString();
			this.paymentStatus = event.data.object.payment_status;
		}
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			// Sendgrid
			return nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
					user: process.env.SENDGRID_USERNAME,
					pass: process.env.SENDGRID_PASSWORD,
				},
			});
		}
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	// Send the actual mail
	async send(template, subject) {
		// 1) Render
		const html = pug.renderFile(
			`${__dirname}/../views/emails/${template}.pug`,
			{
				firstName: this.firstName,
				url: this.url,
				subject,
				id: this.id,
				payment_method: this.payment_method,
				price: this.price,
				tour: this.tour,
				createdAt: this.createdAt,
				paymentStatus: this.paymentStatus,
				to: this.to,
			}
		);

		// 2) Email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: htmlToText.fromString(html),
		};

		// 3) Create transport and send mail

		await this.newTransport().sendMail(mailOptions);
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to the Natours family');
	}

	async sendPasswordReset() {
		await this.send(
			'passwordReset',
			'Your password reset token (Valid for 10 mins)'
		);
	}

	async sendInvoice() {
		await this.send('invoice', 'Tour Invoice');
	}
};
