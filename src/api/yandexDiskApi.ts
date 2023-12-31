const token = process.env.REACT_APP_API_TOKEN;

//запрос создаст папку по указанному пути
const createFolder = async (folderName: string) => {
  try {
    const baseUrl = process.env.REACT_APP_API_BASEURLFOLDER;
    const url = `${baseUrl}${encodeURIComponent(folderName)}`;

    let response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;',
        Authorization: `${token}`,
      },
    });

    if (response.status === 409) {
      const errorMessage = `Папка '${folderName}' уже существует в Яндекс Диске. Выберите другое название`;
      return errorMessage;
    }
  } catch (e) {
    console.error(e);
  }
};

//первый запрос для загрузки файла, вернет ссылку по которой нужно отправить файл
//ссылка действует 30мин.
const fetchHref = async (
  folderName: string,
  fileName: string,
  overwrite = false,
) => {
  const baseUrl = process.env.REACT_APP_API_BASEURLUPLOAD;
  const url = `${baseUrl}${folderName}%2F${fileName}&overwrite=${overwrite}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;',
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e: any) {
    if (e.message === '409') {
      return fileName;
    }
  }
};

//отправляем файл(ы) (blob) на полученную ссылку
const uploadFilesToDisk = async (url: string, blobData: Blob) => {
  try {
    let response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: blobData,
    });

    return response;
  } catch (e) {
    console.error(e);
  }
};

export { uploadFilesToDisk, fetchHref, createFolder };
