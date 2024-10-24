import { httpClient } from "@/lib/http/browser/client"
import { Article } from "./Article";

export const getGuestArticles = async () => {
    return httpClient.get<{ data: Article[] }>(`/feeds/v3/guest`).then(res=>res.data);
}