const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];
  
  // Get all users
  exports.getAllUsers = (req, res) => {
    res.status(200).json(users);
  };
  
  // Get user by ID
  exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(200).json(user);
  };
  
  // Create new user
  exports.createUser = (req, res) => {
    const newUser = {
      id: users.length + 1,
      name: req.body.name
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
  };
  