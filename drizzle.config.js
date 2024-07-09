/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    // connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    url:'postgresql://Expense-Tracker_owner:3jNAXIRqn9DO@ep-calm-art-a5muwsuw.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require'
  }
};
