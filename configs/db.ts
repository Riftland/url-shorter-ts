import slonik from 'slonik';

export default slonik.createPool(process.env.DB_URL ?? '');