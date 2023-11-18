import React from "react";

const ReviewCard = ({ pubReview }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20 pt-12">
      {pubReview.map((review: any, index: number) => (
        <div key={index} className="w-64 p-4 border rounded-lg shadow-md mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">{review.name}</h2>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">{review.rating}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"></path>
              </svg>
            </div>
          </div>
          <p className="text-gray-700">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
