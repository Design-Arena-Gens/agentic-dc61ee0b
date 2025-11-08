import type { Automation } from '@/lib/data';
import { BoltIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  automations: Automation[];
};

const badgeStyles: Record<
  Automation['status'],
  { bg: string; fg: string; label: string }
> = {
  active: {
    bg: 'bg-emerald-100',
    fg: 'text-emerald-700',
    label: 'Active'
  },
  paused: {
    bg: 'bg-slate-200',
    fg: 'text-slate-700',
    label: 'Paused'
  },
  testing: {
    bg: 'bg-primary-100',
    fg: 'text-primary-700',
    label: 'Testing'
  }
};

export default function AutomationMatrix({ automations }: Props) {
  return (
    <section className="glass-panel rounded-3xl border border-slate-200 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Automation Matrix
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Continuous AI agents executing compliance, engagement, and paid
            optimization loops.
          </p>
        </div>
        <BoltIcon className="h-6 w-6 text-primary-500" />
      </header>

      <ul className="mt-6 space-y-4">
        {automations.map((automation) => (
          <li
            key={automation.id}
            className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {automation.name}
                </h3>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Owner • {automation.owner}
                </p>
              </div>
              <span
                className={clsx(
                  'rounded-full px-3 py-1 text-xs font-semibold',
                  badgeStyles[automation.status].bg,
                  badgeStyles[automation.status].fg
                )}
              >
                {badgeStyles[automation.status].label}
              </span>
            </div>
            <dl className="mt-3 space-y-2 text-sm text-slate-600">
              <div>
                <dt className="font-semibold text-slate-500">Trigger</dt>
                <dd>{automation.trigger}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Outcome</dt>
                <dd>{automation.outcome}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
