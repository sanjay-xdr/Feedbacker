const { insertUser } = require("../db/models/userModel");

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
  exports.createUser = async (req, res) => {  

    result=await insertUser("Sanjay" , "Jaiswal" ,"sanjay@gmail.com" ,"123456")
    res.status(201).json({success:true, message:result});

  };
  