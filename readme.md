# Natourify

A dynamic website using pug templates with a backend made in nodejs(Expressjs) consisting of authorization, emailing, user-roles, review-system and a booking system (Payments using stripe). [Deployed version](https://natourify.herokuapp.com/)

---

![homepage](./public/img/overview.jpg)

---

## Installation

### Requirements

You will need [Nodejs](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/), [Mailtrap account](https://mailtrap.io/)(For dev e-mailing), [Sendgrid Account](https://sendgrid.com/)(For production e-mailing) and [Stripe Accont](https://stripe.com/)

### Setup

1. Clone this repository.

   ```sh
   git clone https://github.com/karmanya007/Natours.git
   ```

2. Make config.env file and put the following variables:

   ```sh
   NODE_ENV=development
   PORT=3000
   DATABASE=<Your mongodb connection string>
   DATABASE_LOCAL=mongodb://localhost:27017/shortify
   DATABASE_PASSWORD=<Your database connection password>

   JWT_SECTET=<Your secret JWT private key (Try to keep it atleast 32 character long)>
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90

   EMAIL_USERNAME=<Mailtrap email username>
   EMAIL_PASSWORD=<Mailtrap email password>
   EMAIL_HOST=smtp.mailtrap.io
   EMAIL_PORT=25

   EMAIL_FROM=<Your email>

   SENDGRID_USERNAME=apikey
   SENDGRID_PASSWORD=<Sendgrid password>

   STRIPE_SECRET_KEY=<Stripe secret key>
   STRIPE_WEBHOOK_SECRET=<Stripe secret key for webhooks>
   ```

3. Open this directory in the terminal and run:

   ```sh
   npm install
   npm run dev
   ```

4. For building the bundle for frontend JS files run

   ```
    npm run watch:js
    OR
    npm run build:js
   ```

5. Visit http://localhost:3000/

## Usage

### [API](https://documenter.getpostman.com/view/12608799/TVKA5KAp)

:smile:ENJOY:smile:
