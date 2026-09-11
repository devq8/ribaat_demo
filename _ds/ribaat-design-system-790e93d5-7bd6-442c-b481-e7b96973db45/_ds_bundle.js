/* @ds-bundle: {"format":4,"namespace":"RibaatDesignSystem_790e93","components":[{"name":"CourseCard","sourcePath":"components/content/CourseCard.jsx"},{"name":"HadithCitation","sourcePath":"components/content/HadithCitation.jsx"},{"name":"QuranCitation","sourcePath":"components/content/QuranCitation.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/content/CourseCard.jsx":"4a4a271d2185","components/content/HadithCitation.jsx":"b814438ade87","components/content/QuranCitation.jsx":"5b4464258bba","components/core/Avatar.jsx":"c1153db6860c","components/core/Badge.jsx":"6790b1ea1a0f","components/core/Button.jsx":"ac62a3277faf","components/core/ProgressBar.jsx":"db8789ebeec0","components/forms/Checkbox.jsx":"2736470ec2c7","components/forms/Input.jsx":"8e177026b759","components/forms/Select.jsx":"1bb6dc855876","components/navigation/Breadcrumbs.jsx":"5942016d76ac","components/navigation/Tabs.jsx":"74b912f5041b","ui_kits/admin/AdminDashboard.jsx":"af18e59ed944","ui_kits/staff/StaffDashboard.jsx":"a0d58b65deec","ui_kits/student/Catalogue.jsx":"e30ccd0df0cf","ui_kits/student/CertificateLookup.jsx":"f878856e072f","ui_kits/student/CourseDetail.jsx":"2b5e06c2bbea","ui_kits/student/Dashboard.jsx":"ebcc60770158","ui_kits/student/Login.jsx":"475c36e764e8","ui_kits/student/Nav.jsx":"bcc843068b86","ui_kits/teacher/TeacherDashboard.jsx":"5e72617d5415"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RibaatDesignSystem_790e93 = window.RibaatDesignSystem_790e93 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/CourseCard.jsx
try { (() => {
/**
 * Course card — matches the live site's card anatomy: thumbnail, title,
 * instructor (with academic honorific), lesson-hours meta, enroll CTA.
 */
function CourseCard({
  title,
  instructor,
  hours,
  thumbnail,
  level,
  onEnroll
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: "var(--font-sans)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      overflow: "hidden",
      transition: "box-shadow var(--duration-normal) var(--ease-standard)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16/9",
      background: thumbnail ? `center/cover url(${thumbnail})` : "var(--ribaat-green-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--ribaat-green-600)"
    }
  }, !thumbnail && /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h16v16H4z",
    opacity: "0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      flex: 1
    }
  }, level && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-accent)",
      fontWeight: "var(--weight-semibold)"
    }
  }, level), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)",
      fontWeight: "var(--weight-semibold)"
    }
  }, title), instructor && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)"
    }
  }, "\u062F. ", instructor), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8
    }
  }, hours && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, "\u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A ", hours), /*#__PURE__*/React.createElement("button", {
    onClick: onEnroll,
    style: {
      background: "var(--surface-brand)",
      color: "var(--text-on-brand)",
      border: "none",
      borderRadius: "var(--radius-md)",
      padding: "6px 16px",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      cursor: "pointer"
    }
  }, "\u0633\u062C\u0644"))));
}
Object.assign(__ds_scope, { CourseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CourseCard.jsx", error: String((e && e.message) || e) }); }

// components/content/HadithCitation.jsx
try { (() => {
/** Distinct citation block for a Hadith — narrator/source ref in accent color. */
function HadithCitation({
  text,
  source
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      background: "var(--ribaat-brown-100)",
      borderRight: "3px solid var(--ribaat-brown-600)",
      borderRadius: "var(--radius-md)",
      padding: "14px 18px",
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--text-primary)"
    }
  }, "« " + text + " »", source && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 8,
      fontSize: "var(--text-sm)",
      color: "var(--text-accent)",
      fontWeight: "var(--weight-semibold)"
    }
  }, source));
}
Object.assign(__ds_scope, { HadithCitation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/HadithCitation.jsx", error: String((e && e.message) || e) }); }

// components/content/QuranCitation.jsx
try { (() => {
/** Distinct citation block for a Qur'an ayah — ornamental brackets, display font, source ref. */
function QuranCitation({
  text,
  reference
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      background: "var(--ribaat-green-50)",
      borderRight: "3px solid var(--ribaat-green-600)",
      borderRadius: "var(--radius-md)",
      padding: "14px 18px",
      fontSize: "var(--text-md)",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--text-primary)"
    }
  }, "﴿ " + text + " ﴾", reference && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, reference));
}
Object.assign(__ds_scope, { QuranCitation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/QuranCitation.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
const sizes = {
  sm: 32,
  md: 44,
  lg: 64
};
function initials(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map(p => p[0]).join("");
}

/** Instructor/user avatar. Falls back to initials on a brand-tinted circle when no image is given. */
function Avatar({
  name,
  src,
  size = "md"
}) {
  const px = sizes[size] || sizes.md;
  const base = {
    width: px,
    height: px,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-semibold)",
    fontSize: px * 0.36,
    flex: "none",
    overflow: "hidden",
    background: "var(--ribaat-green-100)",
    color: "var(--text-brand)",
    border: "1px solid var(--border-subtle)"
  };
  if (src) {
    return /*#__PURE__*/React.createElement("span", {
      style: base
    }, /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: name || "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: base
  }, initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const toneStyles = {
  brand: {
    background: "var(--ribaat-green-100)",
    color: "var(--text-brand)"
  },
  accent: {
    background: "var(--ribaat-brown-100)",
    color: "var(--text-accent)"
  },
  success: {
    background: "var(--state-success-bg)",
    color: "var(--state-success-fg)"
  },
  warning: {
    background: "var(--state-warning-bg)",
    color: "var(--state-warning-fg)"
  },
  danger: {
    background: "var(--state-danger-bg)",
    color: "var(--state-danger-fg)"
  },
  neutral: {
    background: "var(--surface-sunken)",
    color: "var(--text-secondary)"
  }
};

/** Small status/role/level tag. Used for role labels (طالب/معلم/مسؤول) and course level tags. */
function Badge({
  children,
  tone = "neutral"
}) {
  const t = toneStyles[tone] || toneStyles.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...t,
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.4
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizeStyles = {
  sm: {
    padding: "8px 14px",
    fontSize: "var(--text-sm)"
  },
  md: {
    padding: "10px 18px",
    fontSize: "var(--text-base)"
  },
  lg: {
    padding: "13px 24px",
    fontSize: "var(--text-md)"
  }
};
const variantStyles = {
  primary: {
    background: "var(--surface-brand)",
    color: "var(--text-on-brand)",
    border: "1px solid var(--surface-brand)"
  },
  secondary: {
    background: "var(--surface-accent)",
    color: "var(--text-on-accent)",
    border: "1px solid var(--surface-accent)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-brand)",
    border: "1px solid var(--border-brand)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-brand)",
    border: "1px solid transparent"
  }
};
const hoverBg = {
  primary: "var(--ribaat-green-700)",
  secondary: "var(--ribaat-brown-700)",
  outline: "var(--ribaat-green-100)",
  ghost: "var(--ribaat-green-100)"
};

/** Ribaat primary action control. */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon = null,
  onClick,
  type = "button"
}) {
  const base = variantStyles[variant] || variantStyles.primary;
  const sz = sizeStyles[size] || sizeStyles.md;
  const [hover, setHover] = React.useState(false);
  const style = {
    ...base,
    ...sz,
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-semibold)",
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
    background: hover && !disabled ? hoverBg[variant] : base.background,
    color: hover && (variant === "outline" || variant === "ghost") ? "var(--text-link-hover)" : base.color
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    style: style,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
/** Linear progress indicator for course/track completion. */
function ProgressBar({
  value = 0,
  label
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)"
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-pill)",
      height: 8,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      background: "var(--surface-brand)",
      borderRadius: "var(--radius-pill)",
      transition: "width var(--duration-slow) var(--ease-standard)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox with label, used for filters and form agreements. */
function Checkbox({
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-primary)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 18,
      height: 18,
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${checked ? "var(--surface-brand)" : "var(--border-default)"}`,
      background: checked ? "var(--surface-brand)" : "var(--surface-card)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: "3"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
/** Text/email/password form input with label and optional hint/error text. */
function Input({
  label,
  type = "text",
  placeholder,
  hint,
  error,
  value,
  onChange,
  required = false
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontFamily: "var(--font-sans)",
      width: "100%"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
      marginBottom: 6
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--state-danger-fg)"
    }
  }, " *")), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      padding: "10px 14px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${error ? "var(--state-danger-fg)" : focused ? "var(--border-brand)" : "var(--border-default)"}`,
      outline: focused ? `2px solid var(--focus-ring)` : "none",
      outlineOffset: 1,
      background: "var(--surface-card)",
      color: "var(--text-primary)"
    }
  }), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-xs)",
      marginTop: 4,
      color: error ? "var(--state-danger-fg)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/** Native-backed select styled to match Input. */
function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontFamily: "var(--font-sans)",
      width: "100%"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      padding: "10px 14px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${focused ? "var(--border-brand)" : "var(--border-default)"}`,
      outline: focused ? `2px solid var(--focus-ring)` : "none",
      outlineOffset: 1,
      background: "var(--surface-card)",
      color: "var(--text-primary)"
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
/** RTL breadcrumb trail, e.g. الرئيسية / الدورات / ثلاثة الأصول. */
function Breadcrumbs({
  items = []
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.6
    }
  }, "/"), it.href ? /*#__PURE__*/React.createElement("a", {
    href: it.href,
    style: {
      color: i === items.length - 1 ? "var(--text-secondary)" : "var(--text-link)",
      textDecoration: "none"
    }
  }, it.label) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, it.label))));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Horizontal tab strip — used for "الوصف / عن المعلم" course detail tabs. */
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  const [internal, setInternal] = React.useState(tabs[0]?.value);
  const value = active !== undefined ? active : internal;
  const set = v => {
    onChange ? onChange(v) : setInternal(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      borderBottom: "1px solid var(--border-subtle)",
      fontFamily: "var(--font-sans)"
    }
  }, tabs.map(t => {
    const isActive = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      onClick: () => set(t.value),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "10px 2px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-base)",
        fontWeight: isActive ? "var(--weight-semibold)" : "var(--weight-regular)",
        color: isActive ? "var(--text-brand)" : "var(--text-secondary)",
        borderBottom: isActive ? "2px solid var(--surface-brand)" : "2px solid transparent",
        marginBottom: -1,
        transition: "color var(--duration-fast) var(--ease-standard)"
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/AdminDashboard.jsx
try { (() => {
/**
 * Admin dashboard — extrapolated; platform-wide overview, tracks/المسارات management,
 * and the four-role user table. No source screen exists for this role.
 */
function AdminDashboard() {
  const {
    Badge,
    ProgressBar
  } = window.RibaatDesignSystem_790e93;
  const stats = [{
    label: "الطلاب المسجلين",
    value: "4,812"
  }, {
    label: "الدورات المنشورة",
    value: "42"
  }, {
    label: "المسارات النشطة",
    value: "6"
  }, {
    label: "الشهادات المصدرة",
    value: "1,203"
  }];
  const tracks = [{
    name: "المستوى الأول",
    courses: 7,
    students: 812,
    progress: 100
  }, {
    name: "المستوى الثاني",
    courses: 3,
    students: 340,
    progress: 70
  }];
  const users = [{
    name: "عبد العزيز العيدان",
    role: "معلم"
  }, {
    name: "أنس اليتامى",
    role: "معلم"
  }, {
    name: "منى الرشيد",
    role: "موظف"
  }, {
    name: "سلطان المطيري",
    role: "مسؤول"
  }];
  const roleTone = {
    "معلم": "brand",
    "موظف": "accent",
    "مسؤول": "danger",
    "طالب": "neutral"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "var(--font-sans)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      background: "var(--surface-brand-strong)",
      color: "var(--text-on-brand)",
      padding: "24px 20px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/ribaat-mark.png",
    style: {
      height: 34,
      filter: "brightness(0) invert(1)",
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontSize: "var(--text-sm)"
    }
  }, ["نظرة عامة", "المسارات والدورات", "المستخدمون والأدوار", "الشهادات", "الإعدادات"].map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: i === 0 ? "#fff" : "rgba(255,255,255,.75)",
      textDecoration: "none",
      padding: "9px 12px",
      borderRadius: "var(--radius-sm)",
      background: i === 0 ? "rgba(255,255,255,.14)" : "transparent"
    }
  }, l)))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: "30px 36px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 4px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      color: "var(--text-primary)"
    }
  }, "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u0635\u0629"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 24px",
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)"
    }
  }, "\u0645\u0644\u062E\u0635 \u0634\u0627\u0645\u0644 \u2014 \u0637\u0644\u0627\u0628\u060C \u0645\u0639\u0644\u0645\u0648\u0646\u060C \u062F\u0648\u0631\u0627\u062A\u060C \u0648\u0645\u0633\u0627\u0631\u0627\u062A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginBottom: 30
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-brand)",
      fontFamily: "var(--font-display)"
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, s.label)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)"
    }
  }, "\u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A (\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0624\u062F\u064A\u0629 \u0644\u0644\u0634\u0647\u0627\u062F\u0629)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 30
    }
  }, tracks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.name,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, t.name), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, t.courses, " \u062F\u0648\u0631\u0627\u062A")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: t.progress
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, t.students, " \u0637\u0627\u0644\u0628 \u0645\u0633\u062C\u0644")))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)"
    }
  }, "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0648\u0627\u0644\u0623\u062F\u0648\u0627\u0631"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, users.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: u.name,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "13px 20px",
      borderTop: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-primary)"
    }
  }, u.name), /*#__PURE__*/React.createElement(Badge, {
    tone: roleTone[u.role]
  }, u.role))))));
}
window.AdminDashboard = AdminDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/AdminDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/staff/StaffDashboard.jsx
try { (() => {
/**
 * Staff dashboard — extrapolated; handles enrollment support, certificate issuance queue,
 * and student inquiries. No source screen exists for this role.
 */
function StaffDashboard() {
  const {
    Badge,
    Button,
    Input
  } = window.RibaatDesignSystem_790e93;
  const queue = [{
    student: "أحمد الشمري",
    course: "ثلاثة الأصول",
    type: "شهادة إتمام",
    status: "بانتظار المراجعة"
  }, {
    student: "سارة العتيبي",
    course: "المستوى الأول (مسار)",
    type: "شهادة مسار",
    status: "بانتظار المراجعة"
  }, {
    student: "محمد القحطاني",
    course: "الأربعين النووية",
    type: "شهادة إتمام",
    status: "تمت الموافقة"
  }];
  const tickets = [{
    student: "خالد العنزي",
    subject: "مشكلة في تشغيل الفيديو",
    status: "مفتوحة"
  }, {
    student: "فاطمة الدوسري",
    subject: "استعلام عن تجديد الاشتراك",
    status: "مغلقة"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "var(--font-sans)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      background: "var(--surface-brand-strong)",
      color: "var(--text-on-brand)",
      padding: "24px 20px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/ribaat-mark.png",
    style: {
      height: 34,
      filter: "brightness(0) invert(1)",
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontSize: "var(--text-sm)"
    }
  }, ["لوحة التحكم", "طابور الشهادات", "تذاكر الدعم", "الطلاب"].map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: i === 0 ? "#fff" : "rgba(255,255,255,.75)",
      textDecoration: "none",
      padding: "9px 12px",
      borderRadius: "var(--radius-sm)",
      background: i === 0 ? "rgba(255,255,255,.14)" : "transparent"
    }
  }, l)))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: "30px 36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      color: "var(--text-primary)"
    }
  }, "\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0648\u0638\u0641"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)"
    }
  }, "\u0645\u0631\u0627\u062C\u0639\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A \u0648\u062A\u0630\u0627\u0643\u0631 \u0627\u0644\u062F\u0639\u0645")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u0628\u062D\u062B \u0639\u0646 \u0637\u0627\u0644\u0628..."
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)"
    }
  }, "\u0637\u0627\u0628\u0648\u0631 \u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      marginBottom: 30
    }
  }, queue.map((q, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px",
      borderTop: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
      fontSize: "var(--text-sm)"
    }
  }, q.student), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, q.type, " \u2014 ", q.course)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: q.status === "تمت الموافقة" ? "success" : "warning"
  }, q.status), q.status !== "تمت الموافقة" && /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "\u0645\u0631\u0627\u062C\u0639\u0629"))))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)"
    }
  }, "\u062A\u0630\u0627\u0643\u0631 \u0627\u0644\u062F\u0639\u0645"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, tickets.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px",
      borderTop: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
      fontSize: "var(--text-sm)"
    }
  }, t.student), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, t.subject)), /*#__PURE__*/React.createElement(Badge, {
    tone: t.status === "مفتوحة" ? "danger" : "neutral"
  }, t.status))))));
}
window.StaffDashboard = StaffDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/staff/StaffDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student/Catalogue.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CATEGORIES = ["كل التصنيفات", "عقيدة", "فقه", "حديث", "آداب", "أصول فقه"];
const COURSES = [{
  title: "ثلاثة الأصول",
  instructor: "عبد العزيز العيدان",
  hours: "04:42:00",
  level: "عقيدة"
}, {
  title: "القواعد الأربع",
  instructor: "عبد العزيز العيدان",
  hours: "02:10:00",
  level: "عقيدة"
}, {
  title: "الأربعين النووية",
  instructor: "عبد العزيز العيدان",
  hours: "08:19:00",
  level: "حديث"
}, {
  title: "نواقض الإسلام",
  instructor: "عبد العزيز العيدان",
  hours: "02:54:00",
  level: "عقيدة"
}, {
  title: "متن الورقات في أصول الفقه",
  instructor: "عبد العزيز العيدان",
  hours: "06:44:00",
  level: "أصول فقه"
}, {
  title: "فصول في الآداب",
  instructor: "عبد العزيز العيدان",
  hours: "07:21:00",
  level: "آداب"
}];

/** Course catalogue — mirrors ribaat.net/courses (category filter + course grid + tracks). */
function Catalogue({
  onOpenCourse
}) {
  const {
    CourseCard,
    Select
  } = window.RibaatDesignSystem_790e93;
  const [category, setCategory] = React.useState("");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "36px 24px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      color: "var(--text-primary)",
      margin: "0 0 6px"
    }
  }, "\u0627\u0644\u062F\u0648\u0631\u0627\u062A"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      margin: "0 0 28px"
    }
  }, "\u0639\u0631\u0636 1 \u0625\u0644\u0649 6 \u0645\u0646 \u0623\u0635\u0644 12 \u0646\u062A\u064A\u062C\u0629"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 200,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      margin: "0 0 10px"
    }
  }, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, CATEGORIES.map(c => /*#__PURE__*/React.createElement("a", {
    key: c,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setCategory(c === "كل التصنيفات" ? "" : c);
    },
    style: {
      textDecoration: "none",
      padding: "8px 10px",
      borderRadius: "var(--radius-sm)",
      fontSize: "var(--text-sm)",
      color: category === c || c === "كل التصنيفات" && !category ? "var(--text-brand)" : "var(--text-secondary)",
      background: category === c ? "var(--ribaat-green-100)" : "transparent"
    }
  }, c))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      margin: "24px 0 10px"
    }
  }, "\u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, [{
    label: "المستوى الأول",
    count: 7
  }, {
    label: "المستوى الثاني",
    count: 3
  }].map(t => /*#__PURE__*/React.createElement("div", {
    key: t.label,
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: 12,
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      margin: "4px 0 10px"
    }
  }, t.count, " \u0627\u0644\u062F\u0648\u0631\u0627\u062A"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: "100%",
      background: "var(--surface-accent)",
      color: "var(--text-on-accent)",
      border: "none",
      borderRadius: "var(--radius-sm)",
      padding: "6px 0",
      fontSize: "var(--text-xs)",
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "\u0633\u062C\u0644"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, COURSES.filter(c => !category || c.level === category).map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    onClick: () => onOpenCourse(c),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(CourseCard, _extends({}, c, {
    onEnroll: e => {
      e && e.stopPropagation && e.stopPropagation();
    }
  })))))));
}
window.Catalogue = Catalogue;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student/Catalogue.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student/CertificateLookup.jsx
try { (() => {
/** Certificate verification lookup — mirrors ribaat.net/student/certificates. */
function CertificateLookup() {
  const {
    Input,
    Button
  } = window.RibaatDesignSystem_790e93;
  const [code, setCode] = React.useState("");
  const [result, setResult] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: "0 auto",
      padding: "64px 24px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      color: "var(--text-primary)",
      textAlign: "center",
      margin: "0 0 6px"
    }
  }, "\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0639\u0646 \u0634\u0647\u0627\u062F\u0629"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)",
      margin: "0 0 26px"
    }
  }, "\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u062A\u0647\u0627"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u0631\u0642\u0645 \u0627\u0644\u0634\u0647\u0627\u062F\u0629",
    value: code,
    onChange: e => setCode(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setResult(code ? "valid" : null)
  }, "\u062A\u062D\u0642\u0642")), result === "valid" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      background: "var(--state-success-bg)",
      color: "var(--state-success-fg)",
      borderRadius: "var(--radius-md)",
      padding: "14px 18px",
      fontSize: "var(--text-sm)"
    }
  }, "\u0634\u0647\u0627\u062F\u0629 \u0635\u0627\u062F\u0631\u0629 \u0644\u0640 \xAB\u0637\u0627\u0644\u0628\xBB \u2014 \u062F\u0648\u0631\u0629 \u062B\u0644\u0627\u062B\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u2014 \u0625\u062C\u0627\u0632\u0629 \u0628\u0627\u0644\u0633\u0646\u062F \u0627\u0644\u0645\u062A\u0635\u0644. \u0634\u0647\u0627\u062F\u0629 \u0635\u062D\u064A\u062D\u0629."));
}
window.CertificateLookup = CertificateLookup;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student/CertificateLookup.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student/CourseDetail.jsx
try { (() => {
const DAYS = [{
  label: "اليوم الأول",
  lessons: [{
    name: "نبذة تعريفية",
    hours: null
  }, {
    name: "كتاب ثلاثة الأصول",
    hours: null
  }, {
    name: "ثلاثة الأصول - المجلس الأول",
    hours: "00:54:00"
  }]
}, {
  label: "اليوم الثاني",
  lessons: [{
    name: "ثلاثة الأصول - المجلس الثاني",
    hours: "00:40:00"
  }]
}, {
  label: "اليوم الثالث",
  lessons: [{
    name: "ثلاثة الأصول - المجلس الثالث",
    hours: "00:50:00"
  }]
}, {
  label: "اليوم الرابع",
  lessons: [{
    name: "ثلاثة الأصول - المجلس الرابع",
    hours: "00:37:00",
    locked: true
  }]
}];

/** Course detail — mirrors ribaat.net's course page: teacher, curriculum-by-day, description/teacher tabs. */
function CourseDetail({
  course,
  onBack,
  onOpenLesson
}) {
  const {
    Breadcrumbs,
    Tabs,
    Badge,
    Avatar,
    Button
  } = window.RibaatDesignSystem_790e93;
  const [tab, setTab] = React.useState("desc");
  const [openDay, setOpenDay] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "28px 24px 60px"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: [{
      label: "الرئيسية",
      href: "#"
    }, {
      label: "الدورات",
      href: "#"
    }, {
      label: course.title
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      marginTop: 20,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, course.level), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      color: "var(--text-primary)",
      margin: "10px 0 6px"
    }
  }, course.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      margin: "0 0 4px"
    }
  }, "\u0639\u062F\u062F \u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u0645\u0633\u062C\u0644\u064A\u0646 \u0662\u0663\u0663"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)",
      margin: 0
    }
  }, "\u0627\u0644\u0645\u0639\u0644\u0645 \u2014 \u062F. ", course.instructor)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16/9",
      background: "var(--ribaat-green-100)",
      borderRadius: "var(--radius-md)",
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onOpenLesson(DAYS[0].lessons[0])
  }, "\u0633\u062C\u0644"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: "16px 0 0",
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "clock",
    style: {
      width: 16,
      height: 16
    }
  }), " \u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A ", course.hours, " \u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A \u0645\u0637\u0644\u0648\u0628\u0629"), /*#__PURE__*/React.createElement("li", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "book-open",
    style: {
      width: 16,
      height: 16
    }
  }), " 9 \u0627\u0644\u062F\u0631\u0648\u0633"), /*#__PURE__*/React.createElement("li", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "infinity",
    style: {
      width: 16,
      height: 16
    }
  }), " \u0635\u0644\u0627\u062D\u064A\u0629 \u0643\u0627\u0645\u0644\u0629 \u0645\u062F\u0649 \u0627\u0644\u062D\u064A\u0627\u0647"), /*#__PURE__*/React.createElement("li", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "smartphone",
    style: {
      width: 16,
      height: 16
    }
  }), " \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0649 \u0627\u0644\u0647\u0627\u062A\u0641 \u0648 \u0627\u0644\u062A\u0644\u0641\u0627\u0632")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      value: "desc",
      label: "الوصف"
    }, {
      value: "teacher",
      label: "عن المعلم"
    }],
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 2px"
    }
  }, tab === "desc" ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      lineHeight: "var(--leading-normal)"
    }
  }, "\u0634\u0631\u062D \u0645\u0628\u0633\u0651\u0637 \u0644\u0645\u062A\u0646 \u062B\u0644\u0627\u062B\u0629 \u0627\u0644\u0623\u0635\u0648\u0644\u060C \u064A\u063A\u0637\u064A \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0644\u0647 \u0648\u0645\u0639\u0631\u0641\u0629 \u062F\u064A\u0646\u0647 \u0648\u0645\u0639\u0631\u0641\u0629 \u0646\u0628\u064A\u0647 \u0645\u062D\u0645\u062F \uFDFA\u060C \u0628\u0623\u0633\u0644\u0648\u0628 \u062A\u0623\u0635\u064A\u0644\u064A \u064A\u0646\u0627\u0633\u0628 \u0627\u0644\u0645\u0628\u062A\u062F\u0626\u064A\u0646 \u0648\u0637\u0644\u0627\u0628 \u0627\u0644\u0639\u0644\u0645.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: course.instructor,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, "\u062F. ", course.instructor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, "957 \u0627\u0644\u0637\u0644\u0627\u0628 \xB7 9 \u0627\u0644\u062F\u0648\u0631\u0627\u062A"))))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)",
      marginTop: 8
    }
  }, "\u0645\u0646\u0647\u062C \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)",
      marginTop: -6
    }
  }, "\u0639\u062F\u062F \u0627\u0644\u062F\u0631\u0648\u0633 9 \xB7 \u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A ", course.hours), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 12
    }
  }, DAYS.map((day, i) => /*#__PURE__*/React.createElement("div", {
    key: day.label,
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenDay(openDay === i ? -1 : i),
    style: {
      width: "100%",
      textAlign: "right",
      background: "var(--surface-sunken)",
      border: "none",
      padding: "12px 16px",
      fontSize: "var(--text-base)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, day.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontWeight: 400,
      fontSize: "var(--text-sm)"
    }
  }, day.lessons.length, " \u062F\u0631\u0648\u0633")), openDay === i && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)"
    }
  }, day.lessons.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.name,
    onClick: () => !l.locked && onOpenLesson(l),
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderTop: "1px solid var(--border-subtle)",
      cursor: l.locked ? "default" : "pointer",
      opacity: l.locked ? 0.55 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-primary)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": l.locked ? "lock" : "play-circle",
    style: {
      width: 15,
      height: 15
    }
  }), l.name), l.hours && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, l.hours))))))));
}
window.CourseDetail = CourseDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student/CourseDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student/Dashboard.jsx
try { (() => {
/** Student dashboard — enrolled courses w/ progress, certificates, extrapolated from the visual system (no source screen existed for this). */
function Dashboard({
  session,
  onOpenCourse
}) {
  const {
    ProgressBar,
    Badge,
    Avatar,
    Button
  } = window.RibaatDesignSystem_790e93;
  const enrolled = [{
    title: "ثلاثة الأصول",
    instructor: "عبد العزيز العيدان",
    progress: 100,
    level: "عقيدة"
  }, {
    title: "متن الورقات في أصول الفقه",
    instructor: "عبد العزيز العيدان",
    progress: 62,
    level: "أصول فقه"
  }, {
    title: "الأربعين النووية",
    instructor: "عبد العزيز العيدان",
    progress: 18,
    level: "حديث"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "32px 24px 60px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: session?.name || "طالب",
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      color: "var(--text-primary)"
    }
  }, "\u0623\u0647\u0644\u0627\u064B\u060C ", session?.name || "طالب"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)"
    }
  }, "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0623\u0648\u0644 \u2014 2 \u0645\u0646 7 \u062F\u0648\u0631\u0627\u062A \u0645\u0643\u062A\u0645\u0644\u0629"))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)"
    }
  }, "\u062F\u0648\u0631\u0627\u062A\u064A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, enrolled.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    onClick: () => onOpenCourse(c),
    style: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 18,
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "16px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, c.title), /*#__PURE__*/React.createElement(Badge, {
    tone: c.progress === 100 ? "success" : "brand"
  }, c.progress === 100 ? "مكتمل" : c.level)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.progress
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, "\u062F. ", c.instructor)))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)",
      marginTop: 32
    }
  }, "\u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      background: "var(--ribaat-green-50)",
      border: "1px solid var(--ribaat-green-200)",
      borderRadius: "var(--radius-lg)",
      padding: "18px 22px"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "graduation-cap",
    style: {
      width: 28,
      height: 28,
      color: "var(--text-brand)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, "\u0634\u0647\u0627\u062F\u0629 \u0625\u062A\u0645\u0627\u0645: \u062B\u0644\u0627\u062B\u0629 \u0627\u0644\u0623\u0635\u0648\u0644"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, "\u0625\u062C\u0627\u0632\u0629 \u0628\u0627\u0644\u0633\u0646\u062F \u0627\u0644\u0645\u062A\u0635\u0644 \u2014 \u0635\u0627\u062F\u0631\u0629 \u0661\u0663-\u0660\u0665-\u0662\u0660\u0662\u0666")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "\u0639\u0631\u0636 \u0627\u0644\u0634\u0647\u0627\u062F\u0629")));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student/Login.jsx
try { (() => {
/** Login screen — mirrors ribaat.net/student/login ("طالب مُسجَّل"). */
function Login({
  onLogin,
  onNavigate
}) {
  const {
    Input,
    Button,
    Checkbox
  } = window.RibaatDesignSystem_790e93;
  const [email, setEmail] = React.useState("student@ribaat.net");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "64px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 380,
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      padding: "36px 32px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      color: "var(--text-primary)",
      margin: "0 0 4px",
      textAlign: "center"
    }
  }, "\u0637\u0627\u0644\u0628 \u0645\u064F\u0633\u062C\u064E\u0651\u0644"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)",
      margin: "0 0 28px"
    }
  }, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u0649",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u062A\u0630\u0643\u0631\u0646\u064A",
    checked: remember,
    onChange: setRemember
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-link)"
    }
  }, "\u0646\u0633\u064A\u062A \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onLogin
  }, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      marginTop: 22,
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)"
    }
  }, "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F", " ", /*#__PURE__*/React.createElement("a", {
    onClick: e => {
      e.preventDefault();
      onNavigate("signup");
    },
    href: "#",
    style: {
      color: "var(--text-link)"
    }
  }, "\u062A\u0633\u062C\u064A\u0644 \u062D\u0633\u0627\u0628"))));
}
window.Login = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student/Nav.jsx
try { (() => {
/** Shared top navigation bar for the student-facing surfaces — mirrors ribaat.net's real nav. */
function StudentNav({
  page,
  onNavigate,
  session,
  onLogout
}) {
  const links = [{
    key: "home",
    label: "الرئيسية"
  }, {
    key: "courses",
    label: "الدورات"
  }, {
    key: "certificates",
    label: "الاستعلام عن شهادة"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 32px",
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/ribaat-wordmark.png",
    alt: "\u0631\u0628\u0627\u0637 \u0627\u0644\u062D\u0646\u0627\u0628\u0644\u0629",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 26
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    onClick: e => {
      e.preventDefault();
      onNavigate(l.key);
    },
    href: "#",
    style: {
      fontSize: "var(--text-base)",
      color: page === l.key ? "var(--text-brand)" : "var(--text-secondary)",
      fontWeight: page === l.key ? "var(--weight-semibold)" : "var(--weight-regular)",
      textDecoration: "none"
    }
  }, l.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, session ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)"
    }
  }, "\u0623\u0647\u0644\u0627\u064B\u060C ", session.name), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      background: "none",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "8px 16px",
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)",
      cursor: "pointer"
    }
  }, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    onClick: e => {
      e.preventDefault();
      onNavigate("login");
    },
    href: "#",
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-brand)",
      textDecoration: "none",
      padding: "8px 6px"
    }
  }, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644"), /*#__PURE__*/React.createElement("a", {
    onClick: e => {
      e.preventDefault();
      onNavigate("login");
    },
    href: "#",
    style: {
      background: "var(--surface-brand)",
      color: "var(--text-on-brand)",
      borderRadius: "var(--radius-md)",
      padding: "9px 18px",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      textDecoration: "none"
    }
  }, "\u062A\u0633\u062C\u064A\u0644 \u062D\u0633\u0627\u0628"))));
}
window.StudentNav = StudentNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher/TeacherDashboard.jsx
try { (() => {
/**
 * Teacher dashboard — extrapolated from Ribaat's visual system; no source screen exists for
 * this role. Shows the teacher's courses, student counts, and lecture/prerequisite structure
 * (a course's lectures gate sequentially — later lectures lock until earlier ones are done).
 */
function TeacherDashboard() {
  const {
    Badge,
    Avatar,
    ProgressBar,
    Button
  } = window.RibaatDesignSystem_790e93;
  const [openCourse, setOpenCourse] = React.useState(0);
  const courses = [{
    title: "ثلاثة الأصول",
    students: 233,
    lectures: [{
      name: "نبذة تعريفية",
      status: "منشور"
    }, {
      name: "المجلس الأول",
      status: "منشور"
    }, {
      name: "المجلس الثاني",
      status: "منشور"
    }, {
      name: "المجلس الثالث",
      status: "مسودة"
    }]
  }, {
    title: "القواعد الأربع",
    students: 190,
    lectures: [{
      name: "المجلس الأول",
      status: "منشور"
    }, {
      name: "المجلس الثاني",
      status: "مسودة"
    }]
  }, {
    title: "نواقض الإسلام",
    students: 141,
    lectures: [{
      name: "المجلس الأول",
      status: "منشور"
    }]
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "var(--font-sans)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      background: "var(--surface-brand-strong)",
      color: "var(--text-on-brand)",
      padding: "24px 20px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/ribaat-mark.png",
    style: {
      height: 34,
      filter: "brightness(0) invert(1)",
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontSize: "var(--text-sm)"
    }
  }, ["لوحة التحكم", "دوراتي", "الطلاب", "الأسئلة والمراجعات", "الملف الشخصي"].map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: i === 0 ? "#fff" : "rgba(255,255,255,.75)",
      textDecoration: "none",
      padding: "9px 12px",
      borderRadius: "var(--radius-sm)",
      background: i === 0 ? "rgba(255,255,255,.14)" : "transparent"
    }
  }, l)))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: "30px 36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "\u0639\u0628\u062F \u0627\u0644\u0639\u0632\u064A\u0632 \u0627\u0644\u0639\u064A\u062F\u0627\u0646",
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      color: "var(--text-primary)"
    }
  }, "\u062F. \u0639\u0628\u062F \u0627\u0644\u0639\u0632\u064A\u0632 \u0627\u0644\u0639\u064A\u062F\u0627\u0646"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "\u0645\u0639\u0644\u0645")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)"
    }
  }, "957 \u0627\u0644\u0637\u0644\u0627\u0628 \xB7 9 \u0627\u0644\u062F\u0648\u0631\u0627\u062A"))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-lg)",
      color: "var(--text-primary)"
    }
  }, "\u062F\u0648\u0631\u0627\u062A\u064A \u0648\u0627\u0644\u062F\u0631\u0648\u0633"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)",
      marginTop: -6
    }
  }, "\u0627\u0644\u062F\u0631\u0648\u0633 \u062A\u064F\u0646\u0634\u0631 \u0628\u062A\u0631\u062A\u064A\u0628 \u0645\u062A\u0633\u0644\u0633\u0644 \u2014 \u0643\u0644 \u062F\u0631\u0633 \u064A\u064F\u0642\u0641\u0644 \u062D\u062A\u0649 \u064A\u064F\u0646\u0634\u0631 \u0645\u0627 \u0642\u0628\u0644\u0647 (\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 16
    }
  }, courses.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenCourse(openCourse === i ? -1 : i),
    style: {
      width: "100%",
      textAlign: "right",
      background: "none",
      border: "none",
      padding: "16px 20px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, c.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, c.students, " \u0637\u0627\u0644\u0628 \xB7 ", c.lectures.length, " \u062F\u0631\u0648\u0633")), openCourse === i && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)"
    }
  }, c.lectures.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.name,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "11px 20px",
      borderTop: "1px solid var(--border-subtle)",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, l.name), /*#__PURE__*/React.createElement(Badge, {
    tone: l.status === "منشور" ? "success" : "neutral"
  }, l.status))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633 \u062C\u062F\u064A\u062F"))))))));
}
window.TeacherDashboard = TeacherDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher/TeacherDashboard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CourseCard = __ds_scope.CourseCard;

__ds_ns.HadithCitation = __ds_scope.HadithCitation;

__ds_ns.QuranCitation = __ds_scope.QuranCitation;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
