import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Article from "@/Components/Article";
import { useEffect, useState } from "react";
import type { ArticleT } from "@/Components/Article";

export default function ArticlePage({ auth }: PageProps) {
    const [article, setArticle] = useState<ArticleT>();
    const link = window.location.href; // hack, should use some kind of router and params
    const linkArr = link.split("/");
    const length = linkArr.length;
    const articleId = linkArr[length - 1]; // we get last item from path because at this route it will be the id of article

    useEffect(() => {
        fetch(`/api/articles/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setArticle(data);
            });
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Article
                </h2>
            }
        >
            <Head title="Article" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col gap-5 p-6 text-gray-900 dark:text-gray-100">
                            {article && <Article article={article}></Article>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
