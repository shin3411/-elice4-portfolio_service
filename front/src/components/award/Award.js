import React from "react";
import AwardCard from "./AwardCard";

//AwardCard를 렌더링하는 컴포넌트
const Award = ({ portfolioOwnerId, isEditable }) => {
  return (
    <AwardCard portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
  );
};

export default Award;
