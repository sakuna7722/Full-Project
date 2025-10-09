useEffect(() => {
  console.log("[AdminDashboard] Component mounted, starting fetchDashboard...");
  fetchDashboard();

  // ← Naya: Purchased users fetch (admin route se)
  axios.get('/admin/purchased-users')
    .then(res => {
      setActiveUsers(res.data.users || []); // Active users ko purchased users se replace karo
      console.log(`Loaded ${res.data.users?.length || 0} purchased users`);
    })
    .catch(err => console.error('Purchased users error:', err));

  // ← Load old messages on mount (DB se general room ke liye)
  axios.get(`/chat/messages?room=${adminRoom}&limit=50`)
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