/* ═══════════════════════════════════════════════════════════
   SettingsShared.jsx
   Shared primitive components used across all settings panels.
   Import these into each settings section component.
═══════════════════════════════════════════════════════════ */

/* ── Animated Toggle switch ── */
export const Toggle = ({ checked, onChange, disabled = false }) => (
    <button
        className={`st-toggle ${checked ? "st-toggle--on" : ""} ${disabled ? "st-toggle--disabled" : ""}`}
        onClick={() => !disabled && onChange(!checked)}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        type="button"
    >
        <span className="st-toggle-thumb" />
    </button>
);

/* ── Section heading block ── */
export const SectionHead = ({ title, sub }) => (
    <div className="st-section-head">
        <h2 className="st-section-title">{title}</h2>
        {sub && <p className="st-section-sub">{sub}</p>}
    </div>
);

/* ── Individual setting row ── */
export const SettingRow = ({ icon: Icon, title, sub, children, danger }) => (
    <div className={`st-row ${danger ? "st-row--danger" : ""}`}>
        <div className="st-row-left">
            {Icon && <div className="st-row-icon"><Icon /></div>}
            <div className="st-row-text">
                <span className="st-row-title">{title}</span>
                {sub && <span className="st-row-sub">{sub}</span>}
            </div>
        </div>
        <div className="st-row-right">{children}</div>
    </div>
);
