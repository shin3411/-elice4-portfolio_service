import React, { useState, useEffect } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";

import * as Api from "../../api";

const Award = ({ portfolioOwnerId, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);
  return (
    <AwardCard
      user={user}
      setIsEditing={setIsEditing}
      isEditable={isEditable}
    />
  );
};

export default Award;
