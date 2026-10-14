"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";
import GeniusLogo from "./genius-logo";
import { LearningAvatar } from "./avatar-lab";
import "./login-form.css";

export default function LoginForm() {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [visible, setVisible] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const usernameInput = useRef<HTMLInputElement>(null),
    passwordInput = useRef<HTMLInputElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(
          response.status === 401
            ? "That username or password didn’t match. Try again."
            : result.error || "We couldn’t sign you in. Try again in a moment.",
        );
        setPassword("");
        passwordInput.current?.focus();
        return;
      }
      // A full navigation discards another child's in-memory progress from the previous session.
      window.location.replace("/");
    } catch {
      setError("We couldn’t connect. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="genius-login">
      <section className="login-welcome" aria-label="Welcome to Genius Lab">
        <GeniusLogo className="login-wordmark" />
        <div className="login-tick-stage">
          <div className="login-tick-orbit" aria-hidden="true" />
          <LearningAvatar size={340} mood="greeting" />
          <span className="login-tick-note">Big ideas start small.</span>
        </div>
        <div className="login-welcome-copy">
          <h1>Come on in, curious mind.</h1>
          <p>Learn something surprising. Try a new idea. Make it your own.</p>
        </div>
      </section>
      <section className="login-entry" aria-labelledby="login-heading">
        <div className="login-key" aria-hidden="true">
          <KeyRound size={27} />
        </div>
        <h2 id="login-heading">Your lab is ready.</h2>
        <p>Sign in to pick up where you left off.</p>
        <form onSubmit={submit}>
          <label htmlFor="genius-username">Username</label>
          <input
            ref={usernameInput}
            id="genius-username"
            name="username"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={busy}
            aria-describedby="username-help"
          />
          <p id="username-help" className="login-help">
            Your username isn’t case-sensitive.
          </p>
          <label htmlFor="genius-password">Password</label>
          <div className="login-password">
            <input
              ref={passwordInput}
              id="genius-password"
              name="password"
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={busy}
            />
            <button
              type="button"
              className="login-reveal"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? "Hide password" : "Show password"}
              aria-pressed={visible}
            >
              {visible ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          {error && (
            <p role="alert" className="login-error">
              {error}
            </p>
          )}
          <button className="login-enter" type="submit" disabled={busy}>
            {busy ? "Opening your lab…" : "Enter Genius Lab"}
            {!busy && <ArrowRight size={23} />}
          </button>
        </form>
        <p className="login-footnote">
          Your ideas, your progress, your tickets.
        </p>
      </section>
    </main>
  );
}
