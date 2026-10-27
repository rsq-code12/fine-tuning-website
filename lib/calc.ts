/*
 * Fine-tuning compute estimator. The same assumptions are written out in plain English on the
 * calculator page and in the cost guide, so humans and answer engines can check the maths.
 *
 *   training tokens = examples × tokens per example × epochs
 *   FLOPs           = k × parameters × training tokens   (k = 6 full, 4 LoRA, 4 × 1.4 QLoRA)
 *   GPU-hours       = FLOPs ÷ effective FLOP/s ÷ 3600 × 1.5 overhead (÷ 0.85 when sharded across GPUs)
 *   GPUs needed     = parameters × bytes per parameter × 1.2 ÷ (GPU memory × 0.9)
 */

export const MODELS = [
  { id: '1b', label: '1B (Llama 3.2 1B class)', params: 1e9 },
  { id: '3b', label: '3B (Llama 3.2 3B class)', params: 3e9 },
  { id: '8b', label: '8B (Llama 3.1 8B class)', params: 8e9 },
  { id: '14b', label: '14B (Qwen 14B class)', params: 14e9 },
  { id: '32b', label: '32B (Qwen 32B class)', params: 32e9 },
  { id: '70b', label: '70B (Llama 3.3 70B class)', params: 70e9 },
  { id: '405b', label: '405B (Llama 3.1 405B class)', params: 405e9 },
] as const;

export const METHODS = [
  { id: 'qlora', label: 'QLoRA (4-bit base + adapters)', k: 4 * 1.4, bytes: 0.65 },
  { id: 'lora', label: 'LoRA (16-bit base + adapters)', k: 4, bytes: 2.2 },
  { id: 'full', label: 'Full fine-tune (all weights)', k: 6, bytes: 18 },
] as const;

export const GPUS = [
  { id: 'h100', label: 'NVIDIA H100 80GB', tflops: 250, mem: 80, rate: 2.5 },
  { id: 'h200', label: 'NVIDIA H200 141GB', tflops: 300, mem: 141, rate: 3.5 },
  { id: 'b200', label: 'NVIDIA B200 192GB', tflops: 550, mem: 192, rate: 5.5 },
  { id: 'a100', label: 'NVIDIA A100 80GB', tflops: 100, mem: 80, rate: 1.5 },
  { id: 'l40s', label: 'NVIDIA L40S 48GB', tflops: 90, mem: 48, rate: 0.95 },
] as const;

export type CalcInput = {
  model: string;
  method: string;
  gpu: string;
  examples: number;
  tokensPerExample: number;
  epochs: number;
  runs: number;
  /** $/GPU-hour; defaults to the GPU's typical on-demand rate */
  rate?: number;
};

export type CalcResult = {
  tokens: number;
  flops: number;
  gpus: number;
  gpuHours: number;
  wallHours: number;
  costPerRun: number;
  costTotal: number;
  rate: number;
  memoryGb: number;
};

export function estimate(i: CalcInput): CalcResult {
  const model = MODELS.find((m) => m.id === i.model) ?? MODELS[2];
  const method = METHODS.find((m) => m.id === i.method) ?? METHODS[1];
  const gpu = GPUS.find((g) => g.id === i.gpu) ?? GPUS[0];
  const rate = i.rate && i.rate > 0 ? i.rate : gpu.rate;

  const tokens = Math.max(0, i.examples) * Math.max(1, i.tokensPerExample) * Math.max(1, i.epochs);
  const flops = method.k * model.params * tokens;
  const memoryGb = (model.params * method.bytes * 1.2) / 1e9;
  const gpus = Math.max(1, Math.ceil(memoryGb / (gpu.mem * 0.9)));
  const sharding = gpus > 1 ? 1 / 0.85 : 1;
  const gpuHours = Math.max(0.1 * gpus, (flops / (gpu.tflops * 1e12) / 3600) * 1.5 * sharding);
  const costPerRun = gpuHours * rate;

  return {
    tokens,
    flops,
    gpus,
    gpuHours,
    wallHours: gpuHours / gpus,
    costPerRun,
    costTotal: costPerRun * Math.max(1, i.runs),
    rate,
    memoryGb,
  };
}

export const DEFAULT_INPUT: CalcInput = { model: '8b', method: 'lora', gpu: 'h100', examples: 5000, tokensPerExample: 800, epochs: 3, runs: 5 };
