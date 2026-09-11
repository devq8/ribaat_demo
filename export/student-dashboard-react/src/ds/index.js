/**
 * Adapter for the Ribaat Design System bundle.
 *
 * The bundle is published as a UMD global (window.RibaatDesignSystem_790e93).
 * Load it once in index.html, or replace this file with real package imports
 * when the design system ships as an npm package. Component APIs are unchanged
 * either way, so nothing in components/ or layout/ needs to be touched.
 */
const DS = (typeof window !== 'undefined' && window.RibaatDesignSystem_790e93) || {};

export const Button = DS.Button;
export const Badge = DS.Badge;
export const Avatar = DS.Avatar;
export const ProgressBar = DS.ProgressBar;
export const Tabs = DS.Tabs;
export const Input = DS.Input;
export const Select = DS.Select;
export const Checkbox = DS.Checkbox;
export const Breadcrumbs = DS.Breadcrumbs;
export const CourseCard = DS.CourseCard;
export const QuranCitation = DS.QuranCitation;
export const HadithCitation = DS.HadithCitation;
