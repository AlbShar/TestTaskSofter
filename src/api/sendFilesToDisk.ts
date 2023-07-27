import { convertFilesToDataUris } from "../helpers/convertFilesToDataUris";

const sendFilesToDisk = async (url: any, files: string[]) => {
    let data = await convertFilesToDataUris(files);  
  
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.join(',')),
    });
  
    return response;
  };

  export {sendFilesToDisk}