import axios from "axios";
import qs from "qs";



export const userstore = {
  state: {
    users: [],
    err: null,
    msg: null
  },
  debug: "",
  scan() {
    return axios
      .get("/users", null)
      .then(res => {
        this.state.users = res.data.Items;
        this.state.err = null
        this.state.msg = `found ${this.state.users.length} items`
      })
      .catch(err => {
        this.state.err = err
        this.state.msg = null

        this.state.users = []
      });


  },
  getUser(loginName) {
    return this.state.users.filter(x => x.login = loginName)[0]
  },
  getState() {
    return this.state
  },
  createUser(loginName) {
    axios
      .post(`/users/${loginName}`)
      .then(res => {
        if (res.data.err) {
          this.state.err = JSON.stringify(res.data.err.message);
        } else {
          this.state.msg = "succesfully create User :" + loginName + " ";
          this.state.err = null;
          this.state.users.push({
            login: loginName,
            version: 0
          })
        }
      })
      .catch(err => {
        if (err) {
          this.state.err = "unable to connect to server " + JSON.stringify(err);
          this.state.msg = "unable to connect to server " + JSON.stringify(err);
        }
      });
  },
  deleteUser(loginName) {

    axios
      .delete(`/users/${loginName}`)
      .then(res => {
        if (res.data.err) {
          this.state.err = JSON.stringify(res.data.err.message);
        } else {
          this.state.msg = "succesfully Delete User :" + loginName + " ";
          this.state.err = null;
          this.state.users = this.state.users.filter(x => x.login != loginName)
        }
      })
      .catch(err => {
        if (err) {
          this.errmsg = "unable to connect to server " + JSON.stringify(err);
        }
      });
  },
  updatePwd(login, newpwd) {
    const user = this.state.users.filter(x => x.login == login)[0];
    let data = {
      pwd: newpwd,
      version: user.version
    };
    axios
      .put(`/users/${login}/pwd`, qs.stringify(data))
      .then(res => {
        if (res.data.err) {
          this.state.err = JSON.stringify(res.data.err.message);
        } else {
          this.state.msg = "Password updated for " + login + " "
          this.state.err = null
          this.state.users = this.state.users.map(u => {
            if (u.login != login) {
              return u
            } else {
              u.pwd = newpwd
              u.version += 1
              return u
            }
          })
        }
      })
      .catch(err => {
        if (err) {
          this.state.err = "unable to connect to server " + JSON.stringify(err);
          this.state.msg = null
        }
      });
  },
  updatePrivilege: function (login, newAppList) {
    let _this = this
    let data = this.state.users.filter(x => x.login == login)[0]
    data.applicationList = newAppList
    data.version
    axios
      .put(`/users/${login}/application`, data)
      .then((res) => {
        if (res.data.err) {
          this.state.err = JSON.stringify(res.data.err.message);
        } else {
          this.state.msg = `Password privilege for ${login} updated`
          this.state.err = null
          this.state.users = this.state.users.map(u => {
            if (u.login != login) {
              return u
            } else {
              u.userApplication = newAppList
              u.version += 1
              return u
            }
          })
        }
      })
      .catch((response) => {
        _this.state.err = "unable to connect to server " + JSON.stringify(response);
        _this.state.msg = null
      });

  },
  updateDetails: function (login, newDetails) {
    let _this = this
    let data = this.state.users.filter(x => x.login == login)[0]
    data.details = newDetails
    data.version
    axios
      .put(`/users/${login}/details`,data)
      .then((res) => {
        if (res.data.err) {
          this.state.err = JSON.stringify(res.data.err.message);
        } else {
          this.state.msg = "details updated for " + login + " "
          this.state.err = null
          this.state.users = this.state.users.map(u => {
            if (u.login != login) {
              return u
            } else {
              u.details = newDetails
              u.version += 1
              return u
            }
          })
        }
      })
      .catch((response) => {
        _this.state.err = "unable to connect to server " + JSON.stringify(response);
        _this.state.msg = null
      });

  }

}