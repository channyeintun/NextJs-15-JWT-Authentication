'use client'

import { Article } from "@/services/articles/Article";
import { getArticles } from "@/services/articles/getArticles";
import { useEffect, useState } from "react";
import { getGuestArticles } from "@/services/articles/getGuestArticles";
import { useSession } from "@/hooks/useSession";
import Link from "next/link";

export default function ArticlesPage() {
    const [data, setData] = useState<Article[] | undefined>();
    const { token } = useSession();

    useEffect(() => {
        if (token) {
            (async () => {
                const response = await getArticles();
                setData(response.data);
            })();
        } else {
            (async () => {
                const response = await getGuestArticles();
                setData(response.data);
            })();
        }
    }, []);

    if (data) {
        return (
            <main className="grid w-screen h-screen p-20">
                <ul className="flex flex-col gap-4">
                    {data.map(article => (
                        <Link key={article.id} href={`/articles/${article.id}`}>
                            <article lang="my" className="flex gap-3 border border-gray-500 w-fit">
                                <h1 className="w-28 text-balance p-2">{article.title}</h1>
                                <img src={article.imageUrl} width={200} height={200} className="aspect-square object-cover" />
                            </article>
                        </Link>
                    ))}
                </ul>
            </main>
        )
    }

    return <></>;
}