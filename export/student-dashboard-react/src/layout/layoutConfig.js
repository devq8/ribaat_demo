/**
 * The only place breakpoint-dependent geometry is declared.
 * Spacing uses design-system --space-* tokens wherever the value is on the 4px
 * scale; the handful of off-scale values are listed in README under
 * "Off-scale values" and are candidates for normalising.
 */
export const LAYOUT_CONFIG = {
  desktop: {
    containerMaxWidth: 'var(--container-max)',
    mainPadding: 'var(--space-12) clamp(var(--space-6), 6vw, 120px) var(--space-20)',
    headerPadding: '14px clamp(var(--space-6), 6vw, 120px)',
    titleSize: 'var(--text-2xl)',
    sectionGap: 'var(--space-12)',
    columnGap: 'var(--space-8)',
    stacked: false,
    railWidth: '258px',
    courseColumns: 3,
    carouselCardWidth: 'calc((100% - var(--space-12)) / 3)',
  },
  tablet: {
    containerMaxWidth: '834px',
    mainPadding: 'var(--space-7, 28px) clamp(var(--space-5), 4vw, 56px) var(--space-14, 56px)',
    headerPadding: '14px clamp(var(--space-5), 4vw, 56px)',
    titleSize: 'var(--text-2xl)',
    sectionGap: 'var(--space-10)',
    columnGap: 'var(--space-6)',
    stacked: false,
    railWidth: '228px',
    courseColumns: 2,
    carouselCardWidth: 'calc((100% - var(--space-6)) / 2)',
  },
  mobile: {
    containerMaxWidth: '390px',
    mainPadding: 'var(--space-5) var(--space-4) var(--space-12)',
    headerPadding: '14px var(--space-4)',
    titleSize: 'var(--text-xl)',
    sectionGap: 'var(--space-8)',
    columnGap: 'var(--space-7, 28px)',
    stacked: true,
    railWidth: '100%',
    courseColumns: 1,
    carouselCardWidth: '100%',
  },
};

export function layoutFor(breakpoint) {
  return LAYOUT_CONFIG[breakpoint] || LAYOUT_CONFIG.desktop;
}
