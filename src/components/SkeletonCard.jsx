import React from 'react';
import './Skeleton.css'; 

const SkeletonCard = () => (
  <div className="skeleton-card glass-card p-3 mb-3">
    <div className="skeleton-circle mb-3"></div>
    <div className="skeleton-line mb-2"></div>
    <div className="skeleton-line w-50 mb-3"></div>
    <div className="skeleton-button"></div>
  </div>
);

export default SkeletonCard;