import React from "react";
import { Status as StatusBase } from "components/";
import { connect } from "react-redux";

const Status = ({ currentDialogId, user, dialogs }) => {
  const currentDialogObj = dialogs.filter(
    (dialog) => dialog._id === currentDialogId
  )[0];

  if (!currentDialogObj) return null;
  let partner = {};

  if (currentDialogObj?.author?._id === user._id) {
    partner = currentDialogObj.partner;
  } else {
    partner = currentDialogObj?.author;
  }

  if (!partner) return null;

  return <StatusBase online={partner.isOnline} fullname={partner.fullname} />;
};

export default connect(({ dialogs, user }) => ({
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  user: user.data,
}))(Status);
