import { cookies } from "next/headers";

const SERVICE_BASE_URLS = {
  auth:
    process.env.AUTH_API_URL ||
    "http://auth-srv.default.svc.cluster.local:3000",
  orders:
    process.env.ORDERS_API_URL ||
    "http://orders-srv.default.svc.cluster.local:3000",
  tickets:
    process.env.TICKETS_API_URL ||
    "http://tickets-srv.default.svc.cluster.local:3000",
  payments:
    process.env.PAYMENTS_API_URL ||
    "http://payments-srv.default.svc.cluster.local:3000",
  // add more as needed
};

export function getServiceBaseUrl(service) {
  return SERVICE_BASE_URLS[service];
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  return sessionCookie ? `session=${sessionCookie.value}` : "";
}

/**
 * Generic API fetch utility for SSR/server components.
 * @param {string} service - The microservice name (e.g., 'auth', 'orders')
 * @param {string} path - API path (e.g., /api/users/currentuser)
 * @param {object} options - Fetch options (headers, method, etc.)
 */
export async function apiFetch(service, path, options = {}) {
  const baseURL = getServiceBaseUrl(service);
  const cookieString = await getSessionCookie();

  const headers = {
    Host: "ticket-marketplace.dev",
    Cookie: cookieString,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    console.log("fetching api: ", path);

    const res = await fetch(`${baseURL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: true, status: res.status, data: null };
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: true, data: null };
  }
}
