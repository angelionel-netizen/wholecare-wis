// Login Customer
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const user = db.prepare('SELECT * FROM customers WHERE email = ? AND password = ?').get(email, password);
    if (user) {
      res.json({
        success: true,
        customer: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          allowNotes: Boolean(user.allow_notes),
          allowPurchaseHistory: Boolean(user.allow_purchase_history),
          dietaryPreferences: user.dietary_preferences,
          allergies: user.allergies
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});