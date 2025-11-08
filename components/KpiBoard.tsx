import type { KPI } from '@/lib/data';
import { SparklesIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  metrics: KPI[];
};

export default function KpiBoard({ metrics }: Props) {
  return (
    <section className="glass-panel flex flex-col rounded-3xl border border-slate-200 p-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Growth & Health KPIs
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Real-time indicators aligned with Bharat Life Care leadership goals.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
          <SparklesIcon className="h-4 w-4" />
          AI tuned
        </span>
      </header>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <li
            key={metric.id}
            className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-600">
                {metric.label}
              </h3>
              <span
                className={clsx(
                  'rounded-full px-2.5 py-1 text-xs font-semibold',
                  metric.trend === 'up' && 'bg-emerald-100 text-emerald-600',
                  metric.trend === 'down' && 'bg-rose-100 text-rose-600',
                  metric.trend === 'neutral' && 'bg-slate-100 text-slate-600'
                )}
              >
                {metric.delta}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {metric.value}
            </p>
            <dl className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <div>
                <dt className="uppercase tracking-wide text-slate-400">Target</dt>
                <dd className="font-semibold text-slate-700">{metric.target}</dd>
              </div>
              <div className="text-right">
                <dt className="uppercase tracking-wide text-slate-400">
                  Cadence
                </dt>
                <dd className="font-semibold text-slate-700">
                  {metric.cadence}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
