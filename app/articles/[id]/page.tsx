import { getArticle } from "@/services/articles/getArticle";

type Params = Promise<{ id: string }>

export default async function ArticleDetailPage(props: { params: Params }) {
    const params = await props.params;
    const article = await getArticle(+params.id);
    return (
        <main className="grid w-screen h-screen p-20">
            <h1>{article.title}</h1>
            <img src={article.imageUrl} />
            {article.loveResponse.react ? <strong className="text-red-500">Loved</strong> : null}
        </main>
    )
}