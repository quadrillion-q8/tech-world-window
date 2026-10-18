import { useMemo, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaqSection } from '../components/FaqSection';
import { toolByPath } from '../data/tools';
import { SEOEngine } from '../seo/SEOEngine';

const TOOL_PATH = '/tools/video-embed-code-generator';
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
  'www.youtu.be',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);

type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3';
type OutputFormat = 'html' | 'jsx' | 'wordpress';
type ParsedVideo = { id: string } | { error: string };

const ASPECT_RATIOS: { value: AspectRatio; label: string; css: string }[] = [
  { value: '16:9', label: '16:9 · Standard video', css: '16 / 9' },
  { value: '9:16', label: '9:16 · Shorts / vertical', css: '9 / 16' },
  { value: '1:1', label: '1:1 · Square', css: '1 / 1' },
  { value: '4:3', label: '4:3 · Classic', css: '4 / 3' },
];

const ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

function parseYouTubeUrl(input: string): ParsedVideo | null {
  const value = input.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { error: 'Enter a complete YouTube URL, including the https:// prefix.' };
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) {
    return { error: 'Use a YouTube watch, youtu.be, Shorts, live, or embed URL. Other sites are not supported in this version.' };
  }

  const host = url.hostname.toLowerCase();
  let videoId: string | null = null;

  if (host === 'youtu.be' || host === 'www.youtu.be') {
    videoId = url.pathname.split('/').filter(Boolean)[0] || null;
  } else if (url.pathname === '/watch') {
    videoId = url.searchParams.get('v');
  } else {
    const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})(?:\/|$)/);
    videoId = match?.[1] || null;
  }

  if (!videoId || !VIDEO_ID_PATTERN.test(videoId)) {
    return { error: 'A valid 11-character YouTube video ID could not be found in that URL. Playlist-only links are not supported.' };
  }

  return { id: videoId };
}

function buildEmbedUrl(
  videoId: string,
  options: {
    privacyEnhanced: boolean;
    startSeconds: number;
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
    loop: boolean;
  },
): string {
  const host = options.privacyEnhanced ? 'www.youtube-nocookie.com' : 'www.youtube.com';
  const url = new URL(`https://${host}/embed/${videoId}`);
  if (options.startSeconds > 0) url.searchParams.set('start', String(options.startSeconds));
  url.searchParams.set('controls', options.controls ? '1' : '0');
  if (options.autoplay) url.searchParams.set('autoplay', '1');
  if (options.muted || options.autoplay) url.searchParams.set('mute', '1');
  if (options.loop) {
    url.searchParams.set('loop', '1');
    // YouTube requires the same video ID in playlist for a single video to loop.
    url.searchParams.set('playlist', videoId);
  }
  url.searchParams.set('playsinline', '1');
  return url.toString();
}

function htmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildEmbedCode(
  src: string,
  format: OutputFormat,
  ratioCss: string,
  lazyLoad: boolean,
): string {
  const safeSrc = htmlEscape(src);
  if (format === 'jsx') {
    return [
      '<div style={{ position: \'relative\', width: \'100%\', aspectRatio: \'PLACEHOLDER\' }}>',
      '  <iframe',
      `    src="${safeSrc}"`,
      '    title="YouTube video player"',
      '    style={{ position: \'absolute\', inset: 0, width: \'100%\', height: \'100%\', border: 0 }}',
      ...(lazyLoad ? ['    loading="lazy"'] : []),
      '    referrerPolicy="strict-origin-when-cross-origin"',
      `    allow="${ALLOW}"`,
      '    allowFullScreen',
      '  />',
      '</div>',
    ].join('\n').replace('PLACEHOLDER', ratioCss);
  }

  const comment = format === 'wordpress'
    ? '<!-- Paste into a WordPress Custom HTML block. Your editor or hosting plan may restrict iframe HTML. -->\n'
    : '';
  return comment + [
    `<div style="position:relative;width:100%;aspect-ratio:${ratioCss};">`,
    '  <iframe',
    `    src="${safeSrc}"`,
    '    title="YouTube video player"',
    '    style="position:absolute;inset:0;width:100%;height:100%;border:0;"',
    ...(lazyLoad ? ['    loading="lazy"'] : []),
    '    referrerpolicy="strict-origin-when-cross-origin"',
    `    allow="${ALLOW}"`,
    '    allowfullscreen',
    '  ></iframe>',
    '</div>',
  ].join('\n');
}

export function VideoEmbedCodeGeneratorPage() {
  const tool = toolByPath.get(TOOL_PATH)!;
  const [videoUrl, setVideoUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('html');
  const [startTime, setStartTime] = useState('0');
  const [privacyEnhanced, setPrivacyEnhanced] = useState(true);
  const [lazyLoad, setLazyLoad] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const parsed = useMemo(() => parseYouTubeUrl(videoUrl), [videoUrl]);
  const videoId = parsed && 'id' in parsed ? parsed.id : null;
  const ratioCss = ASPECT_RATIOS.find(item => item.value === aspectRatio)?.css || '16 / 9';
  const parsedStart = Number(startTime);
  const validStart = Number.isFinite(parsedStart) && parsedStart >= 0
    ? Math.min(86400, Math.floor(parsedStart))
    : 0;

  const embedOptions = {
    privacyEnhanced,
    startSeconds: validStart,
    controls: showControls,
    autoplay,
    muted,
    loop,
  };
  const currentEmbedUrl = videoId ? buildEmbedUrl(videoId, embedOptions) : null;
  const code = currentEmbedUrl ? buildEmbedCode(currentEmbedUrl, outputFormat, ratioCss, lazyLoad) : '';
  const previewNeedsUpdate = Boolean(currentEmbedUrl && previewSrc && previewSrc !== currentEmbedUrl);

  const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
    setPreviewSrc(null);
    setCopied(false);
    setCopyError('');
  };

  const onCopy = async () => {
    if (!code) return;
    setCopied(false);
    setCopyError('');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopyError('Your browser did not allow automatic copying. Select the code below and copy it manually.');
    }
  };

  const loadPreview = () => {
    if (!currentEmbedUrl) return;
    setPreviewSrc(currentEmbedUrl);
    setCopyError('');
  };

  return (
    <section className="section tool-page video-embed-page">
      <SEOEngine title={tool.seoTitle} description={tool.metaDescription} path={TOOL_PATH} />
      <span className="eyebrow">FREE BROWSER-BASED TOOL</span>
      <h1>Video Embed Code Generator</h1>
      <p className="page-intro">Generate responsive YouTube embed code for HTML, React JSX or WordPress. Adjust the player shape, start time, controls, looping and privacy-enhanced mode, then copy a snippet for your site.</p>

      <div className="ve-privacy-note">
        <strong>Local code generation. Preview is opt-in.</strong>
        <p>The video URL is parsed in your browser; this tool does not send it to an AI API or a Tech World Window code-generation service. A YouTube player is not loaded until you choose to load the preview below.</p>
      </div>

      <div className="ve-builder">
        <div className="ve-panel">
          <h2>1. Video and output</h2>
          <div className="ve-field">
            <label htmlFor="ve-video-url">YouTube video URL</label>
            <input
              id="ve-video-url"
              type="url"
              inputMode="url"
              autoComplete="url"
              value={videoUrl}
              onChange={onUrlChange}
              placeholder="https://www.youtube.com/watch?v=..."
              aria-describedby="ve-url-help"
            />
            <small id="ve-url-help">Supports watch, youtu.be, Shorts, live and /embed/ links. Playlist-only URLs are not supported.</small>
          </div>

          {parsed && 'error' in parsed && <p className="ve-error" role="alert">{parsed.error}</p>}
          {videoId && <p className="ve-valid" role="status"><span aria-hidden="true">✓</span> Valid YouTube video URL detected.</p>}

          <div className="ve-field">
            <label htmlFor="ve-output-format">Code format</label>
            <select id="ve-output-format" value={outputFormat} onChange={event => { setOutputFormat(event.target.value as OutputFormat); setCopied(false); }}>
              <option value="html">HTML iframe</option>
              <option value="jsx">React JSX</option>
              <option value="wordpress">WordPress Custom HTML</option>
            </select>
          </div>

          <div className="ve-field">
            <label htmlFor="ve-aspect-ratio">Aspect ratio</label>
            <select id="ve-aspect-ratio" value={aspectRatio} onChange={event => { setAspectRatio(event.target.value as AspectRatio); setCopied(false); }}>
              {ASPECT_RATIOS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>

          <div className="ve-field">
            <label htmlFor="ve-start-time">Start time (seconds)</label>
            <input
              id="ve-start-time"
              type="number"
              min="0"
              max="86400"
              step="1"
              value={startTime}
              onChange={event => { setStartTime(event.target.value); setCopied(false); }}
            />
            <small>Use 0 to start at the beginning. Values are rounded down to whole seconds and capped at 24 hours.</small>
          </div>
        </div>

        <div className="ve-panel">
          <h2>2. Playback and privacy</h2>
          <div className="ve-options">
            <label className="ve-toggle">
              <input type="checkbox" checked={privacyEnhanced} onChange={event => { setPrivacyEnhanced(event.target.checked); setCopied(false); }} />
              <span><strong>Privacy-enhanced domain</strong><small>Use youtube-nocookie.com for the embed host.</small></span>
            </label>
            <label className="ve-toggle">
              <input type="checkbox" checked={lazyLoad} onChange={event => { setLazyLoad(event.target.checked); setCopied(false); }} />
              <span><strong>Lazy-load embedded iframe</strong><small>Use the browser’s loading="lazy" hint.</small></span>
            </label>
            <label className="ve-toggle">
              <input type="checkbox" checked={showControls} onChange={event => { setShowControls(event.target.checked); setCopied(false); }} />
              <span><strong>Show player controls</strong><small>Let visitors pause, seek and adjust playback.</small></span>
            </label>
            <label className="ve-toggle">
              <input type="checkbox" checked={autoplay} onChange={event => { setAutoplay(event.target.checked); setCopied(false); }} />
              <span><strong>Autoplay</strong><small>Muted automatically to improve browser compatibility.</small></span>
            </label>
            <label className="ve-toggle">
              <input type="checkbox" checked={muted || autoplay} disabled={autoplay} onChange={event => { setMuted(event.target.checked); setCopied(false); }} />
              <span><strong>Start muted</strong><small>{autoplay ? 'Required by this generator when autoplay is enabled.' : 'Start playback without sound.'}</small></span>
            </label>
            <label className="ve-toggle">
              <input type="checkbox" checked={loop} onChange={event => { setLoop(event.target.checked); setCopied(false); }} />
              <span><strong>Loop the same video</strong><small>Includes YouTube’s required playlist parameter.</small></span>
            </label>
          </div>
          {autoplay && <p className="ve-hint" role="status">Autoplay is enabled, so the generated embed also sets mute=1. Some browsers may still restrict autoplay.</p>}
          {loop && <p className="ve-hint">Single-video looping requires both loop=1 and playlist set to the same video ID; both are included.</p>}
          {privacyEnhanced && <p className="ve-hint">Privacy-enhanced mode changes the embed hostname. It does not guarantee zero third-party requests or complete legal privacy compliance.</p>}
        </div>
      </div>

      <section className="ve-output" aria-labelledby="ve-code-heading">
        <div className="ve-output-heading">
          <div>
            <span className="eyebrow">READY TO COPY</span>
            <h2 id="ve-code-heading">3. Generated embed code</h2>
          </div>
          <button type="button" className="button button-primary ve-copy" onClick={onCopy} disabled={!code}>
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>
        {!videoId ? (
          <div className="ve-empty" role="status">
            <strong>Paste a valid YouTube URL to generate code.</strong>
            <p>No third-party video player loads while you configure this tool.</p>
          </div>
        ) : (
          <>
            <p className="ve-code-caption">{outputFormat === 'html' ? 'Paste into an HTML page or template.' : outputFormat === 'jsx' ? 'Paste into a React component’s JSX return block.' : 'Paste into a WordPress Custom HTML block if your editor permits iframe markup.'}</p>
            <label className="ve-sr-label" htmlFor="ve-generated-code">Generated code</label>
            <textarea id="ve-generated-code" className="ve-code" value={code} readOnly rows={Math.min(18, code.split('\n').length + 1)} spellCheck={false} onFocus={event => event.currentTarget.select()} />
            {copied && <p className="ve-valid" role="status">Embed code copied to clipboard.</p>}
            {copyError && <p className="ve-error" role="alert">{copyError}</p>}
          </>
        )}
      </section>

      <section className="ve-preview-panel" aria-labelledby="ve-preview-heading">
        <div className="ve-output-heading">
          <div>
            <span className="eyebrow">OPTIONAL THIRD-PARTY CONTENT</span>
            <h2 id="ve-preview-heading">4. Preview the player</h2>
          </div>
          {currentEmbedUrl && <button type="button" className="ft-secondary" onClick={loadPreview}>{previewSrc ? (previewNeedsUpdate ? 'Update preview' : 'Reload preview') : 'Load video preview'}</button>}
        </div>
        {!currentEmbedUrl ? (
          <div className="ve-preview-placeholder"><strong>Preview unavailable</strong><p>Enter a valid YouTube URL to enable the preview.</p></div>
        ) : !previewSrc ? (
          <div className="ve-preview-placeholder">
            <span className="ve-play-icon" aria-hidden="true">▶</span>
            <strong>Preview stays off until you request it.</strong>
            <p>Select “Load video preview” to allow this page to connect to YouTube for the selected video.</p>
          </div>
        ) : (
          <>
            {previewNeedsUpdate && <p className="ve-hint">Your settings changed. The preview below still shows the previous settings until you update it.</p>}
            <div className="ve-preview-frame" style={{ aspectRatio: ratioCss }}>
              <iframe
                key={previewSrc}
                src={previewSrc}
                title="YouTube video preview"
                allow={ALLOW}
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <button type="button" className="ft-secondary" onClick={() => setPreviewSrc(null)}>Remove preview and disconnect player</button>
          </>
        )}
      </section>

      <div className="article-body ve-explain">
        <section>
          <h2>How to use the video embed generator</h2>
          <ol className="article-steps">
            <li>Copy a YouTube watch URL, short link, Shorts URL, live URL or standard embed URL.</li>
            <li>Choose HTML, React JSX or WordPress Custom HTML output.</li>
            <li>Set the player ratio and playback options. Enabling autoplay automatically enables mute in the generated embed.</li>
            <li>Copy the snippet into your page or component and test it on desktop and mobile.</li>
            <li>Only load the optional preview if you are comfortable connecting to YouTube from this browser session.</li>
          </ol>
        </section>
        <section>
          <h2>What the options do</h2>
          <p>The responsive wrapper uses CSS aspect ratio and a fluid width so the video follows its container. The selected ratio changes the player shape; it does not crop or transform the original video itself.</p>
          <p>Lazy loading emits the iframe’s loading="lazy" attribute. It is a browser hint, not a guarantee that no request occurs at a particular moment. Privacy-enhanced mode uses the YouTube no-cookie embed hostname, but it should not be treated as a legal compliance certification.</p>
          <p>When looping one video, YouTube requires loop=1 plus playlist set to that same video ID. For autoplay, this tool enables mute because browsers commonly restrict autoplay with sound; individual browser policies may still vary.</p>
        </section>
        <section>
          <h2>Browser-only generation and external requests</h2>
          <p>The generator validates the URL and constructs the embed snippet in the browser. It does not use an AI API or upload your pasted URL to a TWW generation endpoint. Before you load the optional preview, no YouTube iframe is mounted by this tool. Once you load it—or use the generated snippet on your own website—the video provider can receive connection data according to its own settings and policies.</p>
          <p>WordPress output is provided as a convenience, not a guarantee that all WordPress installations accept iframe HTML. A hosted plan, editor, content-security policy, theme or security plug-in may filter it.</p>
        </section>
        <section>
          <h2>Related tools</h2>
          <p>Explore the <Link className="text-link" to="/tools">full Tech World Window tools directory</Link> for Windows troubleshooting, PC hardware planning and gaming diagnostics. This generator is designed for website publishing rather than PC repair or hardware benchmarking.</p>
        </section>
      </div>

      <FaqSection items={tool.faq || []} />
    </section>
  );
}
