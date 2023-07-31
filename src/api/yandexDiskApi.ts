import { converDataUrisToBlob } from "../helpers/converDataUrisToBlob";

const token = "y0_AgAAAAAhFQf_AAo_kQAAAADoy4lMzCcknY2wS5irsvvOc2y3R_QkNec";
const baseUrlCreateFolder =
  "https://cloud-api.yandex.net/v1/disk/resources?path=";
const baseUrlFetchHref =
  "https://cloud-api.yandex.net/v1/disk/resources/upload?path=";

//запрос создаст папку по указанному пути
const createFolder = async (folderName: string) => {
  if (!folderName) {
    return null;
  }
  const url = `${baseUrlCreateFolder}${encodeURIComponent(folderName)}`;

  let response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;",
      Authorization: `${token}`,
    },
  });

  if (response.status === 409) {
    const errorMessage = `Папка '${folderName}' уже существует в Яндекс Диске. Выберите другое название`;
    return errorMessage;
  }
};

//первый запрос для загрузки файла, вернет ссылку по которой нужно отправить файл
//ссылка действует 30мин.
const fetchHref = async (folderName: string, fileName: any) => {
  const url = `${baseUrlFetchHref}${folderName}%2F${fileName}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;",
      Authorization: `${token}`,
    },
  });

  return response.json();

  // if (response.ok) {
  //   let result = await response.json();
  //   return result.href;
  // } else {
  //   throw new Error("запрос с ошибкой");
  // }
};

//отправляем файл(ы) (blob) на полученную ссылку
const uploadFilesToDisk = async (url: any, files: string[]) => {
  let data = await converDataUrisToBlob(files);

  for (const item of data) {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: item,
    });
    return response;
  }
};

export { uploadFilesToDisk, fetchHref, createFolder };
