import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "../stylesheets/app.scss";
import Header from "./Header";
import Footer from "./Footer";
import Preview from "./Preview";
import Form from "./Form";
import Landing from "./Landing";
import localStorage from "../localStorage/";
import { createCardFetch } from "../services/Api";

class App extends Component {
  constructor(props) {
    super(props);
    const localStorageData = localStorage.get("user", {
      photo: "",
      name: "",
      job: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      palette: "1"
    });
    localStorageData.shareButton = "filter";
    localStorageData.url = "";
    localStorageData.isLoading = false;
    localStorageData.errorMessage = "";

    this.state = localStorageData;
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.changeColorBtn = this.changeColorBtn.bind(this);
  }

  inputChangeHandler(data) {
    this.setState({
      [data.id]: data.value,
      url: "",
      errorMessage: ""
    });
    this.changeColorBtn();
  }

  resetHandler() {
    this.setState({
      photo: "",
      name: "",
      job: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      palette: "1",
      url: "",
      shareButton: "filter",
      errorMessage: ""
    });
    this.changeColorBtn();
  }

  changeColorBtn() {
    this.setState(prevState => {
      let newStyle;
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex = /[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}/;
      if (!!prevState.name && !!prevState.job && !!emailRegex.test(prevState.email) && !!prevState.photo && !!prevState.linkedin && !!prevState.github && !!phoneRegex.test(prevState.phone)) {
        newStyle = "";
      } else {
        newStyle = "filter";
      }
      return {
        shareButton: newStyle
      };
    });
  }

  sendRequest(json) {
    this.setState({
      isLoading: true,
      url: ""
    });
    createCardFetch(json)
      .then(data => {
        this.setState({
          url: data.cardURL,
          isLoading: false
        });
        return data.cardURL;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleFetch(ev) {
    ev.preventDefault();
    if (this.state.shareButton === "") {
      this.sendRequest(this.state);
    } else {
      alert("Por favor, cumplimente correctamente todos los campos del formulario");
      this.setState({
        errorMessage: "Por favor, cumplimente correctamente los siguientes campos del formulario:"
      });
    }
  }

  componentDidUpdate() {
    const { name, job, photo, email, github, linkedin, phone, palette } = this.state;
    localStorage.set("user", { name, job, photo, email, github, linkedin, phone, palette });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            path="/create-card"
            render={() => (
              <>
                <Header />
                <main className="main">
                  <Preview resetHandler={this.resetHandler} palette={this.state.palette} photo={this.state.photo} name={this.state.name} job={this.state.job} email={this.state.email} phone={this.state.phone} linkedin={this.state.linkedin} github={this.state.github} />
                  <Form state={this.state} inputChangeHandler={this.inputChangeHandler} handleFetch={this.handleFetch} />
                </main>
              </>
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
