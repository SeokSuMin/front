const BackUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3004/api'; // dev
const fileBackUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3004/'; // dev

export { BackUrl, fileBackUrl };
