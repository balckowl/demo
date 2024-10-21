import { createFileRoute, Link } from "@tanstack/react-router"
import { getAllPosts } from "../data/blog"
import { container } from "../../styled-system/patterns"
import { css } from "../../styled-system/css"

export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => await getAllPosts(),
})

function Home() {

    const allPosts = Route.useLoaderData()

    if (allPosts.length === 0) return <div className={container(
        { mt: "15px" }
    )}>記事が投稿されていません。</div>

    return (
        <div className={container({
            display: "grid",
            gridTemplateColumns: "3",
            gap: "15px",
            mt: "15px"
        })}>
            {allPosts.map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id} className={css({
                    border: "solid 1px #eaeaea",
                    rounded: "xl",
                    px: "35px",
                    py: "20px"
                })}>
                    <h2 className={css({
                        fontWeight: "bold",
                        fontSize: "30px",
                        borderBottom: "solid 1px #eeeeee"
                    })}>{post.title}</h2>
                    <p>{post.content}</p>
                </Link>
            ))}
        </div>
    )
}
