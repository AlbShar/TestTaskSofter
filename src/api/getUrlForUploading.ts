export async function getUrlForUploading(path: string) {
  const token = "y0_AgAAAAAhFQf_AAo_kQAAAADoy4lMzCcknY2wS5irsvvOc2y3R_QkNec";

  let response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;",
      Authorization: `OAuth ${token}`,
    },
  });

  if (response.ok) {
    let result = await response.json();
    return result.href;
  } else {
    throw new Error("запрос был обработан с ошибкой");
  }
}
