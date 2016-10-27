require("./../stylesheets/style.css")
import React from 'react'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {indigo200, indigo500, indigo900} from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin'

import MoviesGridList from './MoviesGridList'
import MovieCardShow from './MovieCardShow'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo900,
    primary3Color: indigo200,
  },
}, {
  avatar: {
    borderColor: null,
  }
})

const LayoutStyles = {
  container: {
    paddingTop: 0,
    margin: 0,
  },
}

const Tags = [
  "悬疑",
  "惊悚",
  "爱情",
  "科幻",
  "动作",
  "喜剧"
]

class AppLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tags: [],
      movieId: null
    }
    this.handleToggle = () => (
      this.setState({open: !this.state.open})
    )
    this.handleClose = () => (
      this.setState({open: false})
    )
    this.setMovieTags = (tagName) => (
      this.setState({tags: tagName})
    )
  }

  renderMenuItems() {
    return(
      Tags.map((tagName) => (
        // 这里this.setMovieTags无法使用event.target，因为用的是原始的dom节点
        <MenuItem key={tagName} onTouchTap={this.setMovieTags.bind(null, tagName)} >{tagName}</MenuItem>
      ))
    )
  }

  renderAppBar() {
    return (
      <div>
        <AppBar title="哩噜电影" onLeftIconButtonTouchTap={this.handleToggle} />
        <div>
          <Drawer open={this.state.open} docked={false}>
            <MenuItem key={"关闭边栏"} onTouchTap={this.handleClose}>{"关闭边栏"}</MenuItem>
            {this.renderMenuItems()}
          </Drawer>
        </div>
      </div>
    )
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={LayoutStyles.container}>
          {this.renderAppBar()}
          {this.state.movieId ? <MovieCardShow movieId={this.state.movieId} /> : <MoviesGridList tags={this.state.tags}/>}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default AppLayout