import { getUsers } from '$lib/oracle.js'

export async function GET() {
  const users = await getUsers();
  return new Response(JSON.stringify(users), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
