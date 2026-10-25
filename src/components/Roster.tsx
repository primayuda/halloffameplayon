import { useMemo, useState } from 'react';
import type { Runner } from '../types';
import Filters, { matchesCategory, type FilterValue } from './Filters';
import RunnerCard from './RunnerCard';

type RosterProps = {
  runners: Runner[];
};

export default function Roster({ runners }: RosterProps) {
  const [filter, setFilter] = useState<FilterValue>('All');
  const visible = useMemo(
    () => runners.filter((runner) => matchesCategory(runner.category, filter)),
    [runners, filter],
  );

  return (
    <>
      <Filters active={filter} onChange={setFilter} />
      <section className="roster" aria-label="Runners">
        {visible.map((runner) => (
          <RunnerCard key={runner.id} runner={runner} />
        ))}
      </section>
    </>
  );
}
