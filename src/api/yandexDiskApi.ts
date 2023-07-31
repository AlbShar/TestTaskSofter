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


  if (response.ok) {
    return response.json();
  } else if (response.status === 409) {
    const errorMessage = `Файл '${fileName}' уже существует в Яндекс Диске`;
    return errorMessage;
  }
};

//отправляем файл(ы) (blob) на полученную ссылку
const uploadFilesToDisk = async (url: any, blobData: any) => {
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: blobData,
  });

  return  response.json();
};

export { uploadFilesToDisk, fetchHref, createFolder };
