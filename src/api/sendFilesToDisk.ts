import { converDataUrisToBlob } from "../helpers/converDataUrisToBlob";

const sendFilesToDisk = async (url: any, files: string[]) => {
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

export { sendFilesToDisk };
