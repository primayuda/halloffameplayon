import { useState } from 'react';
import type { Runner } from '../types';

type RunnerCardProps = {
  runner: Runner;
};

function preview(text: string) {
  const line = text
    .split('\n')
    .map((part) => part.trim())
    .find(Boolean);
  if (!line) return 'Reflection coming soon.';
  return line.length > 140 ? `${line.slice(0, 137)}…` : line;
}

function photoSrc(photo: string) {
  if (photo.startsWith('http')) return photo;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${photo.replace(/^\//, '')}`;
}

export default function RunnerCard({ runner }: RunnerCardProps) {
  const [open, setOpen] = useState(false);
  const hasReflection = runner.reflection.trim().length > 0;

  return (
    <article className="runner-card">
      <img
        className="runner-photo"
        src={photoSrc(runner.photo)}
        alt=""
        width={96}
        height={96}
      />
      <div className="runner-body">
        <div className="runner-heading">
          <h2>{runner.name}</h2>
          <span className={`badge badge-${runner.category.toLowerCase()}`}>
            {runner.category}
          </span>
        </div>
        {open ? (
          <div className="runner-expanded">
            {runner.finishTime ? (
              <p className="finish-time">Finish time {runner.finishTime}</p>
            ) : null}
            {runner.leg ? <p className="leg">{runner.leg}</p> : null}
            <p className="reflection">
              {hasReflection ? runner.reflection : 'Reflection coming soon.'}
            </p>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="reflection-preview">{preview(runner.reflection)}</p>
            <button type="button" onClick={() => setOpen(true)}>
              Read full reflection
            </button>
          </>
        )}
      </div>
    </article>
  );
}
