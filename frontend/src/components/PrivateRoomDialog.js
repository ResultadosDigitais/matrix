import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';

class PassForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({ password: event.target.value });
  }
  check(value){
    console.log(value == this.props.pass)
    console.log(value)
    console.log(this.props.pass)
    if (this.state.password == this.props.pass){
      document.getElementById("meetingButton").onclick =  this.props.action
    }else if(document.getElementById("meetingButton") !== null){
      document.getElementById("meetingButton").onclick = ""
    }
  }
  render () {
    const { password } = this.state
    return (
      <div>
         <form>
        
            <TextField 
              autoFocus
              type="password" 
              value={password} 
              onChange={this.handleChange} 
              id="password"
              label="Password"
              fullWidth
            />
        {this.check(this.state.password)}
        </form>
      </div>
    )
  }
}


const PrivateRoomDialog = ({ open, onClose,state,pass,action}) => {
  state = {
    name: ''
  }
return(
 <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Private room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please introduce the password to join {state.name}
          </DialogContentText>
          <PassForm
          pass={pass}
          action = {action}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button id="meetingButton" onClick="" color="primary" >
          Enter meeting
          </Button>
        </DialogActions>
      </Dialog>

);
}
PrivateRoomDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

PrivateRoomDialog.defaultProps = {
  open: false,
  onClose: undefined,
  
};

export default PrivateRoomDialog;