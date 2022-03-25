import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { MdDelete, MdCreate } from "react-icons/md";
import * as Api from "../../api";
import GuestbookEdit from "./GuestbookEdit";
import GuestbookCard from "./GuestbookCard";

import { useRecoilValue } from "recoil";
import { modeState } from "../../atom/themeState";
import loginIdState from "../../atom/loginIdState";

const Guestbooks = ({ guestBooks, setGuestBooks }) => {
  const ModeState = useRecoilValue(modeState);
  const currentId = useRecoilValue(loginIdState);
  const [isEdit, setIsEdit] = useState(false);
  console.log(guestBooks);
  return guestBooks.map((comment) => (
    <GuestbookCard
      key={comment.id}
      comments={comment}
      setGuestBooks={setGuestBooks}
    />
  ));
};

export default Guestbooks;
