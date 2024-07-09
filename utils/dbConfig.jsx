import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
// const sql = neon('postgresql://Expense-Tracker_owner:3jNAXIRqn9DO@ep-calm-art-a5muwsuw.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require')
export  const db = drizzle(sql, {schema});
