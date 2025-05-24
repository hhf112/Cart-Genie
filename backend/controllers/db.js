import { supabase } from "../db.js";

export const createUser = async (req, res) => {
  const user = req.body;
  const { data, error } = await supabase
    .from('users')
    .insert([
      { username: user.username, email: user.credential.email },
    ])
    .select()

  if (error) console.log(error);
  else console.log(data);
}

export const fetchUser = async (req, res) => {
  let { data: users, error } = await supabase
    .from('users')
    .select('username')
    .eq("email", req.body.email)

  if (error) console.log(error)
  else res.json({email: data})
}
