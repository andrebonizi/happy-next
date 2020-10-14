export function useImgur() {
  function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return fetch('https://api.imgur.com/3/upload.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_ID}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => res.data.link);
  }

  async function uploadImages(files: FileList) {
    const links: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        links.push(await uploadImage(file));
      }
    }
    return links;
  }
  return { uploadImage, uploadImages };
}
