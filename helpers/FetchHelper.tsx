import { accessToken } from './TokenHelper';

export async function defaultFetcher(url: string) {
  console.log("tokeneen",accessToken)
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      Accept: "application/json",
    },
  });
  return response.json();
}
