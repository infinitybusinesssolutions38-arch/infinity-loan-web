"use client";

import { useEffect, useState } from "react";

export default function DebugPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/loan-applications", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        console.log("API Response:", data);
        setApps(data.data?.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Debug: Available Applications</h1>
      <pre>{JSON.stringify(apps, null, 2)}</pre>
    </div>
  );
}
