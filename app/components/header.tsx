import { Link } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import { container } from "../../styled-system/patterns";

export default function Header() {
    return (
        <div className={css({
            height: "80px",
            borderBottom: "solid 2px #eeeeee"
        })}>
            <div className={container({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "full"
            })}>
                <h1 className={css({
                    fontSize: "25px",
                    fontWeight: "bold"
                })}>
                    <Link to="/">
                        Panda Blog
                    </Link>
                </h1>
                <ul>
                    <li>
                        <Link to="/blog/new">
                            記事を投稿
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
