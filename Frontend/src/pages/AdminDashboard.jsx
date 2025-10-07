import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { RefreshCw, Download, Send, MessageCircle, Users } from "lucide-react";

import CourseVideos from "../components/CourseVideos";
import socket from "../components/socket";

export default function AdminDashboard() {
  const [loading, setLoading] = useState({ stats: true, sales: true, affiliates: true, courses: true, contacts: true });
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [sales, setSales] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [courses, setCourses] = useState([]);

  // ← Naye states for Chat
  const [activeUsers, setActiveUsers] = useState([]); // Online users list
  const [selectedUser, setSelectedUser] = useState(null); // Selected for private chat
  const [chatMessages, setChatMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState(''); // Reply input
  const [broadcastMessage, setBroadcastMessage] = useState(''); // Broadcast input
  const [adminName, setAdminName] = useState('Admin');
  const adminRoom = 'general';


  const [videos, setVideos] = useState([]);
  const handleAddVideo = (video) => {
    setVideos([...videos, video]);
  };

  // ← Fixed useEffect (old messages load add kiya)
  useEffect(() => {
    console.log("[AdminDashboard] Component mounted, starting fetchDashboard...");
    fetchDashboard();

    // ← Load old messages on mount (DB se general room ke liye)
    axios.get(`/api/chat/messages?room=${adminRoom}&limit=50`)
      .then(res => {
        setChatMessages(res.data.messages || []);
        console.log(`[AdminDashboard] Loaded ${res.data.messages?.length || 0} old messages`);
      })
      .catch(err => console.error('[AdminDashboard] Error loading old messages:', err.response?.data || err.message));

    // ← Existing Chat Socket Setup
    socket.emit('joinRoom', { room: adminRoom, userName: adminName });
    socket.emit('addUser', { userName: adminName, id: 'admin' });

    socket.on('receiveMessage', (data) => {
      if (data.room === adminRoom) {
        setChatMessages(prev => [...prev, data]);
      } else if (selectedUser && data.room === `private_${selectedUser.id}`) {
        setChatMessages(prev => [...prev, data]);
      }
    });

    socket.on('adminMessage', (data) => {
      setChatMessages(prev => [...prev, { ...data, userName: 'Admin Broadcast' }]);
    });

    socket.on('activeUsers', (users) => {
      setActiveUsers(users.filter(u => u.id !== 'admin')); // Admin ko exclude
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('adminMessage');
      socket.off('activeUsers');
    };
  }, [selectedUser]);

  const fetchDashboard = async () => {
    console.log("[AdminDashboard] Fetching dashboard data...");
    try {
      setLoading({ stats: true, sales: true, affiliates: true, courses: true, contacts: true });
      console.log("[AdminDashboard] Making API requests...");
      const [statsRes, salesRes, affiliatesRes, coursesRes, contactsRes] = await Promise.all([
        axios.get("/admin/dashboard"),
        axios.get("/admin/sales"),
        axios.get("/admin/affiliates"),
        axios.get("/admin/courses"),
        axios.get("/admin/contacts"),
      ]);

      console.log("[AdminDashboard] API responses:", {
        stats: statsRes.data,
        salesCount: salesRes.data.length,
        affiliatesCount: affiliatesRes.data.length,
        coursesCount: coursesRes.data.length,
        contactsCount: contactsRes.data.length,
        courses: coursesRes.data.map((c) => ({ id: c._id, name: c.title })),
      });
      setStats(statsRes.data || {});
      setSales(salesRes.data || []);
      setAffiliates(affiliatesRes.data || []);
      setCourses(coursesRes.data || []);
      setContacts(contactsRes.data || []);
    } catch (err) {
      console.error("[AdminDashboard] Error loading dashboard data:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading({ stats: false, sales: false, affiliates: false, courses: false, contacts: false });
      console.log("[AdminDashboard] Data fetching completed, loading states updated.");
    }
  };

  const handleExportCSV = () => {
    console.log("[AdminDashboard] Exporting CSV...");

    const formatNumber = (num) => Number(num || 0).toFixed(2);

    const csv = [
      "Data,Value",
      `Total Sales,${formatNumber(stats.totalSales)}`,
      `Commission Paid,${formatNumber(stats.totalCommission)}`,
      `Platform Earnings,${formatNumber((stats.totalSales || 0) - (stats.totalCommission || 0))}`,
      `Total Affiliates,${stats.totalAffiliates || 0}`,
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "admin_dashboard_stats.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    console.log("[AdminDashboard] CSV exported successfully");
  };

  // ← Broadcast function (group)
  const handleBroadcast = () => {
    if (broadcastMessage.trim()) {
      socket.emit('adminBroadcast', {
        room: adminRoom,
        message: broadcastMessage,
        userName: adminName,
        timestamp: Date.now()
      });
      setBroadcastMessage('');
      console.log(`[AdminDashboard] Broadcast sent: ${broadcastMessage}`);
    }
  };

  const handleReply = () => {
    if (replyMessage.trim() && selectedUser) {
      const privateRoom = `private_${selectedUser.id}`;
      socket.emit('adminReply', {
        room: privateRoom,
        message: replyMessage,
        userName: adminName,
        timestamp: Date.now()
      });
      setReplyMessage('');
    }
  };

  // Select user for private chat
  const selectUser = (user) => {
    setSelectedUser(user);
    const privateRoom = `private_${user.id}`;
    socket.emit('joinRoom', { room: privateRoom, userName: adminName });
    // Load private messages
    axios.get(`/api/chat/messages?room=${privateRoom}&limit=50`)
      .then(res => setChatMessages(res.data.messages || []))
      .catch(err => console.error('Private messages error:', err));
  };
  console.log("[AdminDashboard] Rendering dashboard");


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchDashboard} disabled={Object.values(loading).some(Boolean)}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Total Sales</p>
            <p className="text-xl font-bold">₹{stats.totalSales || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Commission Paid</p>
            <p className="text-xl font-bold">₹{stats.totalCommission || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Platform Earnings</p>
            <p className="text-xl font-bold">₹{(stats.totalSales || 0) - (stats.totalCommission || 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Affiliates</p>
            <p className="text-xl font-bold">{stats.totalAffiliates || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <CourseVideos videos={videos} onAddVideo={handleAddVideo} />
        </TabsContent>

        <TabsContent value="sales">
          {loading.sales ? (
            <div className="text-center">Loading sales...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell>{new Date(s.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{s.user?.firstName || 'N/A'} ({s.user?.email || 'N/A'})</TableCell>
                    <TableCell>{s.course?.title || 'N/A'}</TableCell>
                    <TableCell>₹{s.amount || 0}</TableCell>
                    <TableCell>₹{s.commissionEarned || 0}</TableCell>
                    <TableCell>{s.referredBy?.firstName || 'N/A'}</TableCell>
                    <TableCell>{s.status || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>

        <TabsContent value="affiliates">
          {loading.affiliates ? (
            <div className="text-center">Loading affiliates...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Total Commission</TableHead>
                  <TableHead>Last Sale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliates.map((a) => (
                  <TableRow key={a._id}>
                    <TableCell>{`${a.firstName || 'N/A'} ${a.lastName || ''}`}</TableCell>
                    <TableCell>{a.email || 'N/A'}</TableCell>
                    <TableCell>{a.salesCount || 0}</TableCell>
                    <TableCell>₹{a.totalCommission || 0}</TableCell>
                    <TableCell>{a.lastSaleAt ? new Date(a.lastSaleAt).toLocaleDateString() : 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>

        <TabsContent value="courses">
          {loading.courses ? (
            <div className="text-center">Loading courses...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.title || 'N/A'}</TableCell>
                    <TableCell>{c.salesCount || 0}</TableCell>
                    <TableCell>₹{c.totalRevenue || 0}</TableCell>
                    <TableCell>₹{c.totalCommission || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="contacts">
          {loading.contacts ? (
            <div className="text-center">Loading contact messages...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{c.name || 'N/A'}</TableCell>
                    <TableCell>{c.email || 'N/A'}</TableCell>
                    <TableCell>{c.subject || 'N/A'}</TableCell>
                    <TableCell>{c.message || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>



        {/* ← WhatsApp-like Chat Tab */}
        <TabsContent value="chat" className="flex gap-4">
          {/* Left: User List */}
          <div className="w-1/3 bg-gray-50 p-4 rounded border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" /> Online Users ({activeUsers.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activeUsers.map((user, i) => (
                <Button
                  key={i}
                  variant={selectedUser?.id === user.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => selectUser(user)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {user.userName}
                </Button>
              ))}
              {activeUsers.length === 0 && <p className="text-gray-500 text-sm">No online users</p>}
            </div>
          </div>

          {/* Right: Chat Window */}
          <div className="w-2/3 space-y-4">
            {selectedUser ? (
              <>
                <h3 className="font-semibold">Chat with {selectedUser.userName}</h3>
                <div className="h-64 border rounded overflow-y-auto p-2 bg-white">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`mb-2 p-2 rounded ${msg.userName === adminName ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
                      <strong>{msg.userName}:</strong> {msg.message}
                      <small className="block text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </small>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Reply to user..."
                    className="flex-1 p-2 border rounded"
                    onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                  />
                  <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" /> Reply
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a user to start chatting
              </div>
            )}
          </div>
        </TabsContent>


      </Tabs>
    </div>
  );
}

export { AdminDashboard };