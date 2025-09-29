import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import axios from "../api/axios"; // Ensure axios is imported

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({
    allTime: [],
    monthly: [],
    weekly: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch affiliate data from AdminDashboard API
        const affiliatesRes = await axios.get("/admin/affiliates");
        const affiliatesData = affiliatesRes.data || [];

        // Transform affiliate data for leaderboard with profile images
        const allTime = affiliatesData
          .map((affiliate) => ({
            name: `${affiliate.firstName || 'N/A'} ${affiliate.lastName || ''}`,
            amount: affiliate.totalCommission || 0,
            img: affiliate.profilePicture || `https://via.placeholder.com/50?text=${affiliate.firstName || 'User'}`, // Use profilePicture or placeholder
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 10); // Top 10

        const monthly = affiliatesData
          .map((affiliate) => ({
            name: `${affiliate.firstName || 'N/A'} ${affiliate.lastName || ''}`,
            amount: affiliate.totalCommission || 0, // Placeholder, replace with monthly data if available
            img: affiliate.profilePicture || `https://via.placeholder.com/50?text=${affiliate.firstName || 'User'}`,
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 10);

        const weekly = affiliatesData
          .map((affiliate) => ({
            name: `${affiliate.firstName || 'N/A'} ${affiliate.lastName || ''}`,
            amount: affiliate.totalCommission || 0, 
            img: affiliate.profilePicture || `https://via.placeholder.com/50?text=${affiliate.firstName || 'User'}`,
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 10);

        setLeaderboard({ allTime, monthly, weekly });
      } catch (err) {
        console.error("Error fetching affiliate data:", err);
      }
    };

    fetchData();
  }, []);

  const LeaderboardTable = ({ title, data, color }) => (
    <Card className="w-full max-w-md rounded-2xl shadow-xl">
      <div className={`p-3 text-center text-white font-bold text-lg rounded-t-2xl ${color}`}>
        {title}
      </div>
      <CardContent className="p-0">
        <table className="w-full border-collapse">
          <tbody>
            {data.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="text-center font-bold w-10 p-2">{index + 1}</td>
                <td className="flex items-center gap-3 p-2">
                  <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full" />
                  <span className="text-sm font-medium">{user.name}</span>
                </td>
                <td className="text-right pr-3 font-semibold text-green-600">
                  ₹{user.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      <LeaderboardTable title="All-Time Commission Leaders" data={leaderboard.allTime} color="bg-blue-600" />
      <LeaderboardTable title="Monthly Commission Leaders" data={leaderboard.monthly} color="bg-red-600" />
      <LeaderboardTable title="Weekly Commission Leaders" data={leaderboard.weekly} color="bg-green-600" />
    </div>
  );
};

export default Leaderboard;