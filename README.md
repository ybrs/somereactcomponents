# Some React Components

This is a collection of some declarative components for React eg: Visible, Switch, ForEach etc...

## Why

Because I don't like this

```javascript

render(){
  return <span>
      {this.state.user && this.state.user.loggedIn && <h3>{this.state.user.name}</h3>}
  </span>
}

```

I like writing this way

```javascript

render(){
  return <Visible when={this.state.user && this.state.user.loggedIn}>
      <h3>{this.state.user.name}</h3>
  </Visible>
}

```

Also it gets more complicated when it has more states/branches with ternary operators

```javascript

<span>
    {this.state.user && this.state.user.loggedIn ? (
      <h3>{this.state.user.name}</h3>
    ):(
      <h3><a href="/login">Please login</a></h3>
    )}
</span>

```

Instead I prefer using something like this.

```javascript


    <Switch>
      <Case when={this.state.user && this.state.user.loggedIn}>
        <h3>{this.state.user.name}</h3>
      </Case>
      <Else >
        <h3><a href="/login">Please login</a></h3>
      </Else>
    </Switch>

```

Or simply - if you only need boolean conditionals

```javascript

    <Visible when={this.state.user && this.state.user.loggedIn}>
        <h3>{this.state.user.name}</h3>
      <Other />
        <h3><a href="/login">Please login</a></h3>
    </Visible>

```

Of course your milage may vary, but I think the second form is more easy when you just scan the code.

Also foreach/map there is a ForEach component that takes an iterable and renders the components in a loop.
More or less the same thing as `array.map` but easier to read.

```javascript
  const UserLabel = (props)=>{
    return <div>{props.id} | {props.name}</div>
  }
  // ...
  let somedata = [{id:1, name: 'a'}, {id:2, name: 'b'}]
  // ...

  <ForEach data={somedata} expandProps>
    <UserLabel />
  </ForEach>
```

# FAQ/Notes

## Do I really need this ?

Short answer, no probably not, but its easier to read/write - for me - and looks more declarative. Although it adds some overhead ofcourse, but its negligible, foreach wraps a simple map function, and Visible/Switch wraps some if clause, so the impact shouldn't be noticable.

## Why not put this as a preprocessor - eg. webpack ?

It makes things much complicated than it should.




