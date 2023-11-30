import { getUser, getUsers } from '$lib/db';
import { dbConn } from '$lib/oracle';
import { JSONResponse } from '../lib';

export async function GET() {
  return JSONResponse(getUsers());
}

export async function POST({ request }) {
  const payload = await request.json();

  const {
    user_id,
    name,
    email,
    avatar,
  } = payload;

  const res = await dbConn.execute(
    `INSERT INTO users (user_id, name, avatar_id, email) VALUES (:user_id, :name, :avatar, :email)`,
    [user_id, name, avatar, email],
    { autoCommit: true }
  );

  // check for success
  if (res.rowsAffected !== 1) {
    return new Response('Failed to create user', { status: 500 });
  }

  return new Response();
}

export async function PATCH({ request }) {
  const payload = await request.json();

  const {
    user_id,
    name,
    email,
  } = payload;

  const res = await dbConn.execute(
    `UPDATE users SET name = :name, email = :email WHERE user_id = :user_id`,
    [name, email, user_id],
    { autoCommit: true }
  );

  // check for success
  if (res.rowsAffected !== 1) {
    return new Response('Failed to update user', { status: 500 });
  }

  return new Response();
}

export async function DELETE({ request }) {
  const payload = await request.json();

  const {
    user_id,
  } = payload;

  const res = await dbConn.execute(
    `DELETE FROM users WHERE user_id = :user_id`,
    [user_id],
    { autoCommit: true }
  );

  // check for success
  if (res.rowsAffected !== 1) {
    return new Response('Failed to delete user', { status: 500 });
  }

  return new Response();
}
