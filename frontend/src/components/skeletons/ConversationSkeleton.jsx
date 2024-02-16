import React from "react";

const ConversationSkeleton = () => {
  return (
    <div className="flex flex-col pb-4 px-2 w-52">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-2 w-20"></div>
          <div className="skeleton h-2 w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSkeleton;
