// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const axios = require('axios');

const express = require("express");
const appEX = express();
const cors = require("cors");
const { response } = require('express');

appEX.use(cors());
appEX.use(express.json());

//routes

//авторизация или получение токена
appEX.post("/", async(req, res) => {
      const { login, password } = req.body
      axios.defaults.headers.common['Accept'] = 'application/json'
      axios.post(`https://dev.rightech.io/api/v1/auth/token`, {
        login: login,
        password: password
      }).then(response => {
        //console.log(response.data)
        res.send(response.data)
      }).catch(error => {
        //console.log("--------------------------")
        //console.log(error.response.data)
        //console.log("--------------------------")
        res.send(error.response.data)
    })
})


//проверка токена
appEX.post("/object", async(req, res) => {
  const { token } = req.body
  //console.log(token)
  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = token

  axios.get(`https://dev.rightech.io/api/v1/objects/613a1a5f5dab3700105b56e1`).then(response => {
    //console.log(response.data)
    res.send(response.data)
  }).catch(error => {
    console.log(error)
    res.send(error.response.data)
  })
})

appEX.listen(5000, () =>{
  console.log("server has started on port 5000");
});


//изменить state на 1
appEX.post("/state1", async(req, res) => {
  const { token } = req.body
  
  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = token

  axios.post(`https://dev.rightech.io/api/v1/objects/613a1a5f5dab3700105b56e1/commands/change_state_to_1`).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error.response.data)
  })  

})

//изменить state на 2
appEX.post("/state2", async(req, res) => {
  const { token } = req.body

  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = token

  axios.post(`https://dev.rightech.io/api/v1/objects/613a1a5f5dab3700105b56e1/commands/change_state_to_2`).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error.response.data)
  })  

})

//изменить state на 3
appEX.post("/state3", async(req, res) => {
  const { token } = req.body
  
  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = token

  axios.post(`https://dev.rightech.io/api/v1/objects/613a1a5f5dab3700105b56e1/commands/change_state_to_3`).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error.response.data)
  })  

})

//изменить state на 4
appEX.post("/state4", async(req, res) => {
  const { token } = req.body

  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = token
  
  axios.post(`https://dev.rightech.io/api/v1/objects/613a1a5f5dab3700105b56e1/commands/change_state_to_4`).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error.response.data)
  })  

})

//изменить state на 5
appEX.post("/state5", async(req, res) => {
  const { token } = req.body

  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = token
  
  axios.post(`https://dev.rightech.io/api/v1/objects/613a1a5f5dab3700105b56e1/commands/change_state_to_5`).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error.response.data)
  })  

})

//изменить state на 6
appEX.post("/state6", async(req, res) => {
  const { token } = req.body

  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = token
  
  axios.post(`https://dev.rightech.io/api/v1/objects/613a1a5f5dab3700105b56e1/commands/change_state_to_6`).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error.response.data)
  })  

})


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.