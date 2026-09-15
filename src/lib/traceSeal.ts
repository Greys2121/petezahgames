const NOISE =
  /\/q9vx\/|\/m4thx\/|\/e7px\/|\/l9cx\/|\/afsd123k2\/|\/1k123\.js|sj\.all|clip-mux|voltedge|scramjet|bare-mux|epoxy|wisp/i;

export function installTraceSeal() {
  if (typeof performance === "undefined") return;
  const scrub = () => {
    try {
      const entries = performance.getEntriesByType?.("resource") || [];
      for (const e of entries) {
        const name = String((e as PerformanceResourceTiming).name || "");
        if (NOISE.test(name)) {
          try {
            performance.clearResourceTimings?.();
            break;
          } catch {}
        }
      }
    } catch {}
  };
  scrub();
  try {
    setInterval(scrub, 4000);
  } catch {}
  try {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) scrub();
    });
  } catch {}
}
