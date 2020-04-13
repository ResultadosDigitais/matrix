/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import clsx from "clsx";
import axios from "axios"

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Footer } from "./footer";
import { Logo } from "./logo";
import { Title } from "./title";

import MatrixProfile from "../../profile";
import { isDarkTheme } from "../../morpheus/Themes";

import "bootstrap/dist/css/bootstrap.css";

import styles from "./login.module.css";
import GoogleButton from "./google-button";
import sha1 from "../../util/encrypt"


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: isDarkTheme(),
      error: null,
      isTeacher: false,
      fullName: "",
      roomId: "",
      roomName: "",
      password: "",
      baseURL: "",
      bbbPassword: "",
      secret: "",
      institution: {},
      loginError: false
    };

    this.matrixProfile = new MatrixProfile();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const error = document.getElementById("error").value;
    const isAuthenticated = document.getElementById("isAuthenticated").value;

    if (error) {
      this.setState({ error });
    }

    if (isAuthenticated === "true") {
      this.goToOffice();
    }

    axios.get("/rooms").then(response => {
      this.setState({
        baseURL: response.data.environment.url,
        secret: response.data.environment.secret,
        bbbPassword: response.data.environment.password,
        rooms: response.data.rooms, roomId: response.data.rooms[0].id,
        roomName: response.data.rooms[0].name,
        institution: response.data.institution,
      })
      return response
    })
  }

  onSignIn(profile) {
    this.matrixProfile.storeProfileData(profile);
    this.goToOffice();
  }

  goToOffice() {
    window.location.href = "./morpheus";
  }

  goToGoogleAuth() {
    window.location.href = "./auth/google";
  }

  goToggle() {
    this.setState({ isTeacher: !(this.state.isTeacher) })
  }

  handleSubmit() {
    event.preventDefault()
    try {
      const { fullName, password, roomId, roomName, baseURL, secret, bbbPassword } = this.state

      if (password !== bbbPassword) {
        this.setState({ ...this.state, error: "A senha informada está incorreta" })
        return
      }

      this.setState({ ...this.state, error: null })

      const api = axios.create({ baseURL })

      const createParams = new URLSearchParams({
        meetingID: roomId,
        name: roomName,
        attendeePW: "ap",
        moderatorPW: bbbPassword || "mp",
        muteOnStart: true,
        logoutURL: window.location.href,
      })

      const createChecksum = sha1(`create${createParams.toString()}${secret}`)
      createParams.append("checksum", createChecksum)
      api.get(`/create?${createParams.toString()}`).then(() => {
        const joinParams = new URLSearchParams({
          meetingID: roomId,
          redirect: true,
          password,
          fullName,
        })

        const joinChecksum = sha1(`join${joinParams.toString()}${secret}`)
        joinParams.append("checksum", joinChecksum)

        window.open(`${baseURL}/join?${joinParams.toString()}`)
        this.setState({ fullName: "", password: "", isTeacher: false })
      })
    } catch (e) {
      this.setState({ loginError: true })
      console.log("não foi possível entrar na sala")
    }
  }

  render() {
    const { isDark, error, isTeacher, rooms, fullName, roomId, loginError, institution } = this.state;
    return (
      <div className={styles.containerLogin}>
        <div className={styles.containerForm}>

          <div className="container-fluid">
            <div className="row h-100">
              <div
                className={clsx("col-auto", styles.auth_panel, {
                  [styles.auth_panel_dark]: isDark
                })}
              >
                <div className="h-100 justify-content-center align-items-start py-4">
                  <div className="col text-center py-5">
                    <div className={styles.logoTransform}>
                      <Logo src={institution.logo} />
                    </div>
                    <Title title={institution.slogan} />
                    <hr className={styles.customHr} />
                    {isTeacher ? (
                      <div className={styles.form_login}>
                        <form onSubmit={this.handleSubmit} method="POST">
                          <input
                            type="txt"
                            name="userName"
                            autoFocus
                            value={fullName}
                            onChange={(e) => this.setState({ fullName: e.target.value })}
                            className={styles.form_input}
                            placeholder="Nome completo"
                            required
                          />

                          <div className={styles.select_div}>

                            <select name="listRooms" className={styles.form_select} value={roomId} onChange={(e) => {
                              const selected = e.target.options.selectedIndex
                              this.setState({ roomId: e.target.value, roomName: e.target.options[selected].innerText })
                            }} placeholder="Sala de Aula Virtual" required>
                              {rooms.map((room, index) => {
                                return <option selected={index === 1} value={room.id}>{room.name}</option>
                              })}
                            </select>
                            <ExpandLessIcon className={styles.select_arrow} />
                          </div>

                          <input
                            type="password"
                            name="password"
                            className={styles.form_input}
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            placeholder="Senha Institucional"
                            required />

                          <button type="submit" value="submit" className={styles.btn_login}>Entrar</button>
                        </form>
                      </div>
                    ) : (
                        <GoogleButton
                          isDark={isDark}
                          onClick={() => {
                            this.goToGoogleAuth();
                          }}
                        />
                      )}
                    {error && (
                      <p className={clsx("text-danger", styles.error)}>
                        {error}
                      </p>
                    )}
                    {loginError && (
                      <p className={clsx("text-danger", styles.error)}>
                        Erro ao tentar criar sala, tente novamente!
                      </p>
                    )}

                    {isTeacher ? (
                      <p className={styles.form_link}
                        onClick={() => {
                          this.goToggle();
                        }}>
                        Aluno, faça seu login aqui
                      </p>
                    ) : (
                        <p className={styles.form_link}
                          onClick={() => {
                            this.goToggle();
                          }}>
                          Professor, faça seu login aqui
                        </p>
                      )}

                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.containerBackground} style={{ backgroundImage: `url(${institution.background || "/images/bg.svg"})` }} />
      </div>
    );
  }
}
