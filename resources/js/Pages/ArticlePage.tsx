import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Article from "@/Components/Article";
import { useEffect, useState } from "react";
import type { ArticleT } from "@/Components/Article";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { stat } from "fs";

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

    const handleDelete = async () => {
        const csrfToken = await fetch("/api/csrf-token").then((res) =>
            res.text(),
        );

        const res = await fetch(`/api/articles/${articleId}`, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
        });

        if (res.ok) {
            window.location.href = "/articles";
        } else {
            alert("Something went wrong");
        }
    };

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
                            <div className="flex gap-5">
                                <Link
                                    href={`/articles/edit/${articleId}`}
                                    className={`${buttonVariants({
                                        variant: "outline",
                                    })} w-20`}
                                >
                                    Edit
                                </Link>
                                <Button
                                    className="w-20"
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                            {article && <Article article={article}></Article>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
