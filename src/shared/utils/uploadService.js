import axios from './axios';

export default async function uploadService(file, params) {
  const formData = new FormData();
  Object.entries(params)
    .forEach(([key, val]) => formData.append(key, val));

  // const mime = base64string.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  // let mimeType = 'inode/x-empty';
  // if (mime && mime.length) {
  //   mimeType = mime[1];
  // }
  // const file = await fetch(base64string)
  //   .then(res => res.arrayBuffer())
  //   .then(buffer => new File([buffer], filename, { type: mimeType }));
  formData.append('file', file);

  return axios({
    data: formData,
    url: '/file/upload/simple',
    method: 'POST',
  });
}
