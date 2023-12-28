import { ChevronsDown } from "lucide-react";

export const Stats = ({
  download_count,
  created_at,
  updated_at,
}: {
  download_count: number;
  created_at: Date;
  updated_at: Date;
}) => {
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-figure text-primary">
          <ChevronsDown width={30} />
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
