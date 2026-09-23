"use client";

import { Download, FileText, Megaphone } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InlineAlert } from "@/components/ui/state";
import { marketingAssets } from "@/lib/data";

export default function MarketingPage() {
  const [message, setMessage] = useState("");

  function handleDownload(title: string) {
    setMessage(`${title} preparado para download.`);
    window.setTimeout(() => setMessage(""), 1800);
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Central de marketing</p>
        <h1 className="font-serif text-4xl">Materiais para divulgação</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Posts, stories, banners, textos e materiais institucionais para comunicar o Yugen com consistência.</p>
      </section>

      {message ? <InlineAlert>{message}</InlineAlert> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {marketingAssets.map((asset) => (
          <article key={asset.id} className="yugen-card p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-yugen-ochre/35 bg-yugen-oat/30 text-yugen-moss">
              <Megaphone className="h-6 w-6" aria-hidden="true" />
            </div>
            <Badge className="mt-5">{asset.category}</Badge>
            <h2 className="mt-3 font-serif text-2xl leading-tight">{asset.title}</h2>
            <p className="mt-2 text-sm leading-6 text-yugen-ink/70">{asset.description}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-yugen-moss">
              <FileText className="h-4 w-4" aria-hidden="true" />
              {asset.format}
            </p>
            <Button className="mt-5 w-full" onClick={() => handleDownload(asset.title)}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download
            </Button>
          </article>
        ))}
      </section>
    </div>
  );
}
