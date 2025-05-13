import React, { useState, useEffect } from 'react'
import axios from "axios"

import deletImg from "./assets/images (1).jpeg"

import "./App.css"

const App = () => {
  const API = "https://67d5719bd2c7857431f06b9a.mockapi.io/Apiglobal"

  const [data, setData] = useState([])
  const [Add, setAdd] = useState("")

  const [isLoading, setIsLoading] = useState(false);

  async function get() {
    try {
      const { data } = await axios.get(API)
      setData(data)
    } catch (error) {
      console.error(error);
    }
  }

  async function addUser(e) {
    e.preventDefault();
    if (!Add.trim()) return;

    let newObj = {
      name: Add
    };

    setIsLoading(true);
    try {
      await axios.post(API, newObj);
      setAdd("");
      get();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
    const interval = setInterval(() => {
      console.log(1);
      get()
    }, 1500)
    return () => clearInterval(interval)
  })

  return (
    <div>
      <div className='chat'>
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
      </div>
      <form className='inpAdd' onSubmit={addUser}>
        <input
          type="text"
          className='inp'
          placeholder='Сообщение'
          value={Add}
          onChange={(e) => setAdd(e.target.value)}
        />

        <button type='submit' className='save-btn'>
          {isLoading ? (
            <img
              className='save loading'
              src="https://i.gifer.com/ZZ5H.gif" 
              alt="Loading..."
            />
          ) : (
            <img
              className='save'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXkHffqB1HAbPafPVaJdo1N8qCKEEC4MsbtN0lGVQldR8s-lmLoJcW6U9UwwgqEQzPS4&usqp=CAU"
              alt="Submit"
            />
          )}
        </button>
      </form>

    </div>
  )
}

export default App
