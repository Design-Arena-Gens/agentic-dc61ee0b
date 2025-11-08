import type { Stakeholder, WorkflowStage } from '@/lib/data';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

type Props = {
  blueprint: WorkflowStage[];
  stakeholders: Stakeholder[];
};

export default function WorkflowOrchestrator({
  blueprint,
  stakeholders
}: Props) {
  return (
    <section className="glass-panel flex flex-col rounded-3xl border border-slate-200 p-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Workflow Orchestrator
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            AI maintains ownership, dependencies, and hand-offs across the
            Bharat Life Care social engine.
          </p>
        </div>
        <ArrowPathIcon className="h-6 w-6 text-primary-500" />
      </header>

      <ol className="mt-6 space-y-4">
        {blueprint.map((stage, index) => (
          <li
            key={stage.id}
            className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-primary-500">
                  Phase {index + 1}
                </p>
                <h3 className="mt-1 text-base font-semibold text-slate-900">
                  {stage.phase}
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {stage.duration}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{stage.description}</p>

            <dl className="mt-4 grid gap-4 text-xs text-slate-500 sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-2 text-slate-400">
                  <UserGroupIcon className="h-4 w-4" />
                  Owner
                </dt>
                <dd className="mt-1 font-semibold text-slate-700">
                  {stage.owner}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-slate-400">
                  <ArrowPathIcon className="h-4 w-4" />
                  Dependencies
                </dt>
                <dd className="mt-1 font-semibold text-slate-700">
                  {stage.dependencies.length > 0
                    ? stage.dependencies.map(
                        (dependencyId) =>
                          blueprint.find((item) => item.id === dependencyId)
                            ?.phase ?? dependencyId
                      )
                    : 'Autonomous'}
                </dd>
              </div>
            </dl>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Deliverables
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {stage.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <footer className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5">
        <p className="text-xs font-semibold uppercase text-emerald-700">
          Stakeholder matrix
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {stakeholders.map((stakeholder) => (
            <div key={stakeholder.id} className="rounded-xl bg-white/90 p-4">
              <p className="text-sm font-semibold text-slate-900">
                {stakeholder.name}
              </p>
              <p className="text-xs text-slate-500">{stakeholder.role}</p>
              <p className="mt-2 text-xs text-slate-600">
                {stakeholder.focus}
              </p>
              <div className="mt-2 text-[11px] uppercase text-slate-400">
                Availability • {stakeholder.availability}
              </div>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-primary-600">
                {stakeholder.channel.map((channel) => (
                  <li
                    key={channel}
                    className="rounded-full bg-primary-50 px-2.5 py-1"
                  >
                    {channel}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </section>
  );
}
