import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Article from "@/Components/Article";
import { useEffect, useState } from "react";
import type { ArticleT } from "@/Components/Article";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    body: z.string().min(2, {
        message: "Body of the article must be at least 2 characters.",
    }),
});

export function ArticleForm({ article }: { article: ArticleT }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: article.title,
            body: article.body,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        const { title, body } = values;
        const csrf_token = await fetch("/api/csrf-token").then((res) =>
            res.text(),
        );

        fetch(`/api/articles/${article.id}`, {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrf_token,
            },
            body: JSON.stringify({ title, body }),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormDescription>
                                The title of the article
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body</FormLabel>
                            <FormControl>
                                <Input placeholder="body" {...field} />
                            </FormControl>
                            <FormDescription>
                                The body of the article
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default function EditArticlePage({ auth }: PageProps) {
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
                            {article && (
                                <ArticleForm article={article}></ArticleForm>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
