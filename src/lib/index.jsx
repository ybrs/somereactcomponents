import React, { Component } from "react";
import _ from 'lodash'


export const Other = (props) =>{
  return null
}

export const splitElems = (elems, condFn)=>{
  let ret = [[]]
  let ndx = 0
  for(let i=0; i<elems.length; i++){
    if (condFn(elems[i])){
      ndx++
      ret[ndx] = []
    }
    ret[ndx].push(elems[i])
  }
  return ret
}


export const Visible = (props) =>{
  let hasElseClause = props.children.filter && props.children.filter((el)=>el.type == Other)
  let when = isFunction(props.when) ? props.when() : props.when
  if (hasElseClause){
    let seenOther = false;
    let parts = splitElems(props.children, (el)=>el.type==Other)
    if (when){
      return parts[0]
    }
    return parts[1]
  }

  if (when){
    return props.children
  }
  return null
}

const isFunction = (maybeFn)=> typeof maybeFn === 'function'

export const ForEach = (props) => {
  let expandProps = props.expandProps !== undefined ? props.expandProps : true

  if (!props.data){
    return null
  }

  return props.data.map((val, index)=>{
      if (isFunction(props.children)){
        return props.children(index, val)
      }

      let receiveProps = {}
      if (expandProps){
        receiveProps = {...val, index}
      } else {
        receiveProps = { value: val, index: index }
      }

      return React.Children.map(props.children,
          (child)=>React.cloneElement(child, receiveProps)
      )
  })
}

export const Switch = (props) =>{
  let caseMatched = false
  const getSwitchState = ()=>{
    return caseMatched
  }
  const updateSwitchState = (cond)=>{
    caseMatched = cond
  }

  let receiveProps = _.omit(props, 'children')
  receiveProps.getSwitchState = getSwitchState
  receiveProps.updateSwitchState = updateSwitchState

  return React.Children.map(props.children,
    (child)=>React.cloneElement(child, receiveProps)
  )
}

export const Case = (props) => {
  let swState = props.getSwitchState()
  if (swState){
    return null
  }
  let cond = props.when
  if (isFunction(cond)){
    cond = cond(props)
  }

  if (cond){
    props.updateSwitchState(cond)
    if (props.expandProps){
      return React.Children.map(props.children, (child)=>React.cloneElement(child, {...props}))
    }

    return props.children || null

  }
  return null
}

export const Else = (props) => {
  let swState = props.getSwitchState()
  if (swState){
    return null
  }
  if (props.expandProps){
    return React.Children.map(props.children, (child)=>React.cloneElement(child, {...props}))
  }
  return props.children || null
}

const noop = ()=>null

/**
 *  Generic update handler to update state
 *
 *  Example:
 *                      <input type="text"
                        onChange={stateUpdater(this, 'title', 'target.value', '')}
                        value={this.state.title} />
 *
 * @param {*} ctx
 * @param {*} name
 * @param {*} eventProp
 * @param {*} initialValue
 * @param {*} cb
 */
export const stateUpdater = (ctx, name, eventProp = 'target.value', initialValue=undefined, cb=noop)=>{
    if (initialValue !== undefined){
        if (typeof ctx.state[name] === 'undefined'){
            ctx.state[name] = initialValue
        }
    }
    return (evt)=>{
        let s = ctx.state
        s[name] = _.get(evt, eventProp)
        ctx.setState(s, cb)
        return evt
    }
}

export const TextBox = (props)=>{
  return <input {..._.omit(props, ['stateKey', 'ctx', 'initialValue'])}
            onChange={stateUpdater(props.ctx, props.stateKey, 'target.value', props.initialValue||'')}
            value={props.ctx.state[props.stateKey]}
            />
}

export const SelectBox = (props)=>{
  return <select {..._.omit(props, ['stateKey', 'ctx', 'initialValue'])}
            onChange={stateUpdater(props.ctx, props.stateKey, 'target.value', props.initialValue||'', ()=>console.log(props.ctx.state))}
            value={props.ctx.state[props.stateKey]}
        >{props.children}</select>
}


