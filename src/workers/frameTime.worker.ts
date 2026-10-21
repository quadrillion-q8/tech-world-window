/**
 * Background processing for frame-time captures.
 *
 * This worker owns file reading, CSV parsing, and statistical analysis so large
 * captures do not block the page's main thread. No network requests are made.
 */
import { analyzeFrames, parseFrameData, type FrameAnalysis, type ParseResult } from '../lib/frameTime';

export type FrameTimeWorkerMessage =
  | { type: 'parse-text'; text: string }
  | { type: 'parse-file'; file: File }
  | { type: 'analyze'; frames: number[]; targetHz: number };

export type FrameTimeWorkerRequest = FrameTimeWorkerMessage & { id: number };

export type FrameTimeWorkerResponse =
  | { id: number; type: 'parsed'; result: ParseResult }
  | { id: number; type: 'analyzed'; analysis: FrameAnalysis }
  | { id: number; type: 'error'; message: string };

const workerScope = self as unknown as {
  onmessage: ((event: MessageEvent<FrameTimeWorkerRequest>) => void) | null;
  postMessage: (response: FrameTimeWorkerResponse) => void;
};

workerScope.onmessage = async (event) => {
  const request = event.data;
  try {
    if (request.type === 'parse-text' || request.type === 'parse-file') {
      // File.text() is also performed in the worker so the main thread never
      // creates a second, potentially very large string for uploaded captures.
      const rawText = request.type === 'parse-file' ? await request.file.text() : request.text;
      workerScope.postMessage({ id: request.id, type: 'parsed', result: parseFrameData(rawText) });
      return;
    }

    const analysis = analyzeFrames(request.frames, request.targetHz);
    workerScope.postMessage({ id: request.id, type: 'analyzed', analysis });
  } catch {
    workerScope.postMessage({
      id: request.id,
      type: 'error',
      message: 'The capture could not be processed. Check the file and try a smaller capture.',
    });
  }
};
