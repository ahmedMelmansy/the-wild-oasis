import supabase, { supabaseUrl } from './supabase'

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" }
    }
  })

  if (error) throw new Error(error.message)
  return data
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return data
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session?.session) return null

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)

  return user
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName
  if (password || fullName) {
    const updateData = {}
    if (password) updateData.password = password
    if (fullName) updateData.data = { fullName }

    const { error } = await supabase.auth.updateUser(updateData)
    if (error) throw new Error(error.message)
  }

  // 2. Upload new avatar if exists
  if (!avatar) return // No avatar to update

  const fileName = `avatar-${Date.now()}-${Math.random().toString(36).slice(2)}`

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

  if (storageError) throw new Error(storageError.message)

  // 3. Get public URL and update user metadata
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`

  const { data, error: updateError } = await supabase.auth.updateUser({
    data: { avatar: avatarUrl }
  })

  if (updateError) throw new Error(updateError.message)

  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}