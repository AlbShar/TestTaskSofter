import { getPath } from "../helpers/getPath";

export async function fetchUrl(folderName: string) {
  const token = "y0_AgAAAAAhFQf_AAo_kQAAAADoy4lMzCcknY2wS5irsvvOc2y3R_QkNec";
//   const path = getPath(href);
//   console.log(href);
  const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2F${folderName}%2Fphoto.png`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;",
      Authorization: `${token}`,
    },
  });

  if (response.ok) {
    let result = await response.json();
    console.log(result);
    return result.href;
  } else {
    console.log(response);
    throw new Error("запрос с ошибкой");
  }
}
