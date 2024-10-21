import { createAPIFileRoute } from '@tanstack/start/api'
import { db } from '../../db'
import { postsTable } from '../../db/schema'
import { json } from '@tanstack/start'

export const Route = createAPIFileRoute('/api/blog')({
  GET: async ({ request }) => {

    const allPosts = await db.select().from(postsTable)
    return json(allPosts)

  },
})
