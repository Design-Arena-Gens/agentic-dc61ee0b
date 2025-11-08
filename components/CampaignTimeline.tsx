import type { TimelineItem } from '@/lib/data';
import { ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';

type Props = {
  timeline: TimelineItem[];
};

const statusStyles: Record<
  TimelineItem['status'],
  { bullet: string; label: string }
> = {
  planned: {
    bullet: 'border-slate-300 bg-white',
    label: 'text-slate-500'
  },
  'in-flight': {
    bullet: 'border-primary-500 bg-primary-50',
    label: 'text-primary-600'
  },
  complete: {
    bullet: 'border-emerald-500 bg-emerald-50',
    label: 'text-emerald-600'
  }
};

export default function CampaignTimeline({ timeline }: Props) {
  return (
    <section className="glass-panel rounded-3xl border border-slate-200 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Launch Timeline
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            AI keeps dependencies clean and surfaces blockers proactively.
          </p>
        </div>
        <ClockIcon className="h-6 w-6 text-primary-500" />
      </header>

      <ol className="mt-6 space-y-5">
        {timeline.map((entry) => (
          <li key={entry.id} className="relative pl-10">
            <span
              className={clsx(
                'absolute left-0 top-2 h-4 w-4 rounded-full border-2',
                statusStyles[entry.status].bullet
              )}
            />
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {entry.label}
                </h3>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {entry.channel}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {format(parseISO(entry.date), 'MMM d, yyyy')}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className={clsx('font-semibold', statusStyles[entry.status].label)}>
                  {entry.status.toUpperCase()}
                </span>
                {entry.dependency && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase text-slate-500">
                    Needs {timeline.find((item) => item.id === entry.dependency)?.label ?? 'dependency'}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
