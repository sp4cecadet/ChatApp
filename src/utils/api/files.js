import { axios } from "core";

export default {
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete: (file) => axios.delete("/file?id=" + file.uid),
};
