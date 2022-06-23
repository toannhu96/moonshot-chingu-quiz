import { QuizResult, UserData } from "../models/User/user";
import { getConnection } from "./index";

export const checkEmailExists = async (email: string) => {
  const client = await getConnection();

  const { rows: userRows } = await client.query(
    "SELECT email FROM users WHERE email=$1",
    [email]
  );

  if (userRows.length > 1)
    throw new Error(`More than one matching email for ${email}`);
  return userRows.length === 1;
};

export const insertUser = async (username: string, email: string, avatar?: string) => {
  const client = await getConnection();

  const emailExists = await checkEmailExists(email);

  if (emailExists) return null;

  return client.query("INSERT INTO users(username, email, avatar) VALUES ($1, $2, $3)", [
    username,
    email,
    avatar,
  ]);
};

export const getUserData = async (email: string) => {
  const client = await getConnection();

  const {
    rows: [{ data }],
  } = await client.query("SELECT data FROM users WHERE email=$1", [email]);

  return data as UserData;
};

export const addQuizResult = async (email: string, quizResult: QuizResult) => {
  const emailExists = await checkEmailExists(email);
  if (!emailExists) throw new Error("User does not exist");

  const client = await getConnection();
  const {
    rows: [{ data }],
  } = await client.query("SELECT data FROM users WHERE email=$1", [email]);

  const updatedData: UserData = data ? data : {};
  if (!updatedData.quizResults) updatedData.quizResults = [];
  if (updatedData.quizResults.length >= 10) {
    updatedData.quizResults.shift();
  }
  const updatedQuizResults = [...updatedData.quizResults, quizResult];

  updatedData.quizResults = updatedQuizResults;

  return client.query("UPDATE users SET data=$2 WHERE email=$1", [
    email,
    updatedData,
  ]);
};

export async function createUsersTable() {
  const client = await getConnection();

  const {
    rows: [{ exists: usersExists }],
  } = await client.query(`
    SELECT EXISTS( SELECT 1 FROM pg_tables WHERE schemaname='public' and tablename='users');
  `);

  if (usersExists) return false;

  return client.query(
    `
    CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      username varchar (64) UNIQUE NOT NULL,
      email varchar (320) UNIQUE NOT NULL,
      avatar varchar (320) NULL,
      data json
    )
    `
  );
}
