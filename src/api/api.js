import axios from 'axios'

const API_URL = 'http://localhost:3000'

// LEFT PANEL
export async function fetchFolderTree() {
  try {
    const res = await axios.get(`${API_URL}/folders/tree`)

    // FIX: ambil data dari .data.data
    return res.data.data
  } catch (err) {
    console.error('Tree Error:', err)
    return []
  }
}

// RIGHT PANEL
export async function fetchChildren(id) {
  try {
    const res = await axios.get(`${API_URL}/folders/${id}/children`)

    return res.data.data
  } catch (err) {
    console.error('Children Error:', err)
    return []
  }
}

export async function fetchFiles(folderId) {
  const res = await axios.get(`${API_URL}/files/folder/${folderId}`)

  return res.data.data
}
