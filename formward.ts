// Formward TypeScript SDK — zero-dependency client for the Formward REST API.
// Copy into your project or publish as @formward/sdk.

export interface FormwardClientOptions { apiKey: string; baseUrl?: string }
export class FormwardClient {
  private base: string;
  constructor(private opts: FormwardClientOptions) {
    this.base = (opts.baseUrl ?? "https://app.formward.eu").replace(/\/+$/, "");
  }
  private async get<T>(path: string, query?: Record<string, string>): Promise<T> {
    const url = new URL(this.base + path);
    if (query) for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${this.opts.apiKey}`, Accept: "application/json" } });
    if (!res.ok) throw new Error(`Formward API ${res.status}: ${await res.text()}`);
    return (await res.json()).data as T;
  }
  listForms() { return this.get<Array<{ id: string; name: string }>>("/api/v1/forms"); }
  getForm(id: string) { return this.get<{ id: string; name: string }>(`/api/v1/forms/${id}`); }
  listSubmissions(formId: string, opts?: { since?: string }) {
    return this.get<unknown[]>(`/api/v1/forms/${formId}/submissions`, opts?.since ? { since: opts.since } : undefined);
  }
}
