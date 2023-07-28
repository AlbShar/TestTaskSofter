export async function fetchUrl(folderName: string, fileName: any) {
  const token = "y0_AgAAAAAhFQf_AAo_kQAAAADoy4lMzCcknY2wS5irsvvOc2y3R_QkNec";

    const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2F${folderName}%2F${fileName}`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      let result = await response.json();
      return result.href;
    } else {
      throw new Error("запрос с ошибкой");
    }
}
