'use client'
// const cloud_name = 'dijb4fddq';
const cloud_name = 'dvsfes74e';
// const upload_preset = 'lotus_ecommerce';
const upload_preset = 'safeparty';

/*
const uploadImage = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  data.append('cloud_name', cloud_name);
  const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,{
    method:"POST",
    body:data
  });
  
  const res = await uploaded.json()
  // console.log("result", res)
  return res;
}

*/

const uploadImages = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("Uplaod data", data)
    return { url: data.secure_url, public_id: data.public_id }; 
  });

  const urls = await Promise.all(uploadPromises);
  return urls;
};


export default uploadImages;