import { fileToDataUri } from "./fileToDataUri";

const convertFilesToDataUris = async (files: string[]) => {
    try {
      const dataUris = [];
      for (const file of files) {
        const dataUri = await fileToDataUri(file);
        dataUris.push(dataUri);
      }
      return dataUris;
    } catch (error) {
      console.error("Ошибка при преобразовании файлов в Data URI:", error);
      throw error;
    }
  };

  export {convertFilesToDataUris}