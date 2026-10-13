"use client";

import { use, useEffect, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { adminJson, SESSION_KEY } from "../../../adminApi";
import type { AdminArticle } from "../../../NewsAdmin";
import { StatusBadge } from "../../../NewsAdmin";

/**
 * Preview of an article as it will look on the site — drafts, scheduled posts
 * and pending edits included. Uses the CMS session from this browser.
 */
export default function NewsPreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [a, setA] = useState<AdminArticle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let token: string | null = null;
    try { token = localStorage.getItem(SESSION_KEY); } catch { /* storage blocked */ }
    if (!token) { setError("Sign in to the CMS in this browser to preview drafts."); return; }
    adminJson<AdminArticle>(`/api/admin/news/${id}`, token)
      // Show pending edits on top of the live version — that's what would be published.
      .then((x) => setA({ ...x, ...(x.pendingData ?? {}) } as AdminArticle))
      .catch((e) => setError(e instanceof Error ? e.message : "Couldn't load the article"));
  }, [id]);

  if (error) return <p className="container-site py-16 text-center text-danger">{error}</p>;
  if (!a) return <p className="container-site py-16 text-center text-ink-500">Loading preview…</p>;

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-warn/40 bg-warn/15 px-4 py-2 text-center text-[13px] font-semibold text-ink-700">
        Preview — <StatusBadge s={a.displayStatus} />{a.hasPendingChanges && " with pending changes"} · not visible to the public until published
      </div>
      <article className="container-site max-w-3xl py-8">
        <p className="text-[13px] text-ink-400">Home › News › {a.title}</p>
        <span className="chip mt-4">{a.category}</span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{a.title}</h1>
        <p className="mt-2 text-sm text-ink-400">{a.date} · {a.readTime}</p>
        {a.imgUrl && (
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.imgUrl} alt={a.title} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="prose mt-6 max-w-none text-ink-500">
          <p className="text-lg leading-relaxed">{a.excerpt}</p>
          {a.body && a.body !== a.excerpt && (
            <div className="mt-4">{a.body.trimStart().startsWith("<") ? <div className="rich-content" dangerouslySetInnerHTML={{ __html: a.body }} /> : <Markdown text={a.body} />}</div>
          )}
        </div>
      </article>
    </>
  );
}
