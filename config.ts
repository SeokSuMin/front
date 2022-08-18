const BackUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3006/api'; // dev
const fileBackUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3006/'; // dev

export { BackUrl, fileBackUrl };
