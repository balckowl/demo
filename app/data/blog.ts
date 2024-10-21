import { SelectPost } from "../db/schema"

export const getAllPosts = async () => {
    const res = await fetch("http://localhost:3000/api/blog")
    const data: SelectPost[] = await res.json()
    return data
}
