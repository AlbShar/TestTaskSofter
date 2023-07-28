import { converDataUrisToBlob } from "../helpers/converDataUrisToBlob";

const sendFilesToDisk = async (url: any, files: string[]) => {
  let data = await converDataUrisToBlob(files);
  console.log(data)

  for (const item of data) {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: item,
    });
    return response;
  }



};

  export {sendFilesToDisk}