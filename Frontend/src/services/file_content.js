const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const fetchFileContent = async (
  { owner, repo, branch, path },
  { signal } = {}
) => {
  const response = await fetch(
    `${API_URL}/repository/file/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
      signal,
    }
  );

  if (!response.ok) {
    let message = "Unable to load file content.";
    try {
      const error = await response.json();
      message = error.detail || message;
    } catch {
      // Use the standard message when the endpoint returns no JSON error.
    }
    throw new Error(message);
  }

  return response.json();
};
