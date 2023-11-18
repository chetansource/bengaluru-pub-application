import { useState,useEffect } from "react";
import ReactStars from "react-stars";
import UploadIcon from "./UploadIcon";
import { postReviewData } from "@/app/routes/fetchRequest";
import { useSession } from "next-auth/react";

const Review = ({pubId}:any) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState([]);
  const [email,setEmail] = useState("")
  const [alertMessage,setAlertMessage]=useState("")
  const { data } = useSession();


  async function handleReviewSubmit() {
    if (text !== "" && rating !== 0) { 
      const response = await postReviewData(text,rating,image,pubId,email)

      if(response.message){
      setAlertMessage(response.message)
      setTimeout(()=>{
        setAlertMessage("")
      },2000)
     }
     
      setText("")
      setImage([])
    } else {
      setAlertMessage("Fill The Fields")
      setTimeout(() => {
        setAlertMessage("")
      }, 2000)
    }

   }


  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };

  const handleImageUpload = (e: any) => {
    const files = e.target.files;
    const fileList:any = Array.from(files);
    setImage(fileList);
  };

  useEffect(() => {
    if (data?.user?.email) {
      setEmail(data.user.email);
    }
  }, [data]);

  return (
    <div className="w-full p-4  bg-white rounded-lg shadow-lg pt-12 pb-20">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <textarea
        className="w-full h-40 p-2 mb-4 border border-black rounded-md  shadow-xl resize-none " 
        placeholder="Share your experience..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="flex items-center mb-4">
        <ReactStars
          count={5}
          size={24}
          onChange={ratingChanged}
        ></ReactStars>
      </div>
      <label
        htmlFor="image-upload"
        className="cursor-pointer mb-6 p-2 gap-2 border-2 border-black rounded-md inline-flex hover:bg-black hover:text-white"
      >
        <UploadIcon /> Attach an Image
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        multiple
        className="hidden"
      />
      {image && (
        <div className="flex flex-row gap-4">
          {Array.isArray(image) ? (
            // Check if it's an array of files
            image.map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded Image ${index}`}
                  className="w-36 h-36 object-contain mb-4 rounded-md "
                />
              </div>
            ))
          ) : (
            // Handle the case when it's a single file
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Image"
              className="w-36 h-36 object-contain mb-4 rounded-md "
            />
          )}
        </div>
      )}
      <div className="py-4 text-red-500">{alertMessage}</div>
      <button
        type="button"
        className="inline-flex gap-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        onClick={handleReviewSubmit}
      >
        Submit 
      </button>
    </div>
  );
};

export default Review;
