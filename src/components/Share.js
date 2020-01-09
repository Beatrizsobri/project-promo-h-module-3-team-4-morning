import React from "react";
import "../stylesheets/share.scss";

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: "hidden"
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(ev) {
    ev.preventDefault();

    // this.setState({
    //   hidden: ""
    // });
  }

  render() {
    return (
      <fieldset className="share">
        <button onClick={this.props.fetchFunction} type="submit" className="share__btn ">
          <i className="far fa-address-card share__icon"></i>Crear tarjeta
        </button>
        <fieldset className={`twitter ${this.state.hidden}`}>
          <h2 className="twitter__title">La tarjeta ha sido creada:</h2>
          <a className="twitter__link " href=""></a>
          <button className="twitter__button ">
            <a href="" target="_blank" className="twitter__link2 " />
            <i className="twitter__button--icon fab fa-twitter"></i>Compartir en Twitter
          </button>
        </fieldset>
      </fieldset>
    );
  }
}

export default Share;
