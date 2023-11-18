"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getPubsInfo,getPubReviews } from "@/app/routes/fetchRequest";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapIcon from "@/components/MapIcon";
import { Suspense } from "react";
import Loading from "@/app/loading";
import ReviewForm from "@/components/ReviewForm";
import ReviewCard from "@/components/ReviewCard";
import ReactLoading from "react-loading";
import { WhatsappShareButton,WhatsappIcon } from "react-share"



const style = {
  root:{
    backgroundColor: 'blue',
  },
  copyContainer: {
    display: 'none'
  },
};



const PubDetails = () => {

type PubInfo = {
  _id: string;
    name: string;
    address: string;
    location: {
      lat: number;
      lng: number;
    };
    images: { data: string }[];
    cuisines: string[];
    featured: string[]; 
  };


  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  

  const [pubInfo, setPubInfo] = useState<PubInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [pubReview,setPubReview]  = useState<any[]>([])

  const slides = [
    {
      imageUrl: "b1.png",
    },
    {
      imageUrl: "b2.png",
    },
    {
      imageUrl: "b3.png",
    },
    {
      imageUrl: "b4.png",
    },
  ];

  async function fetchData() {
    try {
      const pubsData = await getPubsInfo();
      const pubData = pubsData.find((pub: any) => pub._id === id);
      setPubInfo(pubData);
      const pubReviews = await getPubReviews(id)
      setPubReview(pubReviews)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }
 

  useEffect(() => {
    fetchData();
  }, []);

  function openGoogleMap() {
    if (pubInfo) { 
      const lat = pubInfo.location.lat;
      const lng = pubInfo.location.lng;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(mapUrl, "_blank");
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-screen ">
        <Navbar />
        <div className=" container mx-auto mt-20 mb-20 shadow-2xl">
          {/* Scrolling Header Section */}
           <div>
            <Carousel
              showArrows={true}
              showStatus={false}
              showIndicators={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={2800}
              showThumbs={false}
              className="rounded-lg shadow-md "
            >
              {slides.map((slide, index) => (
                <div key={index}>
                  <img
                    src={"/" + slide.imageUrl}
                    alt={`Slide ${index + 1}`}
                    className="h-1/2 lg:h-2x96"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {/* image and details  */}
          {loading ? (
            <div className="flex items-center justify-center h-34 bg-transparent">
              <ReactLoading
                type="bubbles"
                color="#000000"
                height={150}
                width={150}
              />
            </div>
          ) : pubInfo ? (
            <div className="flex flex-col md:flex-row mt-12">
              <div className="w-full h-full">
                {pubInfo && pubInfo.images && pubInfo.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${Buffer.from(
                      pubInfo.images[0].data
                    ).toString("base64")}`}
                    alt="Pub"
                    className="rounded-lg h-5/6 w-full"
                  />
                )}
              </div>
              <div className="w-full h-full pl-4 pt-6 md:pt-0">
                <h1 className="text-3xl font-semibold mb-2">{pubInfo.name}</h1>
                <div className="text-gray-600">{pubInfo.address}</div>
                {/* buttons  */}
                <div className="py-4 hover:fill-white flex flex-row ">
                  <button
                    type="button"
                    className="inline-flex gap-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    onClick={openGoogleMap}
                  >
                    <MapIcon />
                    Direction
                    </button>
                  <div>
                      <WhatsappShareButton  url={window.location.href}><WhatsappIcon size={45} round={true}/></WhatsappShareButton>
                  </div>
                </div>
                  {/* Featured About Drinks */}
                <div>
                  <h1 className="text-lg font-medium">Featured</h1>
                  <div className="pt-4 inline-grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                    {pubInfo &&
                    pubInfo.featured &&
                    pubInfo.featured.length === 0 ? (
                      <span className="text-gray-500 text-sm font-medium">
                        No Data available
                      </span>
                    ) : (
                      pubInfo &&
                      pubInfo.featured &&
                      pubInfo.featured.map((feature:any, index:any) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-4 py-2 rounded-full dark:bg-blue-900 dark:text-blue-300 "
                        >
                          {feature}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                {/* cuisines */}
                <div className="pt-4">
                  <h1 className="text-lg font-medium">Cuisines</h1>
                  <div className="pt-4 inline-grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {pubInfo &&
                    pubInfo.cuisines &&
                    pubInfo.cuisines.length === 0 ? (
                      <span className="text-gray-500 text-sm font-medium">
                        No cuisines available
                      </span>
                    ) : (
                      pubInfo &&
                      pubInfo.cuisines &&
                      pubInfo.cuisines.map((cuisine:any, index:any) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-4 py-2 rounded-full dark:bg-blue-900 dark:text-blue-300 "
                        >
                          {cuisine}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ):(<></>)}
          {/* review section */}
          <ReviewForm pubId={pubInfo && pubInfo._id} />
          {/*review showcase */}
          <ReviewCard pubReview={pubReview} />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default PubDetails;
