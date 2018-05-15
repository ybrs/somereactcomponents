import React, {Component} from "react";
import { render } from "react-dom";
import {Visible, Switch, Case, Else, Other, ForEach, stateUpdater} from "../../lib";
import "./styles.css";
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import * as R from "ramda";


const UserLabel = (props)=>{
  return <div>{props.id} | {props.name}</div>
}

class UserLabelWithState extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return <div>
      <span>state.posX: {this.state.posX}</span> <br/>
      <div className="box-small"
           onMouseMove={stateUpdater(this, 'posX', 'screenX', 0)}>
          move mouse here
      </div>
    </div>
  }
}


class UserLabelWithState2 extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return <div>
      <span>{this.state.posX} | {this.state.posY}</span> <br/>
      <div className="box-small"
           onMouseMove={R.compose(
                              stateUpdater(this, 'posX', 'screenX', 0),
                              stateUpdater(this, 'posY', 'screenY', 0),
                        )}>
          move mouse here
      </div>
    </div>
  }
}

const StateUpdaterDemo = (props)=>{
  return <div className="democomp">
      <a name="components_stateupdater"></a>
      <h1>Components > StateUpdater</h1>
      <h3>Basic Usage</h3>
      <p>
          Sometimes you only need a generic state updater for your component.
      </p>

      <p>
        As you can see in the example below, it gets 'screenX' from 'event' and updates your `state.posX`.
        We don't need to initialize first value in constructor for state.
      </p>

      <UserLabelWithState/>

          <SyntaxHighlighter language='jsx' style={atomDark}>
  {`
class UserLabelWithState extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return <div>
      <span>state.screenX: {this.state.posX}</span> <br/>
      <div className="box-small"
           onMouseMove={stateUpdater(this, 'posX', 'screenX', 0)}>
          move mouse here
      </div>
    </div>
  }
}
  `}
          </SyntaxHighlighter>

<p>
Because it returns the event as is, and its a simple function its composable.
</p>


          <SyntaxHighlighter language='jsx' style={atomDark}>
  {`
class UserLabelWithState2 extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return <div>
      <span>{this.state.posX} | {this.state.posY}</span> <br/>
      <div className="box-small"
           onMouseMove={R.compose(
                              stateUpdater(this, 'posX', 'screenX', 0),
                              stateUpdater(this, 'posY', 'screenY', 0),
                        )}>
          move mouse here
      </div>
    </div>
  }
}
  `}
          </SyntaxHighlighter>

<UserLabelWithState2 />
  </div>
}

const ForeachDemo = (props)=>{
  let somedata = [{id:1, name: 'a'}, {id:2, name: 'b'}]

  return <div className="democomp">
  <a name="components_foreach"></a>

  <h1>Components > ForEach</h1>
  <h3>Basic Usage</h3>
  <p>
    ForEach loops over an array/list and renders child components of itself
  </p>

  <p>
    In this example UserLabel component will receive props, "id" and "name"
  </p>

          <SyntaxHighlighter language='jsx' style={atomDark}>
  {`
  const UserLabel = (props)=>{
    return <div>{props.id} | {props.name}</div>
  }
  // ...
  let somedata = [{id:1, name: 'a'}, {id:2, name: 'b'}]
  // ...
  <ForEach data={somedata} expandProps>
    <UserLabel />
  </ForEach>
  `}
          </SyntaxHighlighter>

  <div className="output">
    <ForEach data={somedata} expandProps>
        <UserLabel />
    </ForEach>
  </div>
</div>
}


class Demo extends Component {

  constructor(props){
    super(props)
    this.state = {loggedIn: false, isAdmin: false}
    this.updateLoginState = this.updateLoginState.bind(this)
    this.updateAdminState = this.updateAdminState.bind(this)
  }

  updateLoginState(){
    this.setState({loggedIn: !this.state.loggedIn})
  }
  updateAdminState(){
    this.setState({isAdmin: !this.state.isAdmin})
  }

  render(){
    let loggedIn = false;

    return (
      <div>
        <a name="components_visible"></a>

        <h1>Components > Visible</h1>

        <h3>Basic Usage</h3>
        <br/>

        <SyntaxHighlighter language='jsx' style={atomDark}>
{`
<Visible when={this.state.loggedIn}>
      <p>Hello user</p>
</Visible>
<Visible when={!this.state.loggedIn}>
Please Login
</Visible>
`}
        </SyntaxHighlighter>


        <p>
        <input type="checkbox" defaultChecked={loggedIn} onClick={this.updateLoginState}/> loggedIn
        </p>
        <Visible when={this.state.loggedIn}>
            <p>Hello user</p>
        </Visible>
        <Visible when={!this.state.loggedIn}>
            Please Login
        </Visible>

        <h3>Or you can use it like this </h3>
        <p>
          It will render &lt;Other clause if condition is false
        </p>

        <SyntaxHighlighter language='jsx' style={atomDark}>
{`
<Visible when={this.state.loggedIn}>
Hello user
<Other />
Please Login
</Visible>`}
        </SyntaxHighlighter>


        <Visible when={this.state.loggedIn}>
            Hello user
        <Other />
            Please Login
        </Visible>


        <h3>You can pass a callable as condition</h3>

        <SyntaxHighlighter language='jsx' style={atomDark}>
{`
<Visible when={()=>{return this.state.loggedIn} }>
  <p>Hello user</p>
<Other />
  <p>Please Login</p>
</Visible>`}
        </SyntaxHighlighter>

        <Visible when={()=>{return this.state.loggedIn} }>
            Hello user
        <Other />
            Please Login
        </Visible>


<a name="components_switch"></a>
<h1>Components > Switch/Case</h1>
<h3>Basic Usage</h3>
<p>
Sometimes simple boolean conditions are not enough.
</p>

<p>
<input type="checkbox" defaultChecked={loggedIn} onClick={this.updateLoginState}/> loggedIn <br/>

<input type="checkbox" defaultChecked={this.state.isAdmin} onClick={this.updateAdminState}/> Is Admin
</p>

<Switch>
  <Case when={this.state.loggedIn && this.state.isAdmin}>
      Welcome Admin
  </Case>
  <Case when={()=>this.state.loggedIn}>
      Welcome user
  </Case>
  <Else>
      Please Login
  </Else>
</Switch>

        <SyntaxHighlighter language='jsx' style={atomDark}>
{`
<Switch>
  <Case when={this.state.loggedIn && this.state.isAdmin}>
      Welcome Admin
  </Case>
  <Case when={()=>this.state.loggedIn}>
      Welcome user
  </Case>
  <Else>
      Please Login
  </Else>
</Switch>`}
        </SyntaxHighlighter>

<p>
  Switch/Case breaks when it hits the first true condition. In this example it doesn't render "Welcome User" if the user is logged in and she's an admin.
</p>


<Switch >
  <Case when={this.state.loggedIn && this.state.isAdmin}>
      Welcome Admin
  </Case>
  <Case when={()=>this.state.loggedIn}>
      Welcome user
  </Case>
  <Else>
      Please Login
  </Else>
</Switch>


      <ForeachDemo />
      <StateUpdaterDemo />


      </div>
    );

  }

}


const ComponentDemo = (props)=>
<div className="components">
  <div className="compmenu">
      <h3>Non-Visual</h3>
      <ul>
          <li><a href="#components_visible">Visible</a></li>
          <li><a href="#components_switch">Switch/Case</a></li>
          <li><a href="#components_foreach">ForEach</a></li>
      </ul>
      <h3>Helper Function</h3>
      <ul>
        <li><a href="#components_stateupdater">stateUpdater</a></li>
      </ul>
  </div>
  <div className="demo">
    <Demo />
  </div>
</div>



render(<ComponentDemo />, document.getElementById("app"));
