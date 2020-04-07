/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import clsx from "clsx";

import { Footer } from "./footer";
import { Logo } from "./logo";
import { Title } from "./title";

import MatrixProfile from "../../profile";
import { isDarkTheme } from "../../morpheus/Themes";

import "bootstrap/dist/css/bootstrap.css";

import styles from "./login.module.css";
import GoogleButton from "./google-button";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: isDarkTheme(),
      error: null,
      isTeacher: false,
      fullName: "",
      roomId: "",
      password: "",
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
    this.setState({ isTeacher: !(this.state.isTeacher)})
  }

  handleSubmit() {
    alert( this.state.fullName, this.state.roomId, this.state.password)
    event.preventDefault();
    console.log("event",event)
    console.log(this.state.fullName)
    console.log(this.state.roomId)
    console.log(this.state.password)
  }

  render() {
    const { isDark, error, isTeacher } = this.state;
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
                          <Logo />
                        </div>
                      <Title />
                      <hr className={styles.customHr} />
                      {isTeacher ? (
                        <div className={styles.form_login}>
                          <form onSubmit={this.handleSubmit}>
                          <input type="txt" name="userName" autoFocus value={this.state.fullName} onChange={(e) => this.setState({ fullName: e.target.value })} className={styles.form_input} placeholder="Nome completo" required />
                          <div className={styles.select_div}>
                          <select name="listRooms" className={styles.form_select} value={this.state.roomId} onChange={(e) => this.setState({ roomId: e.target.value })} placeholder="Sala de Aula Virtual" required>
                            <option value="teste" selected default>Teste</option>
                            <option value="teste">Teste</option>
                            <option value="teste">Teste</option>
                          </select>
                          <ExpandLessIcon className={styles.select_arrow} />
                          </div>
                          <input type="password" name="userPassword" className={styles.form_input} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Senha Institucional" required />
                          <button type="submit" value="submit" className={styles.btn_login}>Entrar</button>
                          </form>
                        </div>
                      ) : (
                        <>
                          <GoogleButton
                          isDark={isDark}
                          onClick={() => {
                            this.goToGoogleAuth();
                          }}
                          />
                        {error && (
                          <p className={clsx("text-danger", styles.error)}>
                          {error}
                          </p>
                        )}
                      </>
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
        <div className={styles.containerBackground } />
      </div>
    );
  }
}
