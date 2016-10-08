class BoardCell extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }
  render() {
    let className;
    switch (this.props.data) {
      case SOIL:
        className = null;
        break;
      case SPACE:
        className = "room";
        break;
      case ENEMY:
        className = "enemy";
        break;
      case BOSS:
        className = "enemy";
        break;
      case MEDICINE:
        className = "medicine";
        break;
      case PLAYER:
        className = "player";
        break;
      case WEAPON:
        className = "weapon";
        break;
      case STAIRS:
        className = "stairs";
        break;
      case BLACK:
        className = "black";
        break;
      default:
        className = null;
    }
    return (
      <td className={className}>
      </td>
    );
  }
}
BoardCell.propTypes = {
  data: React.PropTypes.number.isRequired
};
