import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export type ArticleT = {
    id: number;
    title: string;
    body: string;
    user_id: number;
    created_at: string;
    updated_at: string;
};

export type Articles = ArticleT[];
type Props = {
    article: ArticleT;
};

const Article = (props: Props) => {
    const { article } = props;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>test</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{article.body}</p>
            </CardContent>
            <CardFooter>
                <p>test</p>
            </CardFooter>
        </Card>
    );
};

export default Article;
