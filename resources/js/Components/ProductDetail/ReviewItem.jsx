import React from "react";

const ReviewItem = ({ review }) => {
    console.log("Review data:", review);
    if (!review) return null;

    // Mengambil data user dan address
    const user = review.transaction_item?.transaction?.address?.user || {};
    const address = review.transaction_item?.transaction?.address || {};

    return (
        <div className="py-4">
            <div className="flex items-start">
                <div className="w-10 flex-shrink-0">
                    <img
                        src={user.photo_url || "/default-avatar.png"}
                        className="w-10 h-10 rounded-full object-cover"
                        alt={user.full_name || "User"}
                    />
                </div>

                <div className="ml-4 w-[180px] flex-shrink-0">
                    <h3 className="font-semibold truncate">
                        {user.full_name || "Anonymous"}
                    </h3>
                    <p className="text-gray-500 text-sm truncate">
                        {address.city || "-"}, {address.state || "-"}
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
                <div className="ml-auto text-sm whitespace-nowrap text-gray-500">
                    {new Date(review.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
