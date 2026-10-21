import { useState } from 'react';
import SmartTaskCounter from './exams/1-Smart Task Counter/SmartTaskCounter';
import LiveSearchTimer from './exams/2-Live Search and Timer/LiveSearchTimer';
import AccessibleForm from './exams/3-Accessible Form Toolkit/AccessibleForm';
import ApplicationPreferences from './exams/4-Application Preferences/ApplicationPreferences';
import ProductExplorer from './exams/5-Product Explorer Performance Repair/ProductExplorer';
import IssueTracker from './exams/6-Issue Tracker State Engine/IssueTracker';

export default function App() {
  const [activeTab, setActiveTab] = useState(6);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>React Hooks Practical Exam</h1>
        <nav className="exam-nav" aria-label="Exam selection">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              type="button"
              className={activeTab === num ? 'button button-primary' : 'button button-secondary'}
              aria-pressed={activeTab === num}
              onClick={() => setActiveTab(num)}
            >
              Exam {num}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {activeTab === 1 && <SmartTaskCounter />}
        {activeTab === 2 && <LiveSearchTimer />}
        {activeTab === 3 && <AccessibleForm />}
        {activeTab === 4 && <ApplicationPreferences />}
        {activeTab === 5 && <ProductExplorer />}
        {activeTab === 6 && <IssueTracker />}
      </main>
    </div>
  );
}