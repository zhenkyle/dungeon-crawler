const connect = ReactRedux.connect;

let Header = function ({onToggleDarknessClick, health, weapon, attack, level, nextLevelExps, dungeonFloor}) {
  return (
    <header className="HolyGrail-header">
      <h1>Dungeon Crawler</h1>
      <h4>Kill the boss in dungeon 4</h4>
      <p><strong>Health:</strong> {health} <strong>Weapon:</strong> {weapon} <strong>Attack:</strong> {attack} <strong>Level:</strong> {level} <strong>Next Level:</strong> {nextLevelExps}XP <strong>Dungeon:</strong> {dungeonFloor} <button onClick={onToggleDarknessClick}>Toggle Darkness</button></p>
    </header>
  );
};
Header.propTypes = {
  onToggleDarknessClick: React.PropTypes.func.isRequired,
  health: React.PropTypes.number.isRequired,
  weapon: React.PropTypes.string.isRequired,
  attack: React.PropTypes.number.isRequired,
  level: React.PropTypes.number.isRequired,
  nextLevelExps: React.PropTypes.number.isRequired,
  dungeonFloor: React.PropTypes.number.isRequired
};

function mapStateToPropsHeader(state) {
  const player = state.game.player;
  return {health: player.health,
          weapon: player.weapon === null ? "" : player.weapon.name,
          attack: player.attack,
          level: player.level,
          nextLevelExps: player.nextLevelExps,
          dungeonFloor: state.game.dungeonFloor
  };
}

function mapDispatchToPropsHeader(dispatch) {
  return {
    onToggleDarknessClick: () => {
      dispatch(toggleDarkness());
    }
  };
}

Header = connect(
  mapStateToPropsHeader,
  mapDispatchToPropsHeader
)(Header);
