app.patch('/user/:userID', async (req, res) => {
  const id = req.params.userID;
  const updateData = req.body;
  try {
    const ALLOWED_UPDATE = [
      'firstName',
      'password',
      'age',
      'photoUrl',
      'about',
      'skills',
    ];
    const isUpdateAllowed = Object.keys(updateData).every((key) =>
      ALLOWED_UPDATE.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error('update not allowed !!');
    }
    const updatedFirstName = await User.findByIdAndUpdate(id, updateData, {
      runValidators: true,
    });
    res.send(`update firstName successfully `);
  } catch (error) {
    res.status(400).send(`user not found in the DB ${error.message}`);
  }
});
