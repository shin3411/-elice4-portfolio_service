import React from "react";
import { Card } from "react-bootstrap";
import GuestbookCard from "./GuestbookCard";

const Guestbooks = ({ guestBooks, setGuestBooks, fetch }) => {
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
