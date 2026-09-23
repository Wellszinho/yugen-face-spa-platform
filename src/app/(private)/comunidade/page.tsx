"use client";

import { Bookmark, Heart, ImagePlus, MessageCircle, MoreHorizontal, Pin, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form";
import { EmptyState, InlineAlert } from "@/components/ui/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getUser, posts } from "@/lib/data";
import { CommunityPost } from "@/lib/types";
import { cn } from "@/lib/utils";

const tabs = ["Feed", "Discussões", "Avisos"] as const;

export default function ComunidadePage() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Feed");
  const [localPosts, setLocalPosts] = useLocalStorage<CommunityPost[]>("yugen-community-posts", []);
  const [liked, setLiked] = useLocalStorage<string[]>("yugen-liked-posts", []);
  const [saved, setSaved] = useLocalStorage<string[]>("yugen-saved-posts", []);
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");

  const allPosts = useMemo(() => {
    return [...localPosts, ...posts].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [localPosts]);

  const filteredPosts = allPosts.filter((post) => post.tab === activeTab);

  function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim() || !user) return;

    const nextPost: CommunityPost = {
      id: crypto.randomUUID(),
      authorId: user.id,
      tab: activeTab,
      createdAt: new Date().toISOString(),
      content: content.trim(),
      likes: 0,
      comments: 0,
      pinned: activeTab === "Avisos" && isAdmin
    };

    setLocalPosts((current) => [nextPost, ...current]);
    setContent("");
    setSuccess("Publicação enviada.");
    window.setTimeout(() => setSuccess(""), 1800);
  }

  function toggleList(id: string, setter: (next: string[] | ((current: string[]) => string[])) => void) {
    setter((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Comunidade privada</p>
        <h1 className="font-serif text-4xl">Trocas entre licenciadas</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Compartilhe práticas, dúvidas e comunicados em um ambiente profissional e acolhedor.</p>

        <div className="mt-5 flex flex-wrap gap-2 border-b border-yugen-moss/15 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                activeTab === tab ? "bg-yugen-moss text-yugen-sand" : "bg-yugen-sand/45 text-yugen-ink/70 hover:bg-yugen-oat/35"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="mt-5 grid gap-3" onSubmit={handlePost}>
          <Textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder={activeTab === "Avisos" && !isAdmin ? "Apenas administradoras podem publicar avisos." : "Compartilhe uma atualização com a comunidade."} disabled={activeTab === "Avisos" && !isAdmin} aria-label="Nova publicação" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-sm text-yugen-ink/65">
              <ImagePlus className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
              Fotos serão armazenadas no Supabase Storage em produção.
            </span>
            <Button type="submit" disabled={!content.trim() || (activeTab === "Avisos" && !isAdmin)}>
              Publicar
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      </section>

      {success ? <InlineAlert>{success}</InlineAlert> : null}

      <section className="mx-auto grid w-full max-w-3xl gap-4">
        {filteredPosts.length === 0 ? (
          <EmptyState title="Nenhuma publicação por aqui." description="Quando a comunidade publicar, os posts aparecerão nesta aba." />
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              liked={liked.includes(post.id)}
              saved={saved.includes(post.id)}
              onLike={() => toggleList(post.id, setLiked)}
              onSave={() => toggleList(post.id, setSaved)}
            />
          ))
        )}
      </section>
    </div>
  );
}

function PostCard({
  post,
  liked,
  saved,
  onLike,
  onSave
}: {
  post: CommunityPost;
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
}) {
  const author = getUser(post.authorId);

  return (
    <article className="yugen-card p-5">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={author?.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold">{author?.name ?? "Licenciada Yugen"}</p>
              {post.pinned ? (
                <Badge tone="upcoming">
                  <Pin className="mr-1 h-3 w-3" aria-hidden="true" />
                  Fixado
                </Badge>
              ) : null}
            </div>
            <p className="text-xs text-yugen-ink/58">
              {new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(post.createdAt))}
            </p>
          </div>
        </div>
        <button type="button" className="grid h-9 w-9 place-items-center rounded-full text-yugen-ink/60 transition hover:bg-yugen-oat/35" aria-label="Mais opções">
          <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-yugen-ink/78">{post.content}</p>
      {post.image ? <img src={post.image} alt="" className="grain-image mt-4 max-h-[28rem] w-full rounded-[20px] object-cover" /> : null}

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-yugen-moss/15 pt-4 text-sm">
        <div className="flex items-center gap-2">
          <button type="button" className={cn("inline-flex items-center gap-2 rounded-full px-3 py-2 font-medium transition hover:bg-yugen-oat/35", liked ? "text-yugen-terracotta" : "text-yugen-ink/70")} onClick={onLike}>
            <Heart className={cn("h-4 w-4", liked ? "fill-current" : "")} aria-hidden="true" />
            {post.likes + (liked ? 1 : 0)}
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-medium text-yugen-ink/70 transition hover:bg-yugen-oat/35">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {post.comments}
          </button>
        </div>
        <button type="button" className={cn("inline-flex items-center gap-2 rounded-full px-3 py-2 font-medium transition hover:bg-yugen-oat/35", saved ? "text-yugen-moss" : "text-yugen-ink/70")} onClick={onSave}>
          <Bookmark className={cn("h-4 w-4", saved ? "fill-current" : "")} aria-hidden="true" />
          {saved ? "Salvo" : "Salvar"}
        </button>
      </footer>
    </article>
  );
}
