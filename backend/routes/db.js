import express from 'express';
import { supabase } from '../db.js';

const router = express.Router();

router.post("/create_user", async (req, res) => {
  const user = req.body;
  const { data, error } = await supabase
    .from('users')
    .insert([
      { username: user.username, email: user.credential.email },
    ])
    .select()
    
    if (error) console.log(error);
    else console.log(data);
})



export default router


