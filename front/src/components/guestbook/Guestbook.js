import React from "react";
import GuestbookCard from "./GuestbookCard";

const Guestbooks = ({ guestBooks, setGuestBooks }) => {
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
