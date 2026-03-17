"use client";

interface RedactionNoteProps {
  reason?: string;
}

export function RedactionNote({ reason = "Client NDA" }: RedactionNoteProps) {
  return (
    <div className="my-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-4 text-sm text-amber-200/90">
      <div className="text-xs uppercase tracking-[0.3em] text-amber-200/70 mb-2">Redaction Note</div>
      <p>
        Certain implementation details are withheld for confidentiality. ({reason})
      </p>
    </div>
  );
}
