import { convertFilesToDataUris } from "./convertFilesToDataUris";
import {data64toBlob} from "./b64toBlob"

const converDataUrisToBlob = async (files: string[]) => {
    const dataUris = await convertFilesToDataUris(files);
    const getContentType = (dataURI: string) => {
      return dataURI.split(",")[0].split(":")[1].split(";")[0];
    };
    const getb64Data = (dataURI: string) => {
      return dataURI.split(",")[1];
    };
    const infoFiles = [];
    const result = [];

    for (const dataUri of dataUris) {
        infoFiles.push({
          contentType: getContentType(dataUri as string),
          b64Data: getb64Data(dataUri as string),
        });

    }
    for (const item of infoFiles) {
      result.push(data64toBlob(item.b64Data, item.contentType));
    }

    return result;   

};

export { converDataUrisToBlob };
