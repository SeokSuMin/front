const BackUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3005/api'; // dev
const fileBackUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3005/'; // dev

export { BackUrl, fileBackUrl };
