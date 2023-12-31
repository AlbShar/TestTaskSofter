const convertFileToBlob = async (file: File): Promise<Blob> => {
  const result = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      } else {
        reject(new Error('Не удалось прочитать файл как ArrayBuffer.'));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

  return await result as Promise<Blob>;
};

export { convertFileToBlob };
