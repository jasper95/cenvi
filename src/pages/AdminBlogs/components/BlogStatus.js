import React from 'react';

function BlogStatus(props) {
  const { status } = props;
  return (
    <div className="status">{status}</div>
  );
}
export default BlogStatus;
