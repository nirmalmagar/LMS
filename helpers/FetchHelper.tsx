import { accessToken } from './TokenHelper';

export async function defaultFetcher(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      Accept: "application/json",
    },
  });
  return response.json();
}
