"use client";
import React, { useEffect, useState } from "react";
import HeaderSlider from "../components/HeaderSlider";
import Link from "next/link";
import { getPubsInfo } from "./routes/fetchRequest";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "./loading";
import ReactLoading from "react-loading";
import { Suspense } from "react";
import TickmarkIcon from "@/components/TickmarkIcon";
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Home = () => {
  const { status } = useSession()
  if (status === 'unauthenticated') {
    redirect('/login')
  }

  const [pubInfo, setPubInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const pubData = await getPubsInfo();
      setPubInfo(pubData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
    <div className="h-screen">
      <Navbar />
      <div className="bg-gray-100 fontFamily">
        <header className="bg-white shadow-md p-4 pt-0 mt-20">
          <HeaderSlider />
        </header>
        <main className="mx-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-34 bg-transparent">
              <ReactLoading
                type="bubbles"
                color="#000000"
                height={150}
                width={150}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-4">
              {pubInfo.map((pub) => (
                <div
                  key={pub._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Link href={`/pubInfo/${pub._id}`}>
                    {pub.images.map((image:any, key:any) => (
                      <img
                        key={key}
                        src={`data:image/jpeg;base64,${Buffer.from(
                          image.data
                        ).toString("base64")}`}
                        alt={`Image${key}`}
                        className="w-full h-80 object-cover object-top"
                      />
                    ))}
                  </Link>
                  <div className="p-4 font-black">
                    <h2 className="text-xl">{pub.name}</h2>
                    <div className="text-lg text-gray-700">{pub.area}</div>
                    <div className="flex items-center mt-2">
                      <div className="text-yellow-700 text-lg mr-2">
                        {pub.rating}
                      </div>
                      <TickmarkIcon/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
      </div>
    </Suspense>
  );
};

export default Home;
