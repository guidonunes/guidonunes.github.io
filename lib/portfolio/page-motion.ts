// Native browser motion layered over React-owned, server-rendered content.
export function installPageMotion(reduced: boolean) {
  const controller = new AbortController();
  const { signal } = controller;
  const media = { matches: reduced };
  const active = new Set<Animation>();
  const seen = new WeakSet();
  const disclosureStates = new Map<
    HTMLDetailsElement,
    {
      expand: boolean;
      animation: Animation;
      contentAnimation: Animation | null;
    }
  >();
  const revealSelector =
    ".hero-copy, .art-panel, .section-heading, .project, .about-intro, .about-content, .contact-section, .experience-block, .case-heading, .case-block";
  const ease = "cubic-bezier(.16, 1, .3, 1)";
  let transition: ViewTransition | null = null;

  function play(
    element: HTMLElement | null,
    frames: Keyframe[],
    options: KeyframeAnimationOptions = {},
  ) {
    if (media.matches || !element?.animate) return null;
    const animation = element.animate(frames, {
      duration: 400,
      easing: ease,
      ...options,
    });
    active.add(animation);
    animation.finished.then(
      () => active.delete(animation),
      () => active.delete(animation),
    );
    return animation;
  }

  function reveal(element: HTMLElement, delay = 0) {
    seen.add(element);
    if (media.matches || transition) return;
    play(
      element,
      [
        {
          opacity: 0,
          transform:
            "perspective(1200px) translateY(38px) rotateX(3deg) scale(.985)",
          filter: "blur(5px)",
          clipPath: "inset(7% 0 0 0 round 10px)",
        },
        {
          opacity: 1,
          transform: "perspective(1200px) translateY(0) rotateX(0) scale(1)",
          filter: "blur(0)",
          clipPath: "inset(0 0 0 0 round 0)",
        },
      ],
      { delay, duration: 520, fill: "backwards" },
    );
  }

  let observer: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue;
          reveal(entry.target as HTMLElement, order++ * 45);
          observer!.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -25px 0px" },
    );
    document
      .querySelectorAll(revealSelector)
      .forEach((element) => observer!.observe(element));
  }

  // A directional snapshot transition keeps the navigation stationary while
  // the old section recedes and the destination resolves into focus.
  const sectionIds = new Set(["home", "work", "about", "contact"]);
  for (const link of document.querySelectorAll<HTMLAnchorElement>(
    'a[href^="#"]',
  )) {
    const id = link.getAttribute("href")!.slice(1);
    if (!sectionIds.has(id)) continue;
    link.addEventListener(
      "click",
      (event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const section = document.getElementById(id);
        if (!section) return;
        event.preventDefault();
        transition?.skipTransition();
        const top = Math.max(
          0,
          section.getBoundingClientRect().top +
            window.scrollY -
            (window.innerWidth <= 900 ? 28 : 110),
        );
        document.documentElement.dataset.navDirection =
          top < window.scrollY ? "backward" : "forward";
        let committed = false;
        const commit = () => {
          if (committed) return;
          committed = true;
          const previous = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo({ top, behavior: "instant" });
          document.documentElement.style.scrollBehavior = previous;
          if (window.location.hash !== `#${id}`)
            history.pushState(null, "", `#${id}`);
          section.setAttribute("tabindex", "-1");
          section.focus({ preventScroll: true });
        };
        if (media.matches || !document.startViewTransition) {
          commit();
          transition = null;
          const targets = section.matches(revealSelector)
            ? [section]
            : [...section.querySelectorAll<HTMLElement>(revealSelector)];
          targets
            .slice(0, 4)
            .forEach((element, index) => reveal(element, index * 40));
          return;
        }
        // Stop any first-entry reveal before taking the destination snapshot.
        for (const animation of active) {
          if (
            (animation.effect as KeyframeEffect)?.target?.matches(
              revealSelector,
            )
          )
            animation.cancel();
        }
        try {
          const running = document.startViewTransition(commit);
          transition = running;
          running.ready.catch(() => {});
          running.finished
            .catch(() => {})
            .finally(() => {
              if (transition === running) transition = null;
            });
        } catch {
          transition = null;
          commit();
          reveal(section);
        }
      },
      { signal },
    );
  }

  // Height is measured before and after disclosure, including the content's
  // margins. Repeated clicks can reverse an expansion from its current height.
  for (const details of document.querySelectorAll<HTMLDetailsElement>(
    ".expertise details",
  )) {
    const summary = details.querySelector("summary")!;
    const content = details.querySelector("div")!;
    summary.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        const prior = disclosureStates.get(details);
        const expand = !(prior ? prior.expand : details.open);
        const start = details.getBoundingClientRect().height;
        prior?.animation.cancel();
        prior?.contentAnimation?.cancel();
        if (media.matches || !details.animate) {
          details.open = expand;
          details.style.overflow = "";
          delete details.dataset.expanded;
          disclosureStates.delete(details);
          return;
        }
        details.open = true;
        const full = details.getBoundingClientRect().height;
        const collapsed = summary.getBoundingClientRect().height + 1;
        details.style.overflow = "hidden";
        details.dataset.expanded = String(expand);
        const animation = play(
          details,
          [
            { height: `${start}px` },
            { height: `${expand ? full : collapsed}px` },
          ],
          { duration: 360, fill: "both" },
        )!;
        const contentAnimation = play(
          content,
          expand
            ? [
                {
                  opacity: 0,
                  transform: "translateY(-9px)",
                  filter: "blur(3px)",
                },
                { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
              ]
            : [{ opacity: 1 }, { opacity: 0 }],
          {
            duration: expand ? 280 : 160,
            delay: expand ? 40 : 0,
            fill: "both",
          },
        );
        const state = { expand, animation, contentAnimation };
        disclosureStates.set(details, state);
        animation.finished.then(
          () => {
            if (disclosureStates.get(details) !== state) return;
            details.open = expand;
            animation.cancel();
            contentAnimation?.cancel();
            details.style.overflow = "";
            delete details.dataset.expanded;
            disclosureStates.delete(details);
          },
          () => {},
        );
      },
      { signal },
    );
  }

  return () => {
    controller.abort();
    observer?.disconnect();
    transition?.skipTransition();
    for (const [details, state] of disclosureStates) {
      state.animation.cancel();
      state.contentAnimation?.cancel();
      details.open = state.expand;
      details.style.overflow = "";
      delete details.dataset.expanded;
    }
    for (const animation of active) animation.cancel();
  };
}
