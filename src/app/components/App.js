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

  render() {
    return (
      <div className="HolyGrail">
        <Header/>
        <div className="HolyGrail-body">
          <main className="HolyGrail-content">
            <Background/>
            <Things/>
            <Ui/>
            <Mask/>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  onDocumentKeyDown: React.PropTypes.func.isRequired
};
