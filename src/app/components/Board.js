function Board() {
  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td className="room"></td>
          <td className="room"></td>
          <td className="room"></td>
          <td></td>
          <td className="room"></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td className="enemy"></td>
          <td></td>
          <td className="room"></td>
          <td className="player"></td>
          <td className="room"></td>
          <td className="room"></td>
          <td className="room"></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td className="medicine"></td>
          <td></td>
          <td className="room"></td>
          <td className="room"></td>
          <td className="room"></td>
          <td></td>
          <td className="room"></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
