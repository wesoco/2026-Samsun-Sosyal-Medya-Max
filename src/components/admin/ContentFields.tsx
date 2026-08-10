import type { ReactNode } from "react";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { FaqPair } from "@/lib/seo";

type Props = {
  title?: string;
  slug?: string;
  lead?: string;
  bodyHtml?: string;
  seoTitle?: string | null;
  seoDesc?: string | null;
  published?: boolean;
  faqs?: FaqPair[];
  showFaq?: boolean;
  extra?: ReactNode;
  slugLabel?: string;
};

export function ContentFields({
  title = "",
  slug = "",
  lead = "",
  bodyHtml = "<p></p>",
  seoTitle = "",
  seoDesc = "",
  published = true,
  faqs = [],
  showFaq = false,
  extra,
  slugLabel = "Slug (URL)",
}: Props) {
  return (
    <>
      <fieldset className="admin-fieldset">
        <legend>Temel bilgiler</legend>
        <p className="admin-hint">Başlık, URL ve kısa özet. Özet Google / AI özet kutuları için önemlidir.</p>
        <div className="admin-field-grid">
          <label>
            Başlık
            <input name="title" required defaultValue={title} placeholder="Örn. Trabzon Instagram yönetimi" />
          </label>
          <label>
            {slugLabel}
            <input
              name="slug"
              required
              defaultValue={slug}
              placeholder="trabzon-instagram-yonetimi"
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              title="Yalnızca küçük harf, rakam ve tire (Türkçe karakter yok: öğrenci → ogrenci)"
            />
          </label>
        </div>
        {extra}
        <label>
          Özet
          <textarea name="lead" required rows={3} defaultValue={lead} placeholder="İlk bakışta cevabı veren kısa metin…" />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>SEO</legend>
        <p className="admin-hint">Boş bırakırsanız başlık ve özet kullanılır.</p>
        <label>
          SEO Title
          <input name="seoTitle" defaultValue={seoTitle || ""} maxLength={70} />
        </label>
        <label>
          SEO Description
          <textarea name="seoDesc" rows={3} defaultValue={seoDesc || ""} maxLength={170} />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>İçerik</legend>
        <p className="admin-hint">
          Normal yazı gibi düzenleyin. Başlık, liste ve bağlantıyı üstteki düğmelerden ekleyin. ham HTML yazmanıza
          gerek yok.
        </p>
        <div className="admin-rte-label">Yazı metni</div>
        <RichTextEditor name="bodyHtml" initialHtml={bodyHtml} />
      </fieldset>

      {showFaq ? (
        <fieldset className="admin-fieldset">
          <legend>Sıkça sorulanlar</legend>
          <FaqEditor initial={faqs} />
        </fieldset>
      ) : null}

      <fieldset className="admin-fieldset admin-fieldset-publish">
        <legend>Yayın</legend>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked={published} />
          <span>
            <strong>Yayında</strong>
            <small>Kapalıysa sitede görünmez; sitemap’e girmez.</small>
          </span>
        </label>
      </fieldset>
    </>
  );
}
