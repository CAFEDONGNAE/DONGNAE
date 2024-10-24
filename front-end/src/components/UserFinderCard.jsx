// import { useState } from 'react';
import PropTypes from "prop-types";

const highlightText = (text, query) => {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
};

const UserFinderCard = ({ user, searchQuery }) => {
  return (
    <div>
      <span>{highlightText(user.name, searchQuery)} / </span>
      <span>{ user.email }</span>
    </div>
  );
};

UserFinderCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  searchQuery: PropTypes.string
}

export default UserFinderCard;