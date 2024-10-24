import { httpClient } from "@/lib/http/browser/client"
import { Article } from "./Article";

export const getArticles = async () => {
    return httpClient.get<{ data: Article[] }>(`/feeds/v3/foryou`).then(res=>res.data);
}