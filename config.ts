const BackUrl = process.env.NODE_ENV === 'production' ? 'https://api.tteoksang.site/api' : 'http://localhost:3005/api'; // dev
const fileBackUrl = process.env.NODE_ENV === 'production' ? 'https://api.tteoksang.site/' : 'http://localhost:3005/'; // dev
const imgExtFormat = ['.png', '.jpg', '.jpeg', '.webp'];
export { BackUrl, fileBackUrl, imgExtFormat };
