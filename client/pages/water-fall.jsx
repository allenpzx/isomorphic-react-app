import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import '../assets/styles/water-fall.css';

const Container = styled.div`
  width: 80vw;
  position: relative;
  // border: 1px solid red;
  // box-sizing: border-box;
  // display: flex;
  // padding: 20px;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: center;
  // align-items: flex-start;

  -webkit-column-count: 3;
  -webkit-column-gap: 10px;
  -webkit-column-fill: auto;
  -moz-column-count: 3;
  -moz-column-gap: 10px;
  -moz-column-fill: auto;
  column-count: 4;
  column-gap: 15px;
  column-fill: auto;
`;

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

const readonly = (target, name, descriptor) => {
  descriptor.writable = false;
  return descriptor;
};

export default class WaterFall extends React.Component {
    
  state = {
    list: [],
    debounceTime: null
  };

  componentDidMount() {
    this.setState({ list: this.fetchRandomImage() }, ()=>{
        this.watchScroll()
    });
  }

  loadMore = () => {
    console.log('watching...');
    const salt = 20;
    const trigger = getClientHeight() + getScrollTop() >= getScrollHeight() - salt;
    if(trigger){
        this.setState({list: this.state.list.concat(this.fetchRandomImage())});
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
        <Card
          hoverable
          style={{
            width: "100px"
          }}
          cover={<img alt="example" src={v} />}
          key={i + Math.random() * Math.random()}
          className='item'
        />
      );
    });
    return Imgs;
  };

  // @readonly
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
        <h1>This is WaterFall shows Page</h1>
        <p>below is WaterFall display, window was listerned scroll event through </p>
        <Container>{this.state.list}</Container>
      </div>
    );
  }
}
