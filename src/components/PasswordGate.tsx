import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { matchesPassword } from "../utils/normalizeAnswer";

type Props = {
  password: string;
  acceptedAnswers?: string[];
  label?: string;
  buttonLabel?: string;
  onUnlock: () => void;
  /**
   * Optional hidden alternate code (e.g. a host/facilitator code). It is never
   * shown to players; when entered into this same field it calls `onAlt`
   * instead of `onUnlock`.
   */
  altPassword?: string;
  onAlt?: () => void;
};

export default function PasswordGate({
  password,
  acceptedAnswers,
  label,
  buttonLabel,
  onUnlock,
  altPassword,
  onAlt,
}: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (altPassword && onAlt && matchesPassword(value, altPassword)) {
      setError(false);
      onAlt();
    } else if (matchesPassword(value, password, acceptedAnswers)) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <label htmlFor="pw-input">{label ?? t("enterPassword")}</label>
      <input
        id="pw-input"
        type="text"
        inputMode="text"
        autoCapitalize="characters"
        autoComplete="off"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        placeholder={t("passwordPlaceholder")}
      />
      {error && <p className="notice notice-strong">{t("wrongPassword")}</p>}
      <button type="submit" className="btn btn-primary" disabled={!value.trim()}>
        {buttonLabel ?? t("unlock")}
      </button>
    </form>
  );
}
