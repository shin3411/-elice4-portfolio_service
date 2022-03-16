import React, { useState, useEffect } from "react";
import AwardCard from "./AwardCard";

import * as Api from "../../api";

//AwardCard를 렌더링하는 컴포넌트
const Award = ({ portfolioOwnerId, isEditable }) => {
  return <AwardCard isEditable={isEditable} />;
};

export default Award;
