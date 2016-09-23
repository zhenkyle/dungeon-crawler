function BoardCell({data, actions}) {
  let className;
  switch (data) {
    case SOIL:
      className = null;
      break;
    case SPACE:
      className = "room";
      break;
    case ENEMY:
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
    default:
      className = null;
  }
  return (
    <td className={className}>
    </td>
  );
}
BoardCell.propTypes = {
  data: React.PropTypes.number.isRequired,
  actions: React.PropTypes.object.isRequired
};

function BoardRow({data, actions}) {
  return (
    <tr>
    {data.map((v, i) =>
      <BoardCell key={i} data={v} actions={actions}/>
    )}
    </tr>
  );
}
BoardRow.propTypes = {
  data: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

function Board({data, actions}) {
  return (
    <table>
      <tbody>
      {data.map((v, i) =>
        <BoardRow key={i} data={v} actions={actions}/>
      )}
      </tbody>
    </table>
  );
}
Board.propTypes = {
  data: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};
