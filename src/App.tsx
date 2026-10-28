import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  ReactNode,
  PointerEvent,
} from "react";

import {
  Avatar,
  Button,
  CopyButton,
  FileButton,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";

import {
  IconArrowRight,
  IconBriefcase,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconCopy,
  IconDownload,
  IconLayoutGrid,
  IconListDetails,
  IconLock,
  IconMail,
  IconMusic,
  IconPlayerPlay,
  IconShoppingCart,
  IconSitemap,
  IconUpload,
  IconUser,
  IconExternalLink,

} from "@tabler/icons-react";

import {
  profile,
  projects,
  layers,
  experience,
  query,
  response,
} from "./data";

import type { Project } from "./data";
import { reduced, useCount, useInView } from "./hooks";

const idx = (i: number) =>
  ({ "--i": i }) as CSSProperties;
const PAD = "px-5 nav:px-14";

const SECTIONS = [
  { id: "overview", label: "Home", Icon: IconLayoutGrid },
  { id: "modules", label: "Projects", Icon: IconListDetails },
  { id: "architecture", label: "My Skills", Icon: IconSitemap },
  { id: "experience", label: "Experience", Icon: IconBriefcase },
  { id: "contact", label: "Contact", Icon: IconMail },
];

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode | ((seen: boolean) => ReactNode);
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,translate] duration-[900ms] ease-soft ${
        seen
          ? "translate-y-0 opacity-100"
          : "motion-safe:translate-y-7 motion-safe:opacity-0"
      } ${className}`}
    >
      {typeof children === "function"
        ? children(seen)
        : children}
    </div>
  );
}

function Heading({
  text,
  light,
}: {
  text: string;
  light?: boolean;
}) {
  const { ref, seen } = useInView<HTMLHeadingElement>(0.4);

  return (
    <h2
      ref={ref}
      className={`flex flex-wrap gap-x-[0.26em] font-medium tracking-[-0.02em] ${
        light
          ? "mb-7 text-[clamp(2.2rem,5.5vw,4.4rem)]"
          : "mb-10 text-[clamp(2rem,4.6vw,3.4rem)]"
      }`}
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <span
          className="inline-block overflow-hidden pb-[0.14em]"
          key={i}
          aria-hidden="true"
        >
          <span
            style={idx(i)}
            className={`inline-block transition-transform duration-[900ms] ease-soft [transition-delay:calc(var(--i)*90ms)] ${
              seen
                ? "translate-y-0 rotate-0"
                : "motion-safe:translate-y-[110%] motion-safe:rotate-5"
            }`}
          >
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
}

function Stat({
  to,
  suffix = "",
  label,
  i,
}: {
  to: number;
  suffix?: string;
  label: string;
  i: number;
}) {
  const { ref, seen } = useInView<HTMLDivElement>(0.5);
  const value = useCount(to, seen);

  return (
    <div
      ref={ref}
      className="relative border-ink/14 py-6 not-first:border-t nav:py-10 nav:not-first:border-t-0 nav:not-first:border-l nav:not-first:pl-7"
    >
      <p className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none font-medium text-deep tabular-nums">
        {value}
        {suffix}
      </p>

      <p className="mt-1.5 max-w-56">{label}</p>

      <span
        aria-hidden="true"
        className={`absolute bottom-0 h-[3px] w-14 origin-left bg-gold transition-transform delay-300 duration-1000 ease-soft ${
          i === 0 ? "left-0" : "left-0 nav:left-7"
        } ${seen ? "scale-x-100" : "motion-safe:scale-x-0"}`}
      />
    </div>
  );
}

function Photo() {
  const [src, setSrc] = useState(profile.photo);
  const srcRef = useRef(src);

  srcRef.current = src;

  useEffect(() => {
    return () => {
      if (srcRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(srcRef.current);
      }
    };
  }, []);

  const pick = (file: File | null) => {
    if (!file) return;

    setSrc((old) => {
      if (old.startsWith("blob:")) {
        URL.revokeObjectURL(old);
      }

      return URL.createObjectURL(file);
    });
  };

  return (
    <FileButton
      onChange={pick}
      accept="image/*"
    >
      {(props) => (
        <Tooltip
          label="Change profile photo"
          withArrow
        >
          <UnstyledButton
            {...props}
            className="mb-[100px] block size-32 cursor-pointer rounded-full transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-[3px]"
            aria-label="Choose a profile photo"
          >
            <Avatar
              src={src || null}
              alt={`Portrait of ${profile.name}`}
              size={200}
              radius="50%"
              className="border-2 border-dashed border-current [&:has(img)]:border-solid"
            >
              <span className="grid place-items-center gap-1.5 text-[0.8rem]">
                <IconUpload size={26} stroke={1.75} />
                Add photo
              </span>
            </Avatar>
          </UnstyledButton>
        </Tooltip>
      )}
    </FileButton>
  );
}

function hl(src: string): ReactNode[] {
  const re =
    /("[^"]*"(?=:)|"[^"]*"?|\bquery\b|[{}()[\]:])/g;

  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(src))) {
    if (match.index > last) {
      out.push(src.slice(last, match.index));
    }

    const token = match[0];

    const cls = token.startsWith('"')
      ? src[match.index + token.length] === ":"
        ? "text-aqua"
        : "text-gold"
      : token === "query"
        ? "text-aqua"
        : "opacity-60";

    out.push(
      <span
        key={match.index}
        className={cls}
      >
        {token}
      </span>,
    );

    last = match.index + token.length;
  }

  out.push(src.slice(last));

  return out;
}

const CODE =
  "overflow-x-auto px-5 pt-4 pb-1.5 font-mono text-[0.92rem] leading-[1.7] font-medium whitespace-pre";

function QueryPanel({ go }: { go: boolean }) {
  const [n, setN] = useState(
    reduced() ? query.length : 0,
  );

  const [phase, setPhase] = useState<
    "typing" | "running" | "done"
  >(reduced() ? "done" : "typing");

  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!go || reduced()) return;

    setN(0);
    setPhase("typing");

    let count = 0;
    let timer = 0;

    const type = () => {
      count += 1;
      setN(count);

      if (count < query.length) {
        timer = window.setTimeout(
          type,
          query[count] === "\n" ? 140 : 26,
        );
      } else {
        setPhase("running");

        timer = window.setTimeout(
          () => setPhase("done"),
          800,
        );
      }
    };

    timer = window.setTimeout(
      type,
      run === 0 ? 1500 : 250,
    );

    return () => window.clearTimeout(timer);
  }, [go, run]);

  return (
    <div
      className={`min-h-[400px] rounded-[14px] bg-deep text-mist shadow-[8px_8px_0_var(--color-gold)] motion-safe:opacity-0 wide:translate-x-6 wide:shadow-[12px_12px_0_var(--color-gold)] ${
        go
          ? "animate-up [animation-delay:700ms] [animation-duration:1s]"
          : ""
      }`}
    >
      <div className="flex items-center justify-between border-b border-mist/24 px-8 py-3">
        <span className="text-[0.9rem] opacity-80">
          prakriti.graphql
        </span>

        <Button
          className="h-auto rounded-full bg-gold px-4 py-1 text-[0.85rem] font-semibold text-deep transition-transform hover:bg-gold hover:not-disabled:scale-105 disabled:bg-gold disabled:text-deep disabled:opacity-45"
          size="compact-xs"
          variant="light"
          leftSection={
            <IconPlayerPlay size={12} />
          }
          loading={phase !== "done"}
          disabled={phase !== "done"}
          onClick={() => setRun((value) => value + 1)}
        >
          {phase === "done" ? "Run again" : "Running"}
        </Button>
      </div>

      <pre
        className={`${CODE} min-h-[154px]`}
        aria-label="GraphQL query"
      >
        {hl(query.slice(0, n))}

        {phase === "typing" && go && (
          <span className="inline-block h-[1.1em] w-2 animate-blink bg-gold align-[-0.2em]" />
        )}
      </pre>

      <div
        className="mt-2.5 min-h-[190px] border-t border-dashed border-mist/20 pt-2.5"
        aria-live="polite"
      >
        {phase === "running" && (
          <p className="flex items-center gap-2.5 px-5 py-3.5 text-[0.9rem] opacity-80">
            <i className="size-3.5 animate-spin rounded-full border-2 border-gold border-t-transparent [animation-duration:0.7s]" />
            Loading profile
          </p>
        )}

        {phase === "done" && (
          <pre className={`${CODE} min-h-0 pt-1.5`}>
            {response.map((line, i) => (
              <div
                key={i}
                className="animate-line [animation-delay:calc(var(--i)*110ms)]"
                style={idx(i)}
              >
                {hl(line)}
              </div>
            ))}
          </pre>
        )}
      </div>
    </div>
  );
}

const CHIP =
  "rounded-full border border-ink/14 bg-white px-3 py-0.5 text-xs";

function Mock({
  kind,
}: {
  kind: Project["kind"];
}) {
  const title =
    kind === "dashboard"
      ? "Dashboard"
      : kind === "report"
        ? "Reports"
        : kind === "documents"
          ? "Documents"
          : kind === "resume"
            ? "Resume Builder"
            : kind === "shop"
              ? "ShopAdmin"
              : "Swortaal";

  return (
    <div
      className="min-h-[280px] overflow-hidden rounded-[10px] border border-ink/14 bg-mist"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-ink/14 bg-white px-3 py-2 text-[0.78rem]">
        <i className="size-[9px] rounded-full bg-ink/14" />
        <i className="size-[9px] rounded-full bg-ink/14" />
        <i className="size-[9px] rounded-full bg-ink/14" />
        <span className="ml-2 opacity-60">{title}</span>
      </div>

      {kind === "dashboard" && (
        <div className="grid min-h-[240px] grid-cols-[44px_1fr]">
          <div className="grid content-start gap-2.5 bg-deep px-2.5 py-3">
            {[0, 1, 2, 3].map((i) => (
              <i
                key={i}
                className={`h-[22px] rounded-md ${
                  i === 0 ? "bg-gold" : "bg-mist/25"
                }`}
              />
            ))}
          </div>

          <div className="grid gap-3 p-3.5">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <b
                  key={i}
                  style={idx(i)}
                  className="h-[34px] animate-up rounded-md border border-ink/14 bg-white [animation-delay:calc(var(--i)*120ms)]"
                />
              ))}
            </div>

            <div className="flex h-[100px] items-end gap-1.5 border-b border-ink/14">
              {[45, 70, 55, 90, 65, 80, 50, 95].map(
                (height, i) => (
                  <i
                    key={i}
                    style={{
                      ...idx(i),
                      "--h": `${height}%`,
                    } as CSSProperties}
                    className={`block h-(--h) flex-1 origin-bottom animate-rise rounded-t-[3px] [animation-delay:calc(var(--i)*140ms)] ${
                      i === 3 ? "bg-gold" : "bg-deep2"
                    }`}
                  />
                ),
              )}
            </div>

            <div className="flex gap-2">
              {["Admin", "Editor", "Viewer"].map(
                (role, i) => (
                  <span
                    key={role}
                    style={idx(i)}
                    className={`${CHIP} animate-pick [animation-delay:calc(var(--i)*1.5s)]`}
                  >
                    {role}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {kind === "report" && (
        <div className="grid gap-3 p-3.5">
          <div className="flex gap-2 text-xs">
            <span className={CHIP}>Status: Active</span>
            <span className={CHIP}>This month</span>
            <span
              className={`${CHIP} ml-auto animate-nudge border-deep bg-deep text-mist`}
            >
              Export
            </span>
          </div>

          <div className="relative grid gap-2">
            <div className="grid grid-cols-[2fr_1.2fr_1fr] gap-2.5 rounded-md border border-ink/14 bg-deep p-2.5">
              <i className="h-2 rounded bg-mist/50" />
              <i className="h-2 rounded bg-mist/50" />
              <i className="h-2 rounded bg-mist/50" />
            </div>

            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={idx(i)}
                className="grid animate-slide grid-cols-[2fr_1.2fr_1fr] gap-2.5 rounded-md border border-ink/14 bg-white p-2.5 [animation-delay:calc(var(--i)*110ms+100ms)]"
              >
                <i className="h-2 rounded bg-ink/14" />
                <i className="h-2 rounded bg-ink/14" />
                <i className="h-2 rounded bg-ink/14" />
              </div>
            ))}

            <div className="pointer-events-none absolute inset-x-0 top-0 h-9 animate-scan rounded-md border-2 border-gold bg-gold/15" />
          </div>
        </div>
      )}

      {kind === "documents" && (
        <div className="relative grid gap-3.5 p-3.5">
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={idx(i)}
                className="grid animate-pop gap-1.5 rounded-lg border border-ink/14 bg-white p-2 [animation-delay:calc(var(--i)*90ms)]"
              >
                <b
                  className={`h-[34px] rounded ${
                    ["bg-aqua", "bg-gold", "bg-deep2"][i % 3]
                  }`}
                />
                <i className="h-1.5 rounded-sm bg-ink/14" />
                <i className="h-1.5 w-3/5 rounded-sm bg-ink/14" />
              </div>
            ))}
          </div>

          <div className="relative grid h-[60px] place-items-center rounded-lg border-2 border-dashed border-deep2 text-[0.85rem] text-deep2">
            <span className="absolute h-[38px] w-[30px] animate-fly rounded-[5px] bg-gold" />
            Drop files here
          </div>

          <IconLock
            className="absolute right-[18px] bottom-[22px] animate-nudge text-deep"
            size={22}
            stroke={1.75}
          />
        </div>
      )}

      {kind === "resume" && (
        <div className="grid min-h-[240px] grid-cols-[1fr_84px] gap-3 p-3.5">
          <div className="grid content-start gap-3 rounded-lg border border-ink/14 bg-white p-3">
            <div className="grid gap-1.5 rounded-md bg-deep p-2.5">
              <i className="h-2 w-2/3 rounded bg-mist/70" />
              <i className="h-1.5 w-1/2 rounded bg-mist/40" />
            </div>

            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={idx(i)}
                className="grid animate-slide gap-1.5 [animation-delay:calc(var(--i)*110ms+100ms)]"
              >
                <i className="h-1.5 w-1/3 rounded bg-deep2/60" />
                <i className="h-1.5 rounded bg-ink/14" />
                <i className="h-1.5 w-4/5 rounded bg-ink/14" />
              </div>
            ))}

            <div className="flex gap-1.5">
              {["React", "TypeScript", "CSS"].map((skill, i) => (
                <span
                  key={skill}
                  style={idx(i)}
                  className={`${CHIP} animate-pop [animation-delay:calc(var(--i)*90ms+500ms)]`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-2">
            {["bg-deep", "bg-gold", "bg-aqua", "bg-deep2"].map(
              (color, i) => (
                <i
                  key={color}
                  style={idx(i)}
                  className={`h-[38px] animate-pop rounded-md border border-ink/14 [animation-delay:calc(var(--i)*90ms)] ${color}`}
                />
              ),
            )}

            <IconDownload
              className="mx-auto mt-2 animate-nudge text-deep"
              size={22}
              stroke={1.75}
            />
          </div>
        </div>
      )}

      {kind === "shop" && (
        <div className="grid min-h-[240px] gap-3 p-3.5">
          <div className="flex gap-2">
            {["Admin", "Buyer"].map((role, i) => (
              <span
                key={role}
                style={idx(i)}
                className={`${CHIP} animate-pick [animation-delay:calc(var(--i)*2.25s)]`}
              >
                {role}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid content-start gap-2 rounded-lg border border-ink/14 bg-white p-2.5">
              <div className="grid grid-cols-2 gap-1.5">
                <b className="h-7 animate-up rounded bg-deep" />
                <b className="h-7 animate-up rounded bg-gold [animation-delay:120ms]" />
              </div>

              <div className="flex h-[70px] items-end gap-1 border-b border-ink/14">
                {[40, 65, 50, 85, 60].map((height, i) => (
                  <i
                    key={i}
                    style={{
                      ...idx(i),
                      "--h": `${height}%`,
                    } as CSSProperties}
                    className={`block h-(--h) flex-1 origin-bottom animate-rise rounded-t-[3px] [animation-delay:calc(var(--i)*140ms)] ${
                      i === 3 ? "bg-gold" : "bg-deep2"
                    }`}
                  />
                ))}
              </div>

              {[0, 1].map((i) => (
                <div
                  key={i}
                  style={idx(i)}
                  className="grid animate-slide grid-cols-[2fr_1fr] gap-2 [animation-delay:calc(var(--i)*110ms+300ms)]"
                >
                  <i className="h-1.5 rounded bg-ink/14" />
                  <i className="h-1.5 rounded bg-ink/14" />
                </div>
              ))}
            </div>

            <div className="relative grid grid-cols-2 content-start gap-2 rounded-lg border border-ink/14 bg-white p-2.5 pb-9">
              {["bg-aqua", "bg-gold", "bg-deep2", "bg-aqua"].map(
                (color, i) => (
                  <div
                    key={i}
                    style={idx(i)}
                    className="grid animate-pop gap-1 [animation-delay:calc(var(--i)*90ms)]"
                  >
                    <b className={`h-9 rounded ${color}`} />
                    <i className="h-1.5 rounded-sm bg-ink/14" />
                    <i className="h-1.5 w-3/5 rounded-sm bg-ink/14" />
                  </div>
                ),
              )}

              <IconShoppingCart
                className="absolute right-2.5 bottom-2 animate-nudge text-deep"
                size={20}
                stroke={1.75}
              />
            </div>
          </div>
        </div>
      )}

      {kind === "music" && (
        <div className="relative flex h-full min-h-[270px] flex-col items-center justify-center gap-[18px] overflow-hidden p-6">
          <div className="grid aspect-square w-[110px] place-items-center rounded-[22px] border border-white/15 bg-linear-to-br from-[rgba(120,148,125,0.75)] to-[rgba(52,76,158,0.75)] shadow-[0_12px_35px_rgba(0,0,0,0.18)]">
            <IconMusic size={38} stroke={1.5} />
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <b className="text-sm font-semibold">
              Made for your taste
            </b>
            <span className="text-[11px] opacity-65">
              Discover something new
            </span>
          </div>

          <div className="flex h-[30px] items-center justify-center gap-[5px]">
            {[35, 65, 45, 85, 55, 95, 40, 70, 50].map(
              (height, i) => (
                <i
                  key={i}
                  style={{
                    ...idx(i),
                    "--h": `${height}%`,
                  } as CSSProperties}
                  className="block h-(--h) min-h-[5px] w-1 animate-music-wave rounded-full bg-[#78947d] [animation-delay:calc(var(--i)*90ms)]"
                />
              ),
            )}
          </div>

          <div className="flex w-[min(100%,190px)] justify-between gap-2">
            <span className="h-1 w-1/3 rounded-full bg-current opacity-60" />
            <span className="h-1 w-1/3 rounded-full bg-current opacity-10" />
            <span className="h-1 w-1/3 rounded-full bg-current opacity-10" />
          </div>
        </div>
      )}
    </div>
  );
}

function Modules() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduced()) return;

    const timer = window.setTimeout(
      () => {
        setTab((value) => (value + 1) % projects.length);
      },
      7000,
    );

    return () => window.clearTimeout(timer);
  }, [tab, paused]);

  const project = projects[tab];

  return (
    <div
      className="grid grid-cols-1 overflow-hidden rounded-[14px] border border-ink/14 bg-white wide:grid-cols-[280px_1fr]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="grid grid-flow-col overflow-x-auto border-b border-ink/14 wide:grid-flow-row wide:content-start wide:overflow-visible wide:border-r wide:border-b-0"
        role="tablist"
        aria-label="My projects"
        aria-orientation="vertical"
      >
        {projects.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`tab-${i}`}
            aria-selected={tab === i}
            aria-controls="panel"
            className={`relative grid min-w-[200px] gap-0.5 border-r border-ink/14 px-6 py-[22px] text-left transition-[background,padding] duration-300 last:border-0 wide:min-w-0 wide:border-r-0 wide:border-b wide:last:border-b-0 ${
              tab === i
                ? "bg-deep text-mist wide:pl-8"
                : "hover:bg-mist"
            }`}
            onClick={() => setTab(i)}
          >
            <span className="font-serif text-[1.35rem] font-medium">
              {item.title}
            </span>

            <span className="text-[0.85rem] opacity-65">
              {item.tags.slice(0, 3).join(", ")}
            </span>

            <span
              className={`absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gold [transform:scaleX(0)] ${
                tab === i
                  ? "animate-fill motion-reduce:[transform:scaleX(1)]"
                  : ""
              } ${
                tab === i && paused
                  ? "[animation-play-state:paused]"
                  : ""
              }`}
            />
          </button>
        ))}
      </div>

      <div
        className="grid animate-panel-in grid-cols-1 items-center gap-8 p-8 wide:grid-cols-[1fr_1.05fr]"
        role="tabpanel"
        id="panel"
        aria-labelledby={`tab-${tab}`}
        key={tab}
      >
        <div>
          <p className="mb-5 font-serif text-[1.4rem] leading-[1.3]">
            {project.summary}
          </p>

          <ul className="grid gap-3">
            {project.points.map((point, i) => (
              <li
                key={point}
                style={idx(i)}
                className="relative animate-up pl-[22px] [animation-delay:calc(var(--i)*120ms+250ms)] before:absolute before:top-[0.6em] before:left-0 before:size-[9px] before:rounded-full before:bg-gold before:content-['']"
              >
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-ink/14 px-2.5 py-1.5 text-[11px] leading-[1.4] opacity-85"
              >
                {tag}
              </span>
            ))}
            {project.link && (
  <a
    href={project.link}
    target="_blank"
    rel="noreferrer"
    className="mt-5 inline-flex items-center gap-1.5 font-semibold text-deep underline decoration-gold decoration-2 underline-offset-4 transition-[gap] duration-200 hover:gap-2.5"
  >
    {project.tab}
    <IconExternalLink size={16} aria-hidden="true" />
  </a>
)}
          </div>
        </div>

        <Mock kind={project.kind} />
      </div>
    </div>
  );
}

function Flow() {
  return (
    <div className="flex flex-col items-stretch wide:flex-row">
      {layers.map((layer, i) => (
        <div
          className="flex min-w-0 flex-1 flex-col items-stretch wide:flex-row wide:items-center wide:last:flex-none"
          key={layer.name}
        >
          <div
            className="w-full shrink-0 animate-lit rounded-[14px_14px_14px_2px] border-[1.5px] border-ink bg-white p-[22px] [animation-delay:calc(var(--i)*1.5s)] wide:w-[210px]"
            style={idx(i)}
          >
            <h3 className="text-2xl font-semibold">
              {layer.name}
            </h3>

            <p className="mt-2 font-semibold text-deep2">
              {layer.items.join(", ")}
            </p>

            <p className="mt-1 text-[0.9rem] opacity-70">
              {layer.note}
            </p>
          </div>

          {i < layers.length - 1 && (
            <div
              className="relative ml-7 h-10 w-0.5 flex-none bg-[repeating-linear-gradient(180deg,var(--color-ink)_0_6px,transparent_6px_12px)] wide:ml-0 wide:h-0.5 wide:w-auto wide:min-w-7 wide:flex-1 wide:bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_6px,transparent_6px_12px)]"
              aria-hidden="true"
            >
              <i
                style={idx(i)}
                className="absolute top-0 -left-[5px] size-3 animate-travel-y rounded-full bg-deep opacity-0 [animation-delay:calc(var(--i)*1.5s+0.7s)] wide:-top-[5px] wide:left-0 wide:animate-travel"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CopyEmail() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <a
        className="font-serif text-[clamp(1.4rem,3.6vw,2.6rem)] break-all underline decoration-gold decoration-[3px] underline-offset-8 transition-[letter-spacing] duration-[400ms] ease-soft hover:tracking-[0.02em]"
        href={`mailto:${profile.email}`}
      >
        {profile.email}
      </a>

      <CopyButton
        value={profile.email}
        timeout={1800}
      >
        {({ copied, copy }) => (
          <Tooltip
            label={
              copied
                ? "Copied"
                : "Copy to clipboard"
            }
            withArrow
          >
            <Button
              className={`h-auto rounded-full border-[1.5px] px-5 py-2 font-semibold transition-[background,color,translate] duration-300 hover:-translate-y-0.5 ${
                copied
                  ? "border-gold bg-gold text-ink hover:bg-gold hover:text-ink"
                  : "border-mist bg-transparent text-mist hover:bg-mist hover:text-deep"
              }`}
              variant="default"
              leftSection={
                copied ? (
                  <IconCheck size={16} />
                ) : (
                  <IconCopy size={16} />
                )
              }
              onClick={copy}
            >
              {copied ? "Copied" : "Copy email"}
            </Button>
          </Tooltip>
        )}
      </CopyButton>
    </div>
  );
}

function SocialLinks({
  variant,
}: {
  variant: "side" | "pill";
}) {
  const wrap =
    variant === "side"
      ? "mt-auto hidden gap-[18px] text-[0.9rem] nav:flex"
      : "mt-8 flex gap-3.5";

  const link =
    variant === "side"
      ? "inline-flex items-center gap-1.5 border-b border-transparent opacity-70 transition-[opacity,border-color] duration-200 hover:border-gold hover:opacity-100"
      : "inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-mist/50 px-[22px] py-2 font-semibold transition-[background,color,translate] duration-300 hover:-translate-y-[3px] hover:bg-mist hover:text-deep";

  return (
    <div className={wrap}>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        <IconBrandGithub
          size={18}
          aria-hidden="true"
        />
        GitHub
      </a>

      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        className={link}
      >
        <IconBrandLinkedin
          size={18}
          aria-hidden="true"
        />
        LinkedIn
      </a>
    </div>
  );
}

const BTN =
  "h-auto rounded-full border-[1.5px] px-[26px] py-3 font-semibold transition-[background,color,translate] duration-300 hover:-translate-y-[3px]";

export default function App() {
  const [go, setGo] = useState(reduced());
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setGo(true),
      60,
    );

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const updateProgress = () => {
      raf = 0;

      const max =
        root.scrollHeight - window.innerHeight;

      root.style.setProperty(
        "--p",
        String(
          max > 0 ? window.scrollY / max : 0,
        ),
      );
    };

    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      onScroll,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = SECTIONS.findIndex(
            (section) =>
              section.id === entry.target.id,
          );

          if (index !== -1) {
            setActive(index);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      },
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(
        section.id,
      );

      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll,
      );

      window.removeEventListener(
        "resize",
        onScroll,
      );

      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const spot = (event: PointerEvent<HTMLElement>) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--sx",
      `${event.clientX - rect.left}px`,
    );

    event.currentTarget.style.setProperty(
      "--sy",
      `${event.clientY - rect.top}px`,
    );
  };

  const intro = go ? "animate-up" : "";

  return (
    <div>

      <aside
        className={`sticky top-0 z-40 flex flex-row items-center gap-3 overflow-x-auto bg-deep px-4 py-2.5 text-mist transition-transform duration-[900ms] ease-soft nav:fixed nav:inset-y-0 nav:left-0 nav:w-[268px] nav:flex-col nav:items-stretch nav:gap-9 nav:overflow-visible nav:px-5 nav:py-7 ${
          go ? "" : "nav:motion-safe:-translate-x-full"
        }`}
      >
        <a
          href="#overview"
          className="group flex items-center gap-3 no-underline"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold font-serif text-2xl font-bold text-deep transition-transform duration-[600ms] ease-soft [font-variation-settings:'SOFT'_100,'WONK'_1] group-hover:-rotate-12 group-hover:scale-[1.08]">
            P
          </span>

          <span>
            <b className="block font-serif text-xl leading-[1.1]">
              {profile.name}
            </b>
            <small className="hidden text-[0.85rem] opacity-70 nav:block">
              {profile.role}
            </small>
          </span>
        </a>

        <nav
          aria-label="Primary"
          style={{ "--a": active } as CSSProperties}
          className="relative flex gap-0.5 nav:grid nav:gap-1"
        >
          <span
            className="absolute inset-x-0 top-0 hidden h-11 translate-y-[calc(var(--a,0)*48px)] rounded-[10px] bg-deep2 transition-transform duration-500 ease-soft nav:block"
            aria-hidden="true"
          />

          {SECTIONS.map(
            ({ id, label, Icon }, i) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative flex h-10 items-center gap-3 rounded-[10px] px-3 font-medium whitespace-nowrap no-underline transition-[opacity,gap] duration-200 nav:h-11 nav:px-3.5 nav:hover:gap-4 ${
                  active === i
                    ? "bg-deep2 opacity-100 nav:bg-transparent"
                    : "opacity-70 hover:opacity-100"
                }`}
                aria-current={
                  active === i
                    ? "location"
                    : undefined
                }
              >
                <Icon
                  size={18}
                  stroke={1.75}
                  aria-hidden="true"
                  className="hidden shrink-0 nav:block"
                />

                {label}
              </a>
            ),
          )}
        </nav>

        <SocialLinks variant="side" />
      </aside>

      <div className="nav:ml-[268px]">
        <header className="sticky top-[60px] z-30 flex h-[52px] items-center justify-between bg-mist/85 px-5 backdrop-blur-[10px] nav:top-0 nav:h-16 nav:px-14">
          <p className="text-[0.95rem]">
            Portfolio
            <span className="mx-1 opacity-40">/</span>
            <b
              key={active}
              className="inline-block animate-swap font-semibold"
            >
              {SECTIONS[active].label}
            </b>
          </p>

          <Button
            component="a"
            href="#contact"
            className="h-auto rounded-full border-[1.5px] border-ink bg-transparent px-[18px] py-2 text-[0.9rem] font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-mist"
            size="compact-sm"
            variant="default"
            leftSection={
              <IconUser size={14} />
            }
          >
            Get in touch
          </Button>

          <span
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gold [transform:scaleX(var(--p,0))]"
            aria-hidden="true"
          />
        </header>

        <main>

          <section
            id="overview"
            className={`${PAD} relative grid min-h-[calc(100svh-64px)] grid-cols-1 items-center gap-14 bg-[radial-gradient(520px_circle_at_var(--sx)_var(--sy),rgba(91,181,232,0.2),transparent_70%)] pt-8 pb-18 [--sx:30%] [--sy:30%] wide:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]`}
            onPointerMove={spot}
          >
            <div>
              <Photo />

              <p
                className={`text-[1.15rem] motion-safe:opacity-0 ${
                  go ? "animate-up [animation-delay:250ms] [animation-duration:0.8s]" : ""
                }`}
              >
                Hello, I'm
              </p>

              <h1
                className="mt-1 mb-2 flex text-[clamp(2.4rem,7.2vw,6.4rem)] font-medium tracking-[-0.03em]"
                aria-label={profile.name}
              >
                {[...profile.name].map(
                  (character, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      style={idx(i)}
                      className={`inline-block whitespace-pre [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_144] motion-safe:opacity-0 ${
                        go
                          ? "animate-bloom [animation-delay:calc(var(--i)*80ms+350ms)]"
                          : ""
                      }`}
                    >
                      {character}
                    </span>
                  ),
                )}
              </h1>

              <p
                className={`font-serif text-[clamp(1.4rem,2.6vw,2rem)] text-deep2 italic motion-safe:opacity-0 ${intro} [animation-delay:1.1s]`}
              >
                {profile.role}
              </p>

              <p
                className={`mt-4 max-w-lg text-[1.15rem] motion-safe:opacity-0 ${intro} [animation-delay:1.1s]`}
              >
                {profile.intro}
              </p>

              <div
                className={`mt-7 flex flex-wrap gap-3 motion-safe:opacity-0 ${intro} [animation-delay:1.3s]`}
              >
                <Button
                  component="a"
                  href="#modules"
                  className={`${BTN} border-deep bg-deep text-mist hover:border-gold hover:bg-gold hover:text-ink`}
                  size="md"
                  rightSection={
                    <IconArrowRight size={16} />
                  }
                >
                  Explore My Work
                </Button>

                <Button
                  component="a"
                  href="#contact"
                  className={`${BTN} border-ink bg-transparent text-ink hover:bg-ink hover:text-mist`}
                  size="md"
                  variant="default"
                >
                  Let's Connect
                </Button>
              </div>
            </div>

            <QueryPanel go={go} />
          </section>

          <section
            className={`${PAD} grid grid-cols-1 border-y border-ink/14 nav:grid-cols-3`}
            aria-label="Career highlights"
          >
            <Stat
              i={0}
              to={2}
              suffix="+"
              label="years of development experience"
            />

            <Stat
              i={1}
              to={4}
              label="layers of full-stack development"
            />

            <Stat
              i={2}
              to={6}
              label="featured projects"
            />
          </section>

          <section
            id="modules"
            className={`${PAD} pt-22 nav:pt-30`}
          >
            <Heading text="Things I Build" />

            <Reveal>
              <Modules />
            </Reveal>
          </section>

          <section
            id="architecture"
            className={`${PAD} pt-22 nav:pt-30`}
          >
            <Heading text="How I Build Software" />

            <Reveal>
              <Flow />
            </Reveal>

            <Reveal>
              <p className="mt-14 max-w-[40rem] text-[1.2rem]">
                {profile.about}
              </p>
            </Reveal>
          </section>

          <section
            id="experience"
            className={`${PAD} pt-22 nav:pt-30`}
          >
            <Heading text="My Journey" />

            <Reveal>
              {(seen) => (
                <ol
                  className={`relative ml-2 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:bg-ink before:transition-transform before:delay-200 before:duration-[1400ms] before:ease-soft before:content-[''] ${
                    seen
                      ? "before:scale-y-100"
                      : "motion-safe:before:scale-y-0"
                  }`}
                >
                  {experience.map((item) => (
                    <li
                      key={item.title}
                      className="relative max-w-[42rem] pb-2 pl-8 before:absolute before:top-1 before:-left-[7px] before:size-4 before:animate-ping-gold before:rounded-full before:bg-gold before:content-['']"
                    >
                      <p className="font-semibold text-deep2">
                        {item.when}
                      </p>

                      <h3 className="mt-1 mb-2 text-[1.6rem] font-medium">
                        {item.title},{" "}
                        {item.place}
                      </h3>

                      <p>{item.text}</p>
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>
          </section>

          <section
            id="contact"
            className="relative mt-30 overflow-hidden bg-deep px-5 py-24 text-mist after:absolute after:-top-[120px] after:-right-[120px] after:size-[380px] after:animate-pulse-soft after:rounded-full after:bg-gold/90 after:content-[''] nav:px-14"
          >
            <div className="relative z-10">
              <Heading
                text="Let's Build Something Great"
                light
              />

              <Reveal>
                <p className="mb-6 max-w-[520px] text-[15px] leading-[1.8] opacity-80">
                  Have a project in mind, an interesting
                  idea, or an opportunity to share?
                  I'd love to hear from you.
                </p>
              </Reveal>

              <Reveal>
                <CopyEmail />
              </Reveal>

              <Reveal>
                <SocialLinks variant="pill" />
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="px-5 pt-6 pb-8 text-[0.9rem] nav:px-14">
          <p>
            © {new Date().getFullYear()}{" "}
            {profile.name}. Built with React
            and TypeScript.
          </p>
        </footer>
      </div>
    </div>
  );
}