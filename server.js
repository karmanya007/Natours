const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// Server
const port = process.env.PORT || 1337;

app.listen(port, '192.168.1.6', () => {
	console.log(`App running on port ${port}....`);
});
