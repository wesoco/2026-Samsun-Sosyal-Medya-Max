"use client";

type Props = {
  label?: string;
  confirmMessage?: string;
  className?: string;
};

/** Form içinde kullanılır — onay sonrası native submit (server action). */
export function ConfirmDeleteButton({
  label = "Sil",
  confirmMessage = "Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
  className = "admin-btn admin-btn-sm admin-btn-danger",
}: Props) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}
