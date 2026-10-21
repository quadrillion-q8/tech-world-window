/**
 * Background processing for frame-time captures.
 *
 * This worker owns file reading, CSV parsing, and statistical analysis so large
 * captures do not block the page's main thread. No network requests are made.
 */
import { analyzeFrames, parseFrameData, type FrameAnalysis, type FrameSamples, type ParseResult, type SpikeEvent } from '../lib/frameTime';

export type FrameTimeWorkerMessage =
  | { type: 'parse-text'; text: string }
  | { type: 'parse-file'; file: File }
  | { type: 'analyze'; frames: FrameSamples; targetHz: number };

export type FrameTimeWorkerRequest = FrameTimeWorkerMessage & { id: number };

export type FrameTimeWorkerResponse =
  | { id: number; type: 'parsed'; result: ParseResult }
  | { id: number; type: 'analyzed'; analysis: FrameAnalysis; worstSpikes: SpikeEvent[] }
  | { id: number; type: 'error'; message: string };

const workerScope = self as unknown as {
  onmessage: ((event: MessageEvent<FrameTimeWorkerRequest>) => void) | null;
  postMessage: (response: FrameTimeWorkerResponse, transfer?: Transferable[]) => void;
};

workerScope.onmessage = async (event) => {
  const request = event.data;
  try {
    if (request.type === 'parse-text' || request.type === 'parse-file') {
      // File.text() is also performed in the worker so the main thread never
      // creates a second, potentially very large string for uploaded captures.
      const rawText = request.type === 'parse-file' ? await request.file.text() : request.text;
      const result = parseFrameData(rawText);
      if (result.ok) {
        // Send frame samples as a transferable typed array. This avoids cloning
        // a million JavaScript number objects back to the main thread.
        const frames = Float64Array.from(result.data.frames);
        const transferred = { ...result, data: { ...result.data, frames } };
        workerScope.postMessage({ id: request.id, type: 'parsed', result: transferred }, [frames.buffer as ArrayBuffer]);
      } else {
        workerScope.postMessage({ id: request.id, type: 'parsed', result });
      }
      return;
    }

    const analysis = analyzeFrames(request.frames, request.targetHz);
    // Keep ranking of the slowest events off the UI thread as captures grow.
    const worstSpikes = [...analysis.spikes].sort((a, b) => b.worstMs - a.worstMs).slice(0, 5);
    workerScope.postMessage({ id: request.id, type: 'analyzed', analysis, worstSpikes });
  } catch {
    workerScope.postMessage({
      id: request.id,
      type: 'error',
      message: 'The capture could not be processed. Check the file and try a smaller capture.',
    });
  }
};
