const fileToDataUri = (files: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result);
    };
    reader.readAsDataURL(files);
  });

  export {fileToDataUri}