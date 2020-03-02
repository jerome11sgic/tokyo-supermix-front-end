import React from "react";
import { Layout, Icon, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { NavigationLink } from "../styledcomponents/Link/NavLink";
import "./style.css";
import { connect } from "react-redux";
import {
  TOGGLE_TO_HOME_SCREEN_NAVIGATION,
  TOGGLE_TO_DASHBOARD_NAVIGATION
} from "../../redux/action/topbarnavigation/TopbarNavigation";
import { TopNavMenu } from "../styledcomponents/topnavigation/TopnavMenu";
import {
  TOGGLE_BETWEEN_MASTER_LEVELS,
  CHECK_WHETHER_DEFAULT_MASTER_LEVEL
} from "../../redux/action/topbarnavigation/MasterLevelNavigation";
import { TOGGLE_BETWEEN_PRIVILEDGE_LEVELS } from "../../redux/action/topbarnavigation/PrivilegeLevelNavigation";
// import ProfileImg from "../../assets/avatarui.jpg";
//import './Dashboard.css';
// const Search = Input.Search;
const { Header } = Layout;

class HeaderComponent extends React.Component {
  state = {
    masterbgcolor: "blue",
    mastercolor: "white"
  };

  // componentDidMount() {
  //   this.props.navigationRefresh();

  //   if (this.props.masterkeys === "plantlevel") {
  //     console.log("plant");
  //   } else {
  //     console.log("fail");
  //   }
  // }

  // componentWillMount() {
  //   this.props.navigationRefresh();
  // }

  //temporary avatar hiding problem
  // resolveAvatarHideAndSeek() {
  //   if (window.screen.height > 767) {
  //     console.log("seeked");
  //     console.log(window);
  //   }
  // }

  //conditional navigation renderer using redux
  renderNavigation = () => {
    if (this.props.navpath === "/master") {
      return (
        <TopNavMenu
          theme='dark'
          mode='horizontal'
          position='right'
          defaultSelectedKeys={["100"]}
          selectedKeys={this.props.masterkeys}
          onClick={this.props.toggleBetweenMasterLevels}
        >
          <NavigationLink to='#' style={{ cursor: "default" }}>
            <div className='logo' />
          </NavigationLink>

          <NavigationLink to='/' style={{ marginLeft: "10px" }}>
            <div className='homebtn' />
          </NavigationLink>

          {/* <SubMenu
            key='1'
            title={
              <span className='submenu-title-wrapper'>
                <Icon type='dropbox' /> Plant
              </span>
            }
          /> */}
          <Menu.Item
            key='plantlevel'
            style={{
              marginLeft: "8px"
            }}
          >
            <NavigationLink to='/master/plantlevel'>
              <Icon type='dropbox' />
              <span>Plant</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='categorylevel' style={{}}>
            <NavigationLink to='/master/categorylevel'>
              <Icon type='dropbox' /> <span>Category</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='unitlevel' style={{}}>
            <NavigationLink to='/master/unitlevel'>
              <Icon type='dropbox' /> <span>Unit</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='materiallevel' style={{}}>
            <NavigationLink to='/master/materiallevel'>
              <Icon type='dropbox' /> <span>Material</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='equipmentlevel' style={{}}>
            <NavigationLink to='/master/equipmentlevel'>
              <Icon type='dropbox' /> <span>Equipment</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='testlevel' style={{}}>
            <NavigationLink to='/master/testlevel'>
              <Icon type='dropbox' /> <span>Test</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='parameterlevel' style={{}}>
            <NavigationLink to='/master/parameterlevel'>
              <Icon type='dropbox' /> <span>Parameter</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='mixdesignlevel' style={{}}>
            <NavigationLink to='/master/mixdesignlevel'>
              <Icon type='dropbox' /> <span>Mix Design</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='sitelevel' style={{}}>
            <NavigationLink to='/master/sitelevel'>
              <Icon type='dropbox' /> <span>Site</span>
            </NavigationLink>
          </Menu.Item>

          <div className='master_logo_gap' />
          <SubMenu
            key='masterprofilemenu'
            title={
              <span className='submenu-title-wrapper'>
                <Avatar size='large'>
                  <Icon
                    type='user'
                    style={{
                      fontSize: "24px",
                      textAlign: "center",
                      padding: "2px",
                      margin: "4px"
                    }}
                  ></Icon>
                </Avatar>
              </span>
            }
          >
            <Menu.Item key='masterprofilesetting'>
              <Link to='/profile'>
                <Icon type='user' />
                Profile Setting
              </Link>
            </Menu.Item>
            <Menu.Item key='masterprofilelogout'>
              <Link to='/logout'>
                <Icon type='logout' theme='outlined' twoToneColor />
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </TopNavMenu>
      );
    } else if (this.props.navpath === "/samples") {
      return (
        <TopNavMenu
          theme='dark'
          mode='horizontal'
          position='right'
          defaultSelectedKeys={["1"]}
        >
          <NavigationLink to='#' style={{ cursor: "default" }}>
            <div className='logo' />
          </NavigationLink>

          <NavigationLink to='/' style={{ marginLeft: "10px" }}>
            <div className='homebtn' />
          </NavigationLink>

          <div className='samples_logo_gap' />
          <SubMenu
            key='sprof'
            title={
              <span className='submenu-title-wrapper'>
                <Avatar size='large'>
                  <Icon
                    type='user'
                    style={{
                      fontSize: "24px",
                      textAlign: "center",
                      padding: "2px",
                      margin: "4px"
                    }}
                  ></Icon>
                </Avatar>
              </span>
            }
          >
            <Menu.Item key='sprof1'>
              <Link to='/profile'>
                <Icon type='user' />
                Profile Setting
              </Link>
            </Menu.Item>
            <Menu.Item key='sprof2'>
              <Link to='/logout'>
                <Icon type='logout' theme='outlined' twoToneColor />
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </TopNavMenu>
      );
    } else if (this.props.navpath === "/homescreen") {
      return (
        <TopNavMenu
          theme='dark'
          mode='horizontal'
          position='right'
          defaultSelectedKeys={["0"]}
        >
          <NavigationLink to='/'>
            <div className='logo' />
          </NavigationLink>
          <SubMenu
            key={"1"}
            title={
              <span className='submenu-title-wrapper'>
                <NavigationLink
                  to='/dashboard'
                  onClick={this.props.toggleDashboard}
                >
                  <Icon type='pie-chart' /> Dashboard
                </NavigationLink>
              </span>
            }
          />
          <div className='homescreen_logo_gap' />
          <SubMenu
            title={
              <span className='submenu-title-wrapper'>
                <Avatar size='large'>
                  <Icon
                    type='user'
                    style={{
                      fontSize: "24px",
                      textAlign: "center",
                      padding: "2px",
                      margin: "4px"
                    }}
                  ></Icon>
                </Avatar>
              </span>
            }
          >
            <Menu.Item key='15'>
              <Link to='/profile'>
                <Icon type='user' />
                Profile Setting
              </Link>
            </Menu.Item>
            <Menu.Item key='16'>
              <Link to='/logout'>
                <Icon type='logout' theme='outlined' twoToneColor />
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </TopNavMenu>
      );
    } else if (
      this.props.navpath === "/testtrials" ||
      this.props.navpath === "/dashboard"
    ) {
      return (
        <TopNavMenu
          theme='dark'
          mode='horizontal'
          position='right'
          defaultSelectedKeys={["1"]}
        >
          <NavigationLink to='#' style={{ cursor: "default" }}>
            <div className='logo' />
          </NavigationLink>

          <NavigationLink to='/' style={{ marginLeft: "10px" }}>
            <div className='homebtn' />
          </NavigationLink>

          <div className='testrials_logo_gap' />
          <SubMenu
            title={
              <span className='submenu-title-wrapper'>
                <Avatar size='large'>
                  <Icon
                    type='user'
                    style={{
                      fontSize: "24px",
                      textAlign: "center",
                      padding: "2px",
                      margin: "4px"
                    }}
                  ></Icon>
                </Avatar>
              </span>
            }
          >
            <Menu.Item key='15'>
              <Link to='/profile'>
                <Icon type='user' />
                Profile Setting
              </Link>
            </Menu.Item>
            <Menu.Item key='16'>
              <Link to='/logout'>
                <Icon type='logout' theme='outlined' twoToneColor />
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </TopNavMenu>
      );
    } else if (this.props.navpath === "/testconfiguration") {
      return (
        <TopNavMenu
          theme='dark'
          mode='horizontal'
          position='right'
          defaultSelectedKeys={["1"]}
        >
          <NavigationLink to='#' style={{ cursor: "default" }}>
            <div className='logo' />
          </NavigationLink>

          <NavigationLink to='/' style={{ marginLeft: "10px" }}>
            <div className='homebtn' />
          </NavigationLink>

          <div className='testrials_logo_gap' />
          <SubMenu
            title={
              <span className='submenu-title-wrapper'>
                <Avatar size='large'>
                  <Icon
                    type='user'
                    style={{
                      fontSize: "24px",
                      textAlign: "center",
                      padding: "2px",
                      margin: "4px"
                    }}
                  ></Icon>
                </Avatar>
              </span>
            }
          >
            <Menu.Item key='15'>
              <Link to='/profile'>
                <Icon type='user' />
                Profile Setting
              </Link>
            </Menu.Item>
            <Menu.Item key='16'>
              <Link to='/logout'>
                <Icon type='logout' theme='outlined' twoToneColor />
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </TopNavMenu>
      );
    } else if (this.props.navpath === "/priviledges") {
      return (
        <TopNavMenu
          theme='dark'
          mode='horizontal'
          position='right'
          defaultSelectedKeys={["1"]}
          selectedKeys={this.props.priviledgeKeys}
          onClick={this.props.toggleBetweenPriviledgeLevels}
        >
          <NavigationLink to='#' style={{ cursor: "default" }}>
            <div className='logo' />
          </NavigationLink>

          <NavigationLink to='/' style={{ marginLeft: "10px" }}>
            <div className='homebtn' />
          </NavigationLink>

          <Menu.Item key='priviledges' style={{ marginLeft: "10px" }}>
            <NavigationLink to='/priviledges'>
              <Icon type='dropbox' /> <span>Priviledges</span>
            </NavigationLink>
          </Menu.Item>

          <Menu.Item key='auditlog' style={{}}>
            <NavigationLink to='/priviledges/auditlog'>
              <Icon type='dropbox' /> <span>Audit Log</span>
            </NavigationLink>
          </Menu.Item>

          <div className='configuration_logo_gap' />
          <SubMenu
            title={
              <span className='submenu-title-wrapper'>
                <Avatar size='large'>
                  <Icon
                    type='user'
                    style={{
                      fontSize: "24px",
                      textAlign: "center",
                      padding: "2px",
                      margin: "4px"
                    }}
                  ></Icon>
                </Avatar>
              </span>
            }
          >
            <Menu.Item key='15'>
              <Link to='/profile'>
                <Icon type='user' />
                Profile Setting
              </Link>
            </Menu.Item>
            <Menu.Item key='16'>
              <Link to='/logout'>
                <Icon type='logout' theme='outlined' twoToneColor />
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </TopNavMenu>
      );
    } else if (this.props.navpath === "/testresults") {
      return (
        <TopNavMenu
          theme='dark'
          mode='horizontal'
          position='right'
          defaultSelectedKeys={["1"]}
        >
          <NavigationLink to='#' style={{ cursor: "default" }}>
            <div className='logo' />
          </NavigationLink>

          <NavigationLink to='/' style={{ marginLeft: "10px" }}>
            <div className='homebtn' />
          </NavigationLink>

          <div className='testrials_logo_gap' />
          <SubMenu
            title={
              <span className='submenu-title-wrapper'>
                <Avatar size='large'>
                  <Icon
                    type='user'
                    style={{
                      fontSize: "24px",
                      textAlign: "center",
                      padding: "2px",
                      margin: "4px"
                    }}
                  ></Icon>
                </Avatar>
              </span>
            }
          >
            <Menu.Item key='15'>
              <Link to='/profile'>
                <Icon type='user' />
                Profile Setting
              </Link>
            </Menu.Item>
            <Menu.Item key='16'>
              <Link to='/logout'>
                <Icon type='logout' theme='outlined' twoToneColor />
                Log Out
              </Link>
            </Menu.Item>
          </SubMenu>
        </TopNavMenu>
      );
    }
  };
  render() {
    return (
      <Header
        theme='dark'
        style={{
          paddingLeft: "14px",
          height: "55px",
          width: "100%",
          padding: 0,
          boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}
      >
        {this.renderNavigation()}
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    navpath: state.topbarNavigationReducers.navpath,
    masterkeys: state.masterLevelNavigationReducer.masterlevelkey,
    priviledgeKeys: state.priviledgeLevelNavigationReducer.priviledgekeys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleHomeScreenNavigation: () => {
      dispatch({ type: TOGGLE_TO_HOME_SCREEN_NAVIGATION });
      console.log("toggle to home screen navigation click dispatched");
    },
    navigationRefresh: () => {
      dispatch({ type: CHECK_WHETHER_DEFAULT_MASTER_LEVEL });
      console.log("check default master key while master clicked");
    },
    toggleDashboard: () => {
      dispatch({ type: TOGGLE_TO_DASHBOARD_NAVIGATION });
      console.log("toggle to dashboard screen click dispatches");
    },
    toggleBetweenMasterLevels: e => {
      dispatch({ type: TOGGLE_BETWEEN_MASTER_LEVELS, key: e.key });
      console.log("master level navigation toggleed key is " + e.key);
    },
    toggleBetweenPriviledgeLevels: e => {
      dispatch({ type: TOGGLE_BETWEEN_PRIVILEDGE_LEVELS, key: e.key });
      console.log("priviledge level navigation toggleed key is " + e.key);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
