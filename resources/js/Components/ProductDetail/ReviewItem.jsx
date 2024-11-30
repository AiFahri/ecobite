import React from "react";

const ReviewItem = ({ review }) => {
    review = review.data;
    return (
        <div className="py-4">
            <div className="flex items-start">
                <div className="w-10 flex-shrink-0">
                    <img
                        src={review.photo_url}
                        className="w-10 h-10 rounded-full object-cover"
                        alt={review.full_name}
                    />
                </div>

                <div className="ml-4 w-[180px] flex-shrink-0">
                    <h3 className="font-semibold truncate">
                        {review.full_name || "Anonymous"}
                    </h3>
                    <p className="text-gray-500 text-sm truncate">
                        {review.city}, {review.state}
                    </p>
                </div>

                <div className="w-[400px] flex-shrink-0">
                    <p className="text-gray-600 break-words">
                        {review.feedback}
                    </p>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`${
                                    i < review.star
                                        ? "text-orange-400"
                                        : "text-gray-300"
                                }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="ml-auto text-sm whitespace-nowrap text-black">
                    {review.created_at}
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
