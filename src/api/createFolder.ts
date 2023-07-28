export async function createFolder(folderName: string) {
  const token = "y0_AgAAAAAhFQf_AAo_kQAAAADoy4lMzCcknY2wS5irsvvOc2y3R_QkNec";
  const url = `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(
    folderName
  )}`;

  let response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;",
      Authorization: `${token}`,
    },
  });


  if (response.ok) {
    console.log(response)
    let result = await response.json();
    return result.href;
  } else if (response.status === 409) {
    console.error(response);
    throw new Error("запрос был обработан с ошибкой");
  }
}
