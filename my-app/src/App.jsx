import React, { useState, useEffect } from 'react'
import axios from "axios"

import deletImg from "./assets/images (1).jpeg"

import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import "./App.css"

const App = () => {
  const API = "https://67d5719bd2c7857431f06b9a.mockapi.io/Apiglobal"

  const [data, setData] = useState([])
  const [Add, setAdd] = useState("")

  async function get() {
    try {
      const response = await axios.get(API)
      setData(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  async function addUser() {
    let newObj = {
      name: Add
    }
    try {
      await axios.post(API, newObj)
      setAdd("")
      get()
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(API + "/" + id)
      get()
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get()
  })

  return (
    <div>
      {
        data.map((e) => {
          return (
            <div key={e.id} className='div'>
              <div className="item">
                <span>{e.name}</span>
                <img src={deletImg} onClick={() => deleteUser(e.id)} className='delete-btn' alt="" />
              </div>
            </div>
          )
        })
      }
      <div className='inpAdd'>
        <input type="text" className='inp' placeholder='name' value={Add} onChange={(e) => { setAdd(e.target.value) }} />
        <button onClick={addUser}>save</button>
      </div>
    </div>
  )
}

export default App
