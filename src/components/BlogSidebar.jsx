import React, { useEffect, useMemo, useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const LS_KEY = "clinic_blog_posts_v1";
const AUTH_KEY = "clinic_owner_auth";

function loadPosts() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function savePosts(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

export default function BlogSidebar() {
  const [posts, setPosts] = useState(loadPosts());
  const [isOwner, setIsOwner] = useState(false);
  const [draft, setDraft] = useState({ id: null, title: "", body: "" });

  // Read auth from sessionStorage (primary) with localStorage fallback (back-compat)
  useEffect(() => {
    const readAuth = () =>
      sessionStorage.getItem(AUTH_KEY) === "1" ||
      localStorage.getItem(AUTH_KEY) === "1";

    const sync = () => setIsOwner(readAuth());

    // initial
    sync();

    // react to header login/logout
    window.addEventListener("owner-auth-changed", sync);
    // react to cross-tab storage changes (optional but handy)
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("owner-auth-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Persist posts
  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  // If not owner anymore, clear any editing draft
  useEffect(() => {
    if (!isOwner && draft.id) setDraft({ id: null, title: "", body: "" });
  }, [isOwner]); // eslint-disable-line react-hooks/exhaustive-deps

  const sorted = useMemo(
    () => [...posts].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)),
    [posts]
  );

  const submitPost = (e) => {
    e.preventDefault();
    const now = Date.now();

    if ((draft.title || "").trim() === "" && (draft.body || "").trim() === "") {
      alert("Please write a title or some content.");
      return;
    }

    if (draft.id) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === draft.id ? { ...p, ...draft, updatedAt: now } : p
        )
      );
    } else {
      const id = (crypto?.randomUUID && crypto.randomUUID()) || String(now);
      setPosts((prev) => [
        {
          id,
          title: draft.title || "Untitled",
          body: draft.body || "",
          updatedAt: now,
        },
        ...prev,
      ]);
    }
    setDraft({ id: null, title: "", body: "" });
  };

  const editPost = (p) => setDraft({ id: p.id, title: p.title, body: p.body });

  const delPost = (id) => {
    if (confirm("Delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (draft.id === id) setDraft({ id: null, title: "", body: "" });
    }
  };

  return (
    <ScrollReveal dir="left">
      <div className="card p-5 space-y-4">
        <h3 className="text-lg font-semibold">최근 글</h3>

        {/* Composer (owner only) */}
        {isOwner ? (
          <form
            onSubmit={submitPost}
            className="rounded-xl p-3 border border-black/10 dark:border-white/10 space-y-2"
          >
            <div className="flex items-center gap-2 text-sm font-medium mb-1 opacity-80">
              <Plus size={16} /> {draft.id ? "Edit Post" : "New Post"}
            </div>
            <input
              value={draft.title}
              onChange={(e) =>
                setDraft((d) => ({ ...d, title: e.target.value }))
              }
              placeholder="Post title"
              className="rounded-lg px-3 py-2 bg-transparent border border-black/10 dark:border-white/10 w-full"
            />
            <textarea
              value={draft.body}
              onChange={(e) =>
                setDraft((d) => ({ ...d, body: e.target.value }))
              }
              placeholder="Write something..."
              rows={4}
              className="rounded-lg px-3 py-2 bg-transparent border border-black/10 dark:border-white/10 w-full"
            />
            <div className="flex gap-2">
              <button className="diag-hover rounded-none px-3 py-2 text-sm font-semibold text-white bg-[color:var(--mint-600)]">
                {draft.id ? "Save" : "Publish"}
              </button>
              {draft.id ? (
                <button
                  type="button"
                  onClick={() => setDraft({ id: null, title: "", body: "" })}
                  className="diag-hover rounded-none px-3 py-2 text-sm border border-black/10 dark:border-white/10"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        ) : null}

        {/* Posts */}
        <div className="divide-y divide-black/5 dark:divide-white/10">
          {sorted.length === 0 && (
            <div className="text-sm opacity-70 py-6 text-center">
              아직 게시글이 없습니다.
            </div>
          )}

          {/*Show only 4 posts*/}
          {sorted.slice(0,4).map((p) => (
            <article key={p.id} className="py-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold leading-tight">{p.title}</h4>
                {isOwner ? (
                  <div className="shrink-0 flex items-center gap-1.5">
                    <button
                      onClick={() => editPost(p)}
                      className="diag-hover rounded-none p-1.5 border border-black/10 dark:border-white/10"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => delPost(p.id)}
                      className="diag-hover rounded-none p-1.5 border border-black/10 dark:border-white/10"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="text-xs opacity-60 mt-1">
                {new Date(p.updatedAt).toLocaleString()}
              </div>

              <p className="text-sm mt-2 whitespace-pre-wrap break-words">
                {p.body}
              </p>
            </article>
          ))}
          {sorted.length > 4 ? (
            <div className="pt-2 text-center">
              <Link
                to="/blog"
                className="diag-hover inline-flex items-center justify-center rounded-none px-4 py-2 text-sm font-semibold border border-black/10 dark:border-white/10"
              >
                더 보기
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </ScrollReveal>
  );
}
