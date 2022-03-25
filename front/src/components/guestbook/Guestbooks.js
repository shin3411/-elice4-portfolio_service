import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { MdDelete, MdCreate } from "react-icons/md";
import * as Api from "../../api";
import GuestbookEdit from "./GuestbookEdit";
import GuestbookCard from "./GuestbookCard";

const Guestbooks = ({
  portfolioOwnerId,
  isEditable,
  guestBooks,
  setGuestBooks,
  fetch,
}) => {
  return (
    <Card.Body style={{ maxHeight: "350px", overflow: "auto" }}>
      {guestBooks.map((comment) => (
        <GuestbookCard
          comment={comment}
          key={comment._id}
          setGuestBooks={setGuestBooks}
          fetch={fetch}
        />
      ))}
    </Card.Body>
  );
};

export default Guestbooks;
