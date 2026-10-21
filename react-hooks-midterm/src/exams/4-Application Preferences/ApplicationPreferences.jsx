import { usePreferences } from './PreferencesContext';
import { PreferencesProvider } from './PreferencesProvider';

function PreferencesPanel() {
  const { theme, toggleTheme, fontSize, setFontSize } = usePreferences();

  return (
    <div className="preferences-controls">
      <div className="control-row">
        <span>Theme</span>
        <button
          className="button button-secondary"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
        </button>
      </div>

      <div className="control-row">
        <span>Font size</span>
        <div className="button-row">
          {[14, 16, 18].map((size) => (
            <button
              key={size}
              className={fontSize === size ? 'button button-primary' : 'button button-secondary'}
              aria-pressed={fontSize === size}
              onClick={() => setFontSize(size)}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="preferences-toolbar">
      <PreferencesPanel />
    </div>
  );
}

function ArticlePreview() {
  const { theme, fontSize } = usePreferences();

  return (
    <div
      className={`article-preview${theme === 'dark' ? ' article-preview-dark' : ''}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <h3>Sample article</h3>
      <p>This text updates when you change the theme or font size.</p>
    </div>
  );
}

function Dashboard() {
  const { theme } = usePreferences();

  return (
    <div className={`preferences-dashboard${theme === 'dark' ? ' preferences-dashboard-dark' : ''}`}>
      <Toolbar />
      <ArticlePreview />
    </div>
  );
}

export default function ApplicationPreferences() {
  return (
    <PreferencesProvider>
      <section className="exam-card">
        <h2 className="exam-title">Application Preferences</h2>
        <Dashboard />
      </section>
    </PreferencesProvider>
  );
}