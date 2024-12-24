type ApiRequestInit = Omit<RequestInit, "body"> & { body?: any };

async function fetchApi(input: string | URL, init?: ApiRequestInit) {
  const url = typeof input === "string" ? new URL(input, "http://localhost:5000") : input;
  const headers: HeadersInit = {
    "Content-Type": "application/json", // This make sure the server knows it's JSON
  };

  const res = await fetch(url.href, {
    ...init,
    headers,
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  if (!res.ok) {
    
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  async get(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "GET" });
  },
  async post(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "POST" });
  },
  async put(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "PUT" });
  },
  async delete(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "DELETE" });
  },
};
