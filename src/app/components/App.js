class App extends React.Component {
  constructor(props) {
    super(props);
    // This line is important!
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    const keyName = event.key;
    switch (keyName) {
      case 'ArrowUp':
        this.props.onDocumentKeyDown(UP);
        break;
      case 'ArrowLeft':
        this.props.onDocumentKeyDown(LEFT);
        break;
      case 'ArrowRight':
        this.props.onDocumentKeyDown(RIGHT);
        break;
      case 'ArrowDown':
        this.props.onDocumentKeyDown(DOWN);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    const {playerAlive, bossAlive} = nextProps;

    let message = "";
    if (!playerAlive) {
      message = "You've been killed, better luck next time.";
    } else if (!bossAlive) {
      message = "Congratulations, you win! Now begin new game.";
    }

    if (!playerAlive || !bossAlive) {
      this.props.onSetMessage(message);
      this.props.onStartNewGame();
    }
  }

  flashMessage() {
    return this.props.message === "" ? <span/> : <div id="note">{this.props.message}</div>;
  }

  render() {
    return (
      <div className="HolyGrail">
        {this.flashMessage()}
        <Header/>
        <div className="HolyGrail-body">
          <main className="HolyGrail-content">
            <ConnPos>
              <Background/>
              <Things/>
              <Ui/>
              <Mask/>
            </ConnPos>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  onDocumentKeyDown: React.PropTypes.func.isRequired,
  onStartNewGame: React.PropTypes.func.isRequired,
  onSetMessage: React.PropTypes.func.isRequired,
  playerAlive: React.PropTypes.bool.isRequired,
  bossAlive: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string.isRequired
};
