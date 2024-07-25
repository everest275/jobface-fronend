export const encodeImageFileAsURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject("Failed to convert file to Base64");
        }
      };
      reader.readAsDataURL(file);
    });
  };
  