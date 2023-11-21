import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaJediOrder, FaUser } from "react-icons/fa";

function AdiminHome() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats, isLoading: adminStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`admin-stats`);
      return res.data;
    },
  });
  const { data: chartData, isLoading: orderStatsLoading } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  if (adminStatsLoading || orderStatsLoading) {
    return <div>loading...</div>;
  }
  // console.log(stats);
  return (
    <div>
      <h2 className="text-3xl">
        <span> Hi , Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
      <div className="shadow stats">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUser className="text-3xl" />
          </div>
          <div className="stat-title"> Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaJediOrder className="text-3xl" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBook className="text-3xl" />
          </div>
          <div className="stat-title">Menu Item</div>
          <div className="stat-value">{stats.menuItem}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
}

export default AdiminHome;
