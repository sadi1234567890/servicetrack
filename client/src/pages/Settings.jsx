import { useState } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <section>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">
        Manage your profile and application preferences.
      </p>

      <div className="settings-card">
        <div className="settings-section">
          <h2>Profile</h2>
          <p><strong>Name:</strong> Student User</p>
          <p><strong>Email:</strong> student@example.com</p>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>

          <label className="toggle-row">
            <span>
              <strong>Dark Mode Preview</strong>
              <small>Switch the settings card between light and dark style.</small>
            </span>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </label>

          <label className="toggle-row">
            <span>
              <strong>Email Updates</strong>
              <small>Receive reminders about upcoming renewals.</small>
            </span>

            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={() => setEmailUpdates(!emailUpdates)}
            />
          </label>
        </div>

        <div className={darkMode ? "preview-box dark-preview" : "preview-box"}>
          <h3>Preference Preview</h3>
          <p>
            Your dashboard experience is currently set to{" "}
            <strong>{darkMode ? "dark preview" : "light preview"}</strong>.
          </p>
          <p>
            Email reminders are{" "}
            <strong>{emailUpdates ? "enabled" : "disabled"}</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Settings;