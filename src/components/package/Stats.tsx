import type { FC } from "react";

import Downloads from "~/icons/downloads.svg";

interface props {
  download_count: number;
  created_at: Date;
  updated_at: Date;
}

let Stats: FC<props> = ({ download_count, created_at, updated_at }) => {
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-figure text-primary">
          <Downloads width={30} />
        </div>
        <div className="stat-title">Downloads</div>
        <div className="stat-value text-primary">{download_count}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Created On</div>
        <div className="stat-value text-primary">
          {created_at.toLocaleDateString()}
        </div>
      </div>
      <div className="stat">
        <div className="stat-title">Last Updated</div>
        <div className="stat-value text-primary">
          {updated_at.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Stats;
