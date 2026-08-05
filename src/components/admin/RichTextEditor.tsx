"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

type Props = {
  name?: string;
  initialHtml?: string;
};

export function RichTextEditor({ name = "bodyHtml", initialHtml = "<p></p>" }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Placeholder.configure({
        placeholder: "Yazıya buradan başlayın… Başlık, liste ve bağlantı eklemek için üstteki araç çubuğunu kullanın.",
      }),
    ],
    content: initialHtml || "<p></p>",
    editorProps: {
      attributes: {
        class: "admin-rte-prose",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const input = document.getElementById(`hidden-${name}`) as HTMLInputElement | null;
    const sync = () => {
      if (input) input.value = editor.getHTML();
    };
    sync();
    editor.on("update", sync);
    return () => {
      editor.off("update", sync);
    };
  }, [editor, name]);

  if (!editor) return <div className="admin-rte-loading">Editör yükleniyor…</div>;

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Bağlantı URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="admin-rte">
      <input id={`hidden-${name}`} type="hidden" name={name} defaultValue={initialHtml} />
      <div className="admin-rte-toolbar" role="toolbar" aria-label="Biçimlendirme">
        <button
          type="button"
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : undefined}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          Başlık
        </button>
        <button
          type="button"
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : undefined}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          Alt başlık
        </button>
        <button
          type="button"
          className={editor.isActive("bold") ? "is-active" : undefined}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Kalın
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "is-active" : undefined}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          İtalik
        </button>
        <button
          type="button"
          className={editor.isActive("bulletList") ? "is-active" : undefined}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Liste
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "is-active" : undefined}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numaralı
        </button>
        <button type="button" className={editor.isActive("link") ? "is-active" : undefined} onClick={setLink}>
          Bağlantı
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          Temizle
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
