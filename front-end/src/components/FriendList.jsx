// import { useState } from 'react';
import PropTypes from "prop-types";

const FriendList = ({ user }) => {
  return (
    <div>
      <span>{ user.name } / </span>
      <span>{ user.email }</span>
    </div>
  );
};

FriendList.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
}

export default FriendList;