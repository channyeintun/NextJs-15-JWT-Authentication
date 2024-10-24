'use client'

import { Article } from "@/services/articles/Article";
import { getArticles } from "@/services/articles/getArticles";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { getGuestArticles } from "@/services/articles/getGuestArticles";

export default function ArticlesPage() {
    const [data, setData] = useState<Article[] | undefined>();
    useEffect(() => {
        const authCookie = Cookie.get('authCookie');
        if (authCookie) {
            const fetchData = async () => {
                const response = await getArticles();
                setData(response.data);
            }
            fetchData();
        } else {
            const fetchData = async () => {
                const response = await getGuestArticles();
                setData(response.data);
            }
            fetchData();
        }
    }, []);

    if (data) {
        return (
            <main className="grid w-screen h-screen p-20">
                <ul className="flex flex-col gap-4">
                    {data.map(article => (
                        <article key={article.id}>
                            <h1>{article.title}</h1>
                            <img src={article.imageUrl} />
                        </article>
                    ))}
                </ul>
            </main>
        )
    }

    return <></>;
}