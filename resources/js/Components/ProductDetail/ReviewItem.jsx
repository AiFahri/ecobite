import React from "react";
import UserImage from "../../../assets/Ellipse 440.png";
import ReviewsStatus from "../../../assets/Reviews + Status.svg";

const ReviewItem = () => {
    return (
        <div className="mt-10">
            <span className="flex justify-between mt-6">
                <span className="flex">
                    <img
                        src={UserImage}
                        className="w-10 h-10 mr-2"
                        alt="User"
                    />
                    <span>
                        <p className="text-md">Michie Len</p>
                        <p className="text-xs text-gray-400">
                            Malang. East Java
                        </p>
                    </span>
                </span>
                <span className="text-md mr-2">
                    <p className="text-gray-400">
                        Absolutely delicious! The Vegetable Salad exceeded my{" "}
                        <br />
                        expectations in every way. Each bite was bursting with
                        freshness.
                    </p>
                    <img src={ReviewsStatus} className="mt-4" alt="Reviews" />
                </span>
                <p className="text-sm">21 April 2024</p>
            </span>
        </div>
    );
};

export default ReviewItem;
