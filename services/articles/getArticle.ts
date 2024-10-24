import { httpClient } from "@/lib/http/server/client";
import { Article } from "./Article";

export const getArticle = async (id: number) => {
    const http = await httpClient();
    return http.get<Article>(`/feeds/v3/${id}`).then(res=>res.data);
}