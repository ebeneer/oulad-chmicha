import { messageTemplates } from "@/lib/domain";

export default function TemplatesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-8">
      <h1 className="text-2xl font-bold">Templates reponses</h1>
      <p className="mt-2 text-stone-700">
        Base reutilisable pour accelerer les reponses multi-plateformes.
      </p>

      <section className="mt-6 space-y-3">
        {messageTemplates.map((template) => (
          <article key={template.id} className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="font-semibold">{template.label}</h2>
            <p className="mt-2 rounded-lg bg-stone-50 p-3 text-sm text-stone-700">
              {template.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
