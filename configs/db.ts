import { createPool } from 'slonik';

export default createPool(process.env.DB_URL ?? '');
