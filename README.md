# Formward TypeScript SDK

A zero-dependency TypeScript client for the [Formward](https://formward.eu) REST API. One file, built on `fetch`, works in Node 18+, Deno, Bun and edge runtimes.

Formward is a form backend hosted in Sweden: HTML forms post to one endpoint and you read the submissions back through the dashboard, webhooks or this API.

## Install

Copy `formward.ts` into your project. There is nothing else to install.

## Usage

```ts
import { FormwardClient } from "./formward";

const client = new FormwardClient({ apiKey: process.env.FORMWARD_API_KEY! });

const forms = await client.listForms();
const form = await client.getForm(forms[0].id);
const recent = await client.listSubmissions(form.id, { since: "2026-10-01T00:00:00Z" });
```

API keys are created in the Formward dashboard under API keys and are sent as `Authorization: Bearer <key>`. Keys carry per-key scopes; reading submissions requires the Professional plan. The full endpoint reference is at [formward.eu/docs/api](https://formward.eu/docs/api).

`baseUrl` defaults to `https://app.formward.eu` and can be overridden for testing.

## Errors

Every non-2xx response throws an `Error` whose message contains the HTTP status and the response body, for example `Formward API 401: {"error":"unauthorized"}`.

## License

MIT. See [LICENSE](./LICENSE).
