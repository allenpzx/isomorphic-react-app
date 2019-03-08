import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const Container = styled.div`
  width: 90vw;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 1px solid red;

  -webkit-column-count: 3;
  -webkit-column-gap: 10px;
  -webkit-column-fill: auto;
  -moz-column-count: 3;
  -moz-column-gap: 10px;
  -moz-column-fill: auto;
  column-count: 4;
  column-gap: 15px;
  column-fill: auto;

  .item{
    margin-right: 0;
    margin-left: 0;
    display: block;
    padding: 0;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
`;

const JSContainer = styled.div`
  width: 90vw;
  position: relative;
  border: 1px solid red;
  box-sizing: border-box;
  over-flow: hidden;
  hight: auto;
    .item{
      width: auto;
      display: block;
      padding: 0;
      margin: 0;
      position: absolute;
      box-sizing: border-box;
      float: left;
      margin-bottom: 20px;
    }
`;

const WhiteSpace = styled.div`
    width: 100%;
    display: block;
    margin 20px 0;
    position: relative;
`

function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}
//获取当前可视范围的高度
function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  } else {
    clientHeight = Math.max(
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }
  return clientHeight;
}
//获取文档完整的高度
function getScrollHeight() {
  var scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight;
  return scrollHeight;
}

// from last trigger count time to exce
function debounce (fn, wait){
    let timer = null;
    return function (){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}

// during time only exce once
function throttle (fn, wait){
    let timer = null;
    return function (){
        if(!timer){
            timer = new Date();
            console.log(timer);
            return fn();
        }
        let current = new Date();
        if(parseFloat(current - timer) > wait){
            fn();
            timer = new Date();
        }
    }
}

function JSWaterFall(containerId, width, gap){
    const container = document.getElementById(containerId);
    const items = container.children;
    const containerWidth = container.offsetWidth;
    const column = Math.floor(containerWidth/(width+gap));
    let heightArr = [];

    [...items].map((v, i, arr)=>{
      v.style.position = 'absolute';
      v.style.width = width + 'px';
      if(i<column){
        const l = i * (width + gap);
        heightArr.push(v.offsetHeight);
        v.style.left = l + 'px';
        v.style.top = 0;
      }else{
        const minH = Math.min(...heightArr);
        const minH_index = heightArr.indexOf(minH);
        const left = arr[minH_index].offsetLeft;
        v.style.left = left + 'px';
        v.style.top = minH + gap + 'px';
        const height = v.offsetHeight;
        heightArr[minH_index] = heightArr[minH_index] + height + gap;
      }
    });

    container.style.margin = '0 auto';
}

export default class WaterFall extends React.Component {
    
  state = {
    display: 'css',
    list: [],
    debounceTime: null
  };

  componentDidMount() {
    this.setState({ list: this.fetchRandomImage() }, ()=>{
        this.watchScroll()
    });
  }

  handleWaterFall = (dis) => {
      this.setState({display: dis, list: dis==='js'?this.fetchRandomImage():this.state.list}, ()=>{
          if(dis==='js'){
              JSWaterFall('js-container', 200, 10);
          }
      });
  }

  loadMore = () => {
    console.log('watching...');
    const salt = 20;
    const trigger = getClientHeight() + getScrollTop() >= getScrollHeight() - salt;
    if(trigger){
        this.setState({list: this.state.list.concat(this.fetchRandomImage())}, ()=>{
          this.state.display === 'js' && JSWaterFall('js-container', 200, 10);
        });
        console.log('function is going');
    }
  }

  watchScroll = () => {
      window.addEventListener('scroll', throttle(this.loadMore, 1000));
  };

  fetchRandomImage = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(`https://picsum.photos/200/${this.randomNum(1, 10)}00/?random`);
    }
    const Imgs = arr.map((v, i) => {
      return (
        <img className='item' src={v} alt='ceshi' key={i + Math.random() * Math.random()} />
      );
    });
    return Imgs;
  };

  randomNum = (minNum, maxNum) => {
    if (maxNum) {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    } else if (minNum) {
      return parseInt(Math.random() * minNum + 1, 10);
    } else {
      return 0;
    }
  };

  render() {
    return (
      <div>
        <h1>WaterFall and throttle</h1>
        <p>Include css and js to handle waterFall</p>
        <Button onClick={()=>this.handleWaterFall('css')}>css waterFall</Button> <Button onClick={()=>this.handleWaterFall('js')}>js waterFall</Button>
        <WhiteSpace />
        {this.state.display === 'css' ? <Container>{this.state.list}</Container> : <JSContainer id='js-container'>{this.state.list}</JSContainer>}
      </div>
    );
  }
}
