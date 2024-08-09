import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Article from "@/Components/Article";
import type { Articles } from "@/Components/Article";

export default function Articles({ auth }: PageProps) {
    const [articles, setArticles] = useState<Articles>([]);
    useEffect(() => {
        fetch("/api/articles")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setArticles(data);
            });
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Articles
                </h2>
            }
        >
            <Head title="Articles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col gap-5 p-6 text-gray-900 dark:text-gray-100">
                            {articles.map((article) => (
                                <Link
                                    href={`/articles/${article.id}`}
                                    key={article.id}
                                >
                                    <Article article={article}></Article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
