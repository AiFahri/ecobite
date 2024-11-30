import React from "react";
import UserImage from "../../../assets/Ellipse 440.png";
import ReviewsStatus from "../../../assets/Reviews + Status.svg";

const ReviewItem = ({ review }) => {
    console.log("Review Item:", review);

    return (
        <div className="py-4">
            <div className="flex items-start">
                <img
                    src={UserImage}
                    className="w-10 h-10 rounded-full"
                    alt="User Avatar"
                />
                <div className="ml-4">
                    <h3 className="font-semibold">
                        {review?.transaction_item?.transaction?.address?.user
                            ?.name || "Anonymous"}
                    </h3>
                    <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`text-${
                                    i < review.star ? "yellow" : "gray"
                                }-400`}
                            >
                                ★
                            </span>
                        ))}
                        <span className="ml-2 text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="mt-2">{review.feedback}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
