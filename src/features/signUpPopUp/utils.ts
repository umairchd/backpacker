export const postForm = async (url = "", data = {}, iterable_key: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": iterable_key,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
