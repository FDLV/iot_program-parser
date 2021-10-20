import React from 'react';
import './App.css';
// import Header from "./components/Header"
// import Main from "./components/Main"
// import Footer from "./components/Footer"
import VacuumCleanerConnectiion from "./components/VacuumCleanerConnectiion"


const ConnectionError = {
  textAlign: "center",
  height: "85px",
  padding: "20px",
  fontSize: "32px"
}

const AuthText = {
  fontSize: "32px",
  height: "32px",
  padding: "10px",
  textAlign: "center",
}

const AuthForm = {
  width: "100%",
  height: "calc(100vh - 52px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const LoginStyle = {
  margin: "25vh 10px 10px 10px",
  width: "300px",
  height: "30px",
  fontSize: "16px"
}

const PasswordStyle = {
  margin: "0 10px 20px 10px",
  width: "300px",
  height: "30px",
  fontSize: "16px"
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ColorBackground: "red",
      connection: false,
      auth: 2,
      dust_container_available_volume: 0,
      battery: 0,
      vacuum_cleaner_state: 0,
      text: "",
      SlideShowText: "Тихая уборка",
      PlayButton: false,
      ButtonPressed: false,
      charging: false

    }

    this.ClickDown = this.ClickDown.bind(this)
    this.ClickUp = this.ClickUp.bind(this)
    this.Authorisation = this.Authorisation.bind(this)
    this.CheckToken = this.CheckToken.bind(this)
    this.PlayPause = this.PlayPause.bind(this)
    this.UpdateText = this.UpdateText.bind(this)    
    this.UpdateSlideShowText = this.UpdateSlideShowText.bind(this)    
    this.UpdateButtonPressed = this.UpdateButtonPressed.bind(this)    
    this.StopTimer = this.StopTimer.bind(this)    
    this.StartTimer = this.StartTimer.bind(this)    
    this.UpdateCharging = this.UpdateCharging.bind(this)    

  }

  UpdateCharging(value) {
    let self = this
    self.setState({ charging: value });
  }

  UpdateButtonPressed() {
    let self = this
    self.setState({ ButtonPressed: false });
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      let self = this
    console.log(localStorage.getItem('token'))
    
    if (localStorage.getItem('token') !== "") {
      
      const GetResult = function (url, cb) {
        const xhr = new XMLHttpRequest()
        xhr.open(`post`, `http://localhost:5000/object`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
          
        xhr.addEventListener(`load`, cb);
  
        xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
      }
  
      GetResult(`http://localhost:5000/object`, function (em) {
        console.log("Ответ перед рендерингом")
        //console.log(em.currentTarget.response)
        if (JSON.parse(em.currentTarget.response).success === true) {
          console.log("Токен действителен")
          self.setState({ auth: 1 });

          console.log(JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state)

          if (JSON.parse(em.currentTarget.response).state.online === true) {

            if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 1) {
              self.setState({
                 text: "тихая уборка",
                 connection: true,
                 charging: false,
                 battery: JSON.parse(em.currentTarget.response).state.battery,
                 dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              //Добавлено; надо проверить. Режимы надо отдельно запускать. Единожды
              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer1_ChangeStateTo1 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state1`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer1_ChangeStateTo1(`http://localhost:5000/state1`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }
              else {
                self.setState({PlayButton: true})                

              }




            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 2) {
              self.setState({
                  text: "стандартная уборка",
                  connection: true,
                  PlayButton: true,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer1_ChangeStateTo2 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state2`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer1_ChangeStateTo2(`http://localhost:5000/state2`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }



            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 3) {
              self.setState({
                  text: "интенсивная уборка",
                  connection: true,
                  PlayButton: true,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer1_ChangeStateTo3 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state3`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer1_ChangeStateTo3(`http://localhost:5000/state3`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }


            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 4) {
              self.setState({
                  text: "зарядка",
                  connection: true,
                  PlayButton: true,
                  charging: true,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer1_ChangeStateTo4 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state4`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer1_ChangeStateTo4(`http://localhost:5000/state4`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }


            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 5) {
              self.setState({
                  text: "возвращение на зарядку",
                  connection: true,
                  PlayButton: false,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer1_ChangeStateTo5 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state5`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer1_ChangeStateTo5(`http://localhost:5000/state5`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }



            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 6) {
              self.setState({
                  text: "выключен",
                  connection: true,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer1_ChangeStateTo6 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state6`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer1_ChangeStateTo6(`http://localhost:5000/state6`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }
              else {
                self.setState({PlayButton: false})                

              }


            }

            self.setState({ vacuum_cleaner_state: JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state })

          }
          else {
            console.log("Пылесос выключен")
            self.setState({ connection: false, vacuum_cleaner_state: 0 });
          }

        }
        else {
          console.log("Токен истёк")
          localStorage.setItem('token', "")
          self.setState({ auth: 0 });
        }

      })
    } else {
      console.log("Токен не существует")
      localStorage.setItem('token', "")
      self.setState({ auth: 0 });

    }
    }, 2500);    
  }

  StopTimer() {
    clearInterval(this.interval);
  }

  StartTimer() {
    this.interval = setInterval(() => {
      let self = this
    console.log(localStorage.getItem('token'))
    
    if (localStorage.getItem('token') !== "") {
      
      const GetResult = function (url, cb) {
        const xhr = new XMLHttpRequest()
        xhr.open(`post`, `http://localhost:5000/object`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
          
        xhr.addEventListener(`load`, cb);
  
        xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
      }
  
      GetResult(`http://localhost:5000/object`, function (em) {
        console.log("Ответ перед рендерингом")
        //console.log(em.currentTarget.response)
        if (JSON.parse(em.currentTarget.response).success === true) {
          console.log("Токен действителен")
          self.setState({ auth: 1 });

          console.log(JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state)

          if (JSON.parse(em.currentTarget.response).state.online === true) {

            if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 1) {
              self.setState({
                 text: "тихая уборка",
                 connection: true,
                 charging: false,
                 battery: JSON.parse(em.currentTarget.response).state.battery,
                 dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              //Добавлено; надо проверить. Режимы надо отдельно запускать. Единожды
              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer2_ChangeStateTo1 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state1`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer2_ChangeStateTo1(`http://localhost:5000/state1`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }





            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 2) {
              self.setState({
                  text: "стандартная уборка",
                  connection: true,
                  PlayButton: true,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer2_ChangeStateTo2 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state2`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer2_ChangeStateTo2(`http://localhost:5000/state2`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }



            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 3) {
              self.setState({
                  text: "интенсивная уборка",
                  connection: true,
                  PlayButton: true,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer2_ChangeStateTo3 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state3`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer2_ChangeStateTo3(`http://localhost:5000/state3`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }


            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 4) {
              self.setState({
                  text: "зарядка",
                  connection: true,
                  PlayButton: true,
                  charging: true,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer2_ChangeStateTo4 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state4`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer2_ChangeStateTo4(`http://localhost:5000/state4`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }


            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 5) {
              self.setState({
                  text: "возвращение на зарядку",
                  connection: true,
                  PlayButton: false,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer2_ChangeStateTo5 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state5`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer2_ChangeStateTo5(`http://localhost:5000/state5`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }


            }
            else if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 6) {
              self.setState({
                  text: "выключен",
                  connection: true,
                  charging: false,
                  battery: JSON.parse(em.currentTarget.response).state.battery,
                  dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state !== self.state.vacuum_cleaner_state) {
                const Timer2_ChangeStateTo6 = function (url, cb) {
                  const xhr = new XMLHttpRequest()
                  xhr.open(`post`, `http://localhost:5000/state6`)
                  xhr.setRequestHeader('Content-Type', 'application/json')
                  xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
                    
                  xhr.addEventListener(`load`, cb);
            
                  xhr.send(JSON.stringify({token: localStorage.getItem('token')}))
                }

                Timer2_ChangeStateTo6(`http://localhost:5000/state6`, function (et) {
                  console.log(JSON.parse(em.currentTarget.response))
                })
              }
              else {
                self.setState({PlayButton: false})                

              }


            }

            self.setState({ vacuum_cleaner_state: JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state })

          }
          else {
            console.log("Пылесос выключен")
            self.setState({ connection: false, vacuum_cleaner_state: 0 });
          }

        }
        else {
          console.log("Токен истёк")
          localStorage.setItem('token', "")
          self.setState({ auth: 0 });
        }

      })
    } else {
      console.log("Токен не существует")
      localStorage.setItem('token', "")
      self.setState({ auth: 0 });

    }
    }, 2500);   
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  CheckToken() {
    let self = this
    if (localStorage.getItem('token') !== "") {

      const GetResult = function (url, cb) {
        const xhr = new XMLHttpRequest()
        xhr.open(`post`, `http://localhost:5000/object`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
        
        let token = localStorage.getItem('token');
  
        xhr.addEventListener(`load`, cb);
  
        xhr.send(JSON.stringify({token: token}))
      }
  
      GetResult(`http://localhost:5000/object`, function (em) {
        console.log("Ответ от функции checktoken")
        console.log(JSON.parse(em.currentTarget.response).success)

        if (JSON.parse(em.currentTarget.response).success === true) {
          self.setState({ auth: 1 });

          if (JSON.parse(em.currentTarget.response).botEnabled === true) {
            console.log("Пылесос включен")
            self.setState({ connection: true });
  
          }
          else {
            console.log("Пылесос выключен")
            self.setState({ connection: false });
          }
          
        }
        else {
          localStorage.setItem('token', "")
          self.setState({ auth: 0 });
        }

      })

    } else {
        self.setState({ auth: 0 });
        localStorage.setItem('token', "")
    }
  }

  Authorisation() {
    let self = this
    console.log("Авторизация")
    self.CheckToken()

    console.log(localStorage.getItem('token'))
    const LoadData = function (url, cb) {
      const xhr = new XMLHttpRequest()
      xhr.open(`post`, `http://localhost:5000/`)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('Access-Control-Allow-Origin', 'dev.rightech.io');
      
      let login = document.getElementById("login").value;
      let password = document.getElementById("password").value;

      xhr.addEventListener(`load`, cb);

      xhr.send(JSON.stringify({login: login, password: password}))
    }

    LoadData(`http://localhost:5000/`, function (e) {
    console.log(JSON.parse(e.currentTarget.response).success)
    //console.log(e.currentTarget.response.token)
      if (JSON.parse(e.currentTarget.response).success === false) {
        self.setState({ auth: 0 });
        localStorage.setItem('token', "")
      }
      else {
        localStorage.setItem('token', "Bearer "+JSON.parse(e.currentTarget.response).token)
        self.setState({ auth: 1 });
      }
    })
  }


  PlayPause() {
    if (this.state.PlayButton) {
        this.setState({ PlayButton: false });
    }
    else {
        this.setState({ PlayButton: true });
    }
  }

  UpdateText(value) {
    this.setState({ text: value });
}

UpdateSlideShowText(value) {
  this.setState({ SlideShowText: value });
}




  ClickDown() {
    this.setState({ ColorBackground: "orange" });
  }

  ClickUp() {
    this.setState({ ColorBackground: "red" });
  }

  render() {
    console.log(this.state.auth)
    if (this.state.auth === 1) {
      if (this.state.connection) {
        return (
          <div>
            КНОПКА!
            {/* <Header charging={this.state.charging} battery={this.state.battery}/>
            <Main UpdateCharging={this.UpdateCharging} StartTimer={this.StartTimer} StopTimer={this.StopTimer} text={this.state.text} SlideShowText={this.state.SlideShowText} PlayPause={this.PlayPause} UpdateSlideShowText={this.UpdateSlideShowText} UpdateText={this.UpdateText} PlayButton={this.state.PlayButton}/>
            <Footer volume={this.state.dust_container_available_volume}/> */}
          </div>
        );
      }
      else {
        return (
          <div>
            <div style={ConnectionError}>
              ОШИБКА СОЕДИНЕНИЯ
            </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="75vh"
                width="100%"
                enableBackground="new 0 0 502 502"
                version="1.1"
                viewBox="-250 -200 1400 1400"
                xmlSpace="preserve"
              >
                <path fill="none" d="M-1 -1H581V401H-1z"></path>
                <g>
                  <g fill={this.state.ColorBackground}>
                    <circle cx="385.6" cy="656.1" r="79.8"></circle>
                    <path d="M561.7 401c-15.801-10.3-32.601-19.2-50.2-26.6-39.9-16.9-82.3-25.5-126-25.5-44.601 0-87.9 8.9-128.6 26.6-39.3 17-74.3 41.3-104.1 72.2L253.5 545c34.899-36.1 81.8-56 132-56 49 0 95.1 19.1 129.8 53.8l25.4-25.399L493 469.7l68.7-68.7z"></path>
                    <path d="M385.6 267.1c107.601 0 208.9 41.7 285.3 117.4l98.5-99.5c-50-49.5-108.1-88.4-172.699-115.6-66.9-28.1-138-42.4-211.101-42.4-73.6 0-145 14.4-212.3 42.9C108.3 197.4 50 236.7 0 286.8l99 99c76.5-76.501 178.3-118.7 286.6-118.7z"></path>
                    <path d="M616.8 402.5L549.7 469.599 639.2 559.099 549.7 648.599 616.8 715.7 706.3 626.2 795.8 715.7 862.899 648.599 773.399 559.099 862.899 469.599 795.8 402.5 706.3 492z"></path>
                  </g>
                </g>
              </svg>
          </div>        
        );
      }
    }
    else if (this.state.auth === 0) {
      return (
        <div>
          <div style={AuthText}>
            АВТОРИЗАЦИЯ
          </div>
          <div style={AuthForm}>
            <input id="login" style={LoginStyle} type="text" placeholder="Логин"/>
            <input id="password" style={PasswordStyle} type="password" placeholder="Пароль"/>
            <div className="container">
              <button onClick={()=>{this.Authorisation()}} className="animated-word">ПОДКЛЮЧИТЬСЯ</button>
            </div>            
          </div>          
        </div>
      );
    }
    else if (this.state.auth === 2) {
      return (
        <div>
          <VacuumCleanerConnectiion />
        </div>
      )
    }
  }
}

export default App;
