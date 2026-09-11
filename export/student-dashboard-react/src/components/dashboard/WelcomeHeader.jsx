import { ar } from '../../strings/ar.js';

/** Purely presentational: greeting + one understated stat line. */
export default function WelcomeHeader({ studentName, statsLine, titleSize }) {
  return (
    <section style={{ marginBottom: 'var(--space-6)' }}>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: titleSize,
          color: 'var(--text-primary)',
          fontWeight: 'var(--weight-bold)',
        }}
      >
        {ar.welcome.greeting(studentName)}
      </h1>
      <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
        {statsLine}
      </p>
    </section>
  );
}
