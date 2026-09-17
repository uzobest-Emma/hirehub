"use client";

import { useState } from "react";

type SaveJobButtonProps = {
  jobId: string;
};

export default function SaveJobButton({
  jobId,
}: SaveJobButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    try {
      const response = await fetch("/api/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to save job.");
        return;
      }

      setSaved(data.saved);
    } catch (error) {
      console.error("SAVE JOB BUTTON ERROR:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="save-job-button"
      onClick={handleSave}
      disabled={loading}
    >
      {loading
        ? "Saving..."
        : saved
        ? "♥ Saved"
        : "♡ Save Job"}
    </button>
  );
}