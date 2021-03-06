import React from 'react';
import './App.css';
import VacuumCleanerConnectiion from "./components/VacuumCleanerConnectiion"
import FileSaver from 'file-saver';


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

const SaveButtonDiv = {
  textAlign: "center",
  marginTop: "7vh",
}

const SaveButton = {
  fontSize: "2em"
}

const SaveButtonMArginTop = {
  marginTop: "40px",
  fontSize: "2em"
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
      PlayButton: false,
      charging: false,
      PARSdust_container_available_volume: 0,
      PARSbattery: 0,
      PARSvacuum_cleaner_state: 0

    }

    this.Authorisation = this.Authorisation.bind(this)
    this.CheckToken = this.CheckToken.bind(this)
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
        console.log("?????????? ?????????? ??????????????????????")
        //console.log(em.currentTarget.response)
        if (JSON.parse(em.currentTarget.response).success === true) {
          console.log("?????????? ????????????????????????")
          self.setState({ auth: 1 });

          console.log(JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state)

          if (JSON.parse(em.currentTarget.response).state.online === true) {

            if (JSON.parse(em.currentTarget.response).state.vacuum_cleaner_state === 1) {
              self.setState({
                 text: "?????????? ????????????",
                 connection: true,
                 charging: false,
                 battery: JSON.parse(em.currentTarget.response).state.battery,
                 dust_container_available_volume: JSON.parse(em.currentTarget.response).state.dust_container_available_volume,
              })

              //??????????????????; ???????? ??????????????????. ???????????? ???????? ???????????????? ??????????????????. ????????????????
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
                  text: "?????????????????????? ????????????",
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
                  text: "?????????????????????? ????????????",
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
                  text: "??????????????",
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
                  text: "?????????????????????? ???? ??????????????",
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
                  text: "????????????????",
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
            console.log("?????????????? ????????????????")
            self.setState({ connection: false, vacuum_cleaner_state: 0 });
          }

        }
        else {
          console.log("?????????? ??????????")
          localStorage.setItem('token', "")
          self.setState({ auth: 0 });
        }

      })
    } else {
      console.log("?????????? ???? ????????????????????")
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
        console.log("?????????? ???? ?????????????? checktoken")
        console.log(JSON.parse(em.currentTarget.response).success)

        if (JSON.parse(em.currentTarget.response).success === true) {
          self.setState({ auth: 1 });

          if (JSON.parse(em.currentTarget.response).botEnabled === true) {
            console.log("?????????????? ??????????????")
            self.setState({ connection: true });
  
          }
          else {
            console.log("?????????????? ????????????????")
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
    console.log("??????????????????????")
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

  SaveFilesJSON() {
    var blob = new Blob([
      "{\n  \"dust_container_available_volume\": "+this.state.dust_container_available_volume+
      ",\n  \"battery\": "+this.state.battery+
      ",\n  \"vacuum_cleaner_state\": "+this.state.vacuum_cleaner_state+"\n}"
    ], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "Data.json");
  }

  SaveFilesHTML() {
    var blob = new Blob([
      "<table>\n<thead>\n<tr>\n<td>dust_container_available_volume</td>\n<td>battery</td>\n<td>vacuum_cleaner_state</td>\n</tr>\n</thead>\n<tr>\n<td>"
      +this.state.dust_container_available_volume+"</td>\n<td>"
      +this.state.battery+"</td>\n<td>"
      +this.state.vacuum_cleaner_state+"</td>\n</tr>\n<tr>\n<td></td>\n</tr>\n</table>\n"
    ], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "Data.html");
  }

  SaveFilesXML() {
    var blob = new Blob([
      "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<root>\n  <dust_container_available_volume>"
      +this.state.dust_container_available_volume+"</dust_container_available_volume>\n  <battery>"
      +this.state.battery+"</battery>\n  <vacuum_cleaner_state>"
      +this.state.vacuum_cleaner_state+"</vacuum_cleaner_state>\n</root>"
    ], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "Data.xml");
  }

  ParseFiles() {
 
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 

      let file = e.target.files[0]; 
   
      let reader = new FileReader();
      reader.readAsText(file,'UTF-8');
   
      reader.onload = readerEvent => {
         let content = readerEvent.target.result;
         if (file.type === "text/html") {
          let htmlObject = document.createElement('div');
          htmlObject.innerHTML = content;

          console.log(htmlObject.getElementsByTagName("td")[3].textContent)
          console.log(htmlObject.getElementsByTagName("td")[4].textContent)
          console.log(htmlObject.getElementsByTagName("td")[5].textContent)

          this.setState({ 
            PARSdust_container_available_volume: htmlObject.getElementsByTagName("td")[3].textContent,
            PARSbattery: htmlObject.getElementsByTagName("td")[4].textContent,
            PARSvacuum_cleaner_state: htmlObject.getElementsByTagName("td")[5].textContent
          });
         }
         else if (file.type === "text/xml") {
          let parser = new DOMParser();
          let xmlDOM = parser.parseFromString(content, 'application/xml');
          console.log(xmlDOM.querySelectorAll('dust_container_available_volume')[0].textContent)
          console.log(xmlDOM.querySelectorAll('battery')[0].textContent)
          console.log(xmlDOM.querySelectorAll('vacuum_cleaner_state')[0].textContent)


          this.setState({ 
            PARSdust_container_available_volume: xmlDOM.querySelectorAll('dust_container_available_volume')[0].textContent,
            PARSbattery: xmlDOM.querySelectorAll('battery')[0].textContent,
            PARSvacuum_cleaner_state: xmlDOM.querySelectorAll('vacuum_cleaner_state')[0].textContent
          });
         }
         else if (file.type === "application/json") {
           let jsonData = JSON.parse(content)

           console.log(jsonData.dust_container_available_volume)
           console.log(jsonData.battery)
           console.log(jsonData.vacuum_cleaner_state)

           this.setState({ 
            PARSdust_container_available_volume: jsonData.dust_container_available_volume,
            PARSbattery: jsonData.battery,
            PARSvacuum_cleaner_state: jsonData.vacuum_cleaner_state
          });

         }
      }
   
   }

    input.click();
   
  }

  render() {
    console.log(this.state.auth)
    if (this.state.auth === 1) {
      if (this.state.connection) {
        return (
          <div style={SaveButtonDiv}>
            <button style={SaveButton} onClick={() => {this.SaveFilesJSON()}}>
              ?????????????????? ???????????? ?? ?????????????? JSON
            </button>
            <br></br>
            <button style={SaveButtonMArginTop} onClick={() => {this.SaveFilesHTML()}}>
              ?????????????????? ???????????? ?? ?????????????? HTML
            </button>
            <br></br>
            <button style={SaveButtonMArginTop} onClick={() => {this.SaveFilesXML()}}>
              ?????????????????? ???????????? ?? ?????????????? XML
            </button>
            <br></br>
            <br></br>
            <br></br>
            <button style={SaveButtonMArginTop} onClick={() => {this.ParseFiles()}}>
              ?????????????? ???????????? ???? ??????????
            </button>
            <br></br>
            <br></br>
            <br></br>
            <div>?????????????????? ?????????????????????? ????????????:</div>
              ?????????? = {this.state.PARSdust_container_available_volume}&#8288;
              ?????????????? = {this.state.PARSbattery}&#8288;
              ?????????????????? = {this.state.PARSvacuum_cleaner_state}&#8288;
          </div>
        );
      }
      else {
        return (
          <div>
            <div style={ConnectionError}>
              ???????????? ????????????????????
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
            ??????????????????????
          </div>
          <div style={AuthForm}>
            <input id="login" style={LoginStyle} type="text" placeholder="??????????"/>
            <input id="password" style={PasswordStyle} type="password" placeholder="????????????"/>
            <div className="container">
              <button onClick={()=>{this.Authorisation()}} className="animated-word">????????????????????????</button>
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
