import { Fragment } from 'react';
import { campaigns } from '@/lib/data';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  campaigns: typeof campaigns;
  activeCampaignId: string;
  onSelectCampaign: (id: string) => void;
};

export default function DashboardHeader({
  campaigns,
  activeCampaignId,
  onSelectCampaign
}: Props) {
  const activeCampaign =
    campaigns.find((campaign) => campaign.id === activeCampaignId) ??
    campaigns[0];

  return (
    <header className="glass-panel relative flex flex-col rounded-3xl border border-slate-200 p-8 shadow-2xl shadow-primary-100/40">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">
            Bharat Life Care · Social Command Center
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            AI-led Social Media Manager
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Orchestrate campaign strategy, content pipelines, approvals, and
            analytics from a single autonomous hub tailored for Bharat Life
            Care&apos;s brand guardians.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-600">
            Active objective
          </span>
          <button
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
            onClick={() => {
              const currentIndex = campaigns.findIndex(
                (item) => item.id === activeCampaignId
              );
              const next =
                campaigns[(currentIndex + 1) % Math.max(campaigns.length, 1)];
              if (next) {
                onSelectCampaign(next.id);
              }
            }}
            aria-label="Rotate campaign"
          >
            {activeCampaign?.name}
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <dl className="mt-6 grid gap-5 sm:grid-cols-3">
        {activeCampaign?.highlights.map((item) => (
          <Fragment key={item.label}>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
              <dt className="text-sm font-medium uppercase tracking-wide text-slate-500">
                {item.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900">
                {item.value}
                {item.trend && (
                  <span
                    className={clsx(
                      'ml-2 text-sm font-medium',
                      item.trend === 'up'
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    )}
                  >
                    {item.delta}
                  </span>
                )}
              </dd>
              <p className="mt-1 text-xs text-slate-500">{item.note}</p>
            </div>
          </Fragment>
        ))}
      </dl>
    </header>
  );
}
