const globalUrl = process.env.NEXT_PUBLIC_API_URL;


export async function getPubsInfo() {
  try {
    const url = globalUrl + "/api/pubsInfo";
    const res = await fetch(url);
   if (res.ok) {
     const data = res.json();
     return data;
   }
  } catch (error) {
    console.log(error);
  }
}

export async function postUsersData(user) {
  const { name, email, image } = user
  try{
    const config ={
      method: "POST",
      headers: {
      "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        image
      })
    }
    const url = globalUrl + "/api/postUser"
    const res = await fetch(url, config);
    if (res.ok) { 
      const data = res.json(); 
      return data;
    }
  }catch(error){
    console.log(error)
  }
}


export async function postReviewData(text, rating, images, pubId, email) {
  try {
    const formData = new FormData();
    formData.append("images", images);
    formData.append("rating", rating);
    formData.append("text", text);
    formData.append("pubId", pubId);
    formData.append("email", email);
    const config = {
      method: "POST",
      body: formData,
    };
    const url = globalUrl + "/api/review";
    const res = await fetch(url, config);
    if (res.ok) {
      const data = res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPubReviews(pubId) { 
  try {
    const url = globalUrl + `/api/pubReviews?pubId=${pubId}`;
    const res = await fetch(url);
    if (res.ok) {
     const data = res.json();
     return data;
    }
  } catch (error) {
    console.log(error);
  }
}