import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import { postsTable } from '../../db/schema'
import { container } from '../../../styled-system/patterns'
import { css } from '../../../styled-system/css'
import { FormEvent } from 'react'

export const deletePost = createServerFn("POST", async (id: string) => {
    const post = await db.delete(postsTable).where(eq(postsTable.id, Number(id)))
    return post
})

export const getPost = createServerFn("GET", async (id: string) => {
    const post = await db.query.postsTable.findFirst({
        where: eq(postsTable.id, Number(id)),
    });

    return post;
});

export const Route = createFileRoute('/blog/$id')({
    component: Blog,
    loader: async ({ params }) => await getPost(params.id)
})

function Blog() {
    const post = Route.useLoaderData()
    const { id } = Route.useParams()
    const navigate = useNavigate()

    if (!post) return "記事がありません。"

    return (
        <div className={container({
            mt: "15px"
        })}>
            <h2 className={css({
                fontWeight: "bold",
                fontSize: "30px"
            })}>{post.title}</h2>
            <p>{post.content}</p>
            <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                const res = await deletePost(id)
                console.log(res)
                navigate({ to: "/" })
            }}>
                <button type="submit" className={css({
                    bg: "red",
                    px: "20px",
                    py: "10px",
                    rounded: "md"
                })}>削除</button>
            </form>
        </div>
    )
}
