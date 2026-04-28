import { operationsTasks } from "@/lib/domain";

const categoryLabel = {
  housekeeping: "Menage",
  checkin: "Check-in/out",
  maintenance: "Maintenance",
  shopping: "Courses",
} as const;

export default function TasksPage() {
  const byStatus = {
    todo: operationsTasks.filter((task) => task.status === "todo"),
    inProgress: operationsTasks.filter((task) => task.status === "in_progress"),
    done: operationsTasks.filter((task) => task.status === "done"),
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8">
      <h1 className="text-2xl font-bold">Planning equipes</h1>
      <p className="mt-2 text-stone-700">
        Taches check-in, menage, maintenance et courses en vue mobile rapide.
      </p>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-stone-500">A faire</p>
          <p className="mt-1 text-xl font-semibold">{byStatus.todo.length}</p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-stone-500">En cours</p>
          <p className="mt-1 text-xl font-semibold">{byStatus.inProgress.length}</p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-stone-500">Termine</p>
          <p className="mt-1 text-xl font-semibold">{byStatus.done.length}</p>
        </article>
      </section>

      <section className="mt-6 space-y-3">
        {operationsTasks.map((task) => (
          <article key={task.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{task.label}</p>
              <span className="rounded-full bg-stone-100 px-2 py-1 text-xs">
                {categoryLabel[task.category]}
              </span>
            </div>
            <p className="mt-1 text-sm text-stone-700">
              {task.date} - Responsable: {task.assignee}
            </p>
            <p className="mt-1 text-sm text-stone-600">Statut: {task.status}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
