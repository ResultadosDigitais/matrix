import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBarTitle from "../../components/AppBarTitle";
import MenuRoom from "../../components/MenuRoom";
import ShareModal from "../../components/ShareModal";
import { selectRooms, selectSystemSettings } from "../store/selectors";
import { emitLeftMeeting } from "../socket";
import { changeSystemSetting, toggleTheme } from "../store/actions";
import { RoomsPropType, SettingsPropType } from "../store/models";

const RoomAppBar = ({
  onChangeSettings,
  onChangeTheme,
  history,
  match,
  rooms,
  settings
}) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const { roomId } = match.params;
  const findRoomResult = rooms.find(r => r.id === roomId);
  const currentRoomName = findRoomResult ? findRoomResult.name : "";

  return (
    <>
      <AppBarTitle>{currentRoomName}</AppBarTitle>
      <MenuRoom
        onExitRoom={() => {
          emitLeftMeeting();
          history.push("/morpheus");
        }}
        onShare={() => {
          setShareModalOpen(true);
        }}
        onChangeSettings={onChangeSettings}
        onChangeTheme={onChangeTheme}
        settings={settings}
      />
      <ShareModal
        open={isShareModalOpen}
        onClose={() => {
          setShareModalOpen(false);
        }}
      />
    </>
  );
};

RoomAppBar.propTypes = {
  onChangeSettings: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string
    }).isRequired
  }).isRequired,
  settings: SettingsPropType.isRequired,
  rooms: RoomsPropType
};

RoomAppBar.defaultProps = {
  rooms: []
};

const mapStateToProps = state => ({
  rooms: selectRooms(state),
  settings: selectSystemSettings(state)
});

const mapDispatchToProps = {
  onChangeSettings: changeSystemSetting,
  onChangeTheme: toggleTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomAppBar);
