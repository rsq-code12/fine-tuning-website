'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_INPUT, estimate, GPUS, METHODS, MODELS, type CalcInput } from '@/lib/calc';
import LeadForm from './LeadForm';

const usd = (n: number) => (n < 10 ? `$${n.toFixed(2)}` : `$${Math.round(n).toLocaleString('en-US')}`);
const hrs = (n: number) => (n < 1 ? `${Math.max(1, Math.round(n * 60))} min` : `${n < 10 ? n.toFixed(1) : Math.round(n).toLocaleString('en-US')} h`);
const big = (n: number) => (n >= 1e9 ? `${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n.toLocaleString('en-US'));

export default function CostCalculator() {
  const [v, setV] = useState<CalcInput>(DEFAULT_INPUT);
  const r = useMemo(() => estimate(v), [v]);
  const gpu = GPUS.find((g) => g.id === v.gpu)!;
  const set = <K extends keyof CalcInput>(k: K, val: CalcInput[K]) => setV((s) => ({ ...s, [k]: val }));
  const num = (k: 'examples' | 'tokensPerExample' | 'epochs' | 'runs', max: number) => (e: React.ChangeEvent<HTMLInputElement>) =>
    set(k, Math.min(max, Math.max(0, Number(e.target.value) || 0)));

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-5 self-start sm:grid-cols-2">
          <label className="field sm:col-span-2">
            <span>Base model size</span>
            <select className="input" value={v.model} onChange={(e) => set('model', e.target.value)}>
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field sm:col-span-2">
            <span>Method</span>
            <select className="input" value={v.method} onChange={(e) => set('method', e.target.value)}>
              {METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Training examples</span>
            <input className="input" type="number" inputMode="numeric" min={1} max={10000000} value={v.examples} onChange={num('examples', 10_000_000)} />
          </label>
          <label className="field">
            <span>Avg tokens per example</span>
            <input className="input" type="number" inputMode="numeric" min={1} max={200000} value={v.tokensPerExample} onChange={num('tokensPerExample', 200_000)} />
          </label>
          <label className="field">
            <span>Epochs</span>
            <input className="input" type="number" inputMode="numeric" min={1} max={20} value={v.epochs} onChange={num('epochs', 20)} />
          </label>
          <label className="field">
            <span>Experiment runs</span>
            <input className="input" type="number" inputMode="numeric" min={1} max={100} value={v.runs} onChange={num('runs', 100)} />
          </label>
          <label className="field">
            <span>GPU</span>
            <select className="input" value={v.gpu} onChange={(e) => setV((s) => ({ ...s, gpu: e.target.value, rate: undefined }))}>
              {GPUS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>$ per GPU-hour</span>
            <input
              className="input"
              type="number"
              inputMode="decimal"
              step="0.05"
              min={0}
              value={v.rate ?? gpu.rate}
              onChange={(e) => set('rate', Math.max(0, Number(e.target.value) || 0))}
            />
          </label>
        </div>

        <div className="panel flex flex-col p-6 md:p-8" aria-live="polite">
          <p className="eyebrow">Estimated compute</p>
          <p className="big-num mt-6">{usd(r.costTotal)}</p>
          <p className="mt-2 text-mono-xs text-bone-4">
            for {v.runs} run{v.runs === 1 ? '' : 's'} · {usd(r.costPerRun)} per run
          </p>
          <dl className="spec mt-8">
            <div>
              <dt>GPUs needed</dt>
              <dd>
                {r.gpus} × {gpu.label.replace('NVIDIA ', '')}
              </dd>
            </div>
            <div>
              <dt>Time per run</dt>
              <dd>{hrs(r.wallHours)}</dd>
            </div>
            <div>
              <dt>GPU-hours per run</dt>
              <dd>{hrs(r.gpuHours)}</dd>
            </div>
            <div>
              <dt>Training tokens</dt>
              <dd>{big(r.tokens)}</dd>
            </div>
            <div>
              <dt>Memory footprint</dt>
              <dd>~{Math.round(r.memoryGb).toLocaleString('en-US')} GB</dd>
            </div>
            <div>
              <dt>Compute</dt>
              <dd>{r.flops.toExponential(1).replace('e+', ' × 10^')} FLOPs</dd>
            </div>
          </dl>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-bone-3">
            {r.costTotal < 500
              ? 'Compute is the cheap part. The money is in the data, the evaluation and the engineering around it. That is where projects succeed or stall.'
              : 'At this scale compute is real money, and every wasted run hurts. Get the data and evals right before you light up the cluster.'}
          </p>
        </div>
      </div>

      <LeadForm
        source="calculator"
        answers={{ model: v.model, method: v.method, gpu: v.gpu, examples: String(v.examples), tokensPerExample: String(v.tokensPerExample), epochs: String(v.epochs), runs: String(v.runs), estimate: usd(r.costTotal) }}
        heading="Want the all-in number?"
        sub="Compute is one line. Send this estimate and we will come back within 24 hours with the full picture: data, evals, engineering, hosting, and a fixed price."
        cta="Get a fixed quote"
      />
    </div>
  );
}
