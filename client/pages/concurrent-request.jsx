import React, { useState } from "react";
import { List, Button } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  min-height: 100vh;
  font-size: 1rem;

  button {
    margin: 20px;
  }
`;

export default function ConcurrentRequest() {
  const [show, setShow] = useState([]);
  const urls = Array(20).fill("https://api.tvmaze.com/search/shows?q=batman");

  async function secondary() {
    try {
      let shows = [];
      for (const url of urls) {
        const res = await fetch(url);
        const res_to_json = await res.json();
        shows.push(res_to_json);
      }
      const show_list = shows.reduce((pre, now) => {
        return pre.concat(now);
      });
      setShow(show_list);
    } catch (e) {
      throw e;
    }
  }

  function concurrent(urls, limit, callback) {
    let current = 0;
    let list = [];
    let index = 0;

    return function loop(){
        console.log('loop======', '[current]-', current, '[index]-', index, '[list]-', list);
        if(urls.length === list.length){
            console.log('finished');
            callback(list)
        }
        while(index < urls.length && current < limit){
            current++
            fetch(urls[index]).then(res=>res.json()).then(res=>{
                if(list.push(res)){
                    current--
                    loop();
                }
            });
            index++
            loop();
        }
    }
  }

  const reset = () => setShow([]);

  function callback(res) {
    const target = res.reduce((pre, now) => pre.concat(now));
    setShow(target);
  }

  return (
    <Container>
      This is Concurent request page!
      <div>
        <Button onClick={secondary}>secondary request</Button>
        <Button onClick={() => concurrent(urls, 5, callback)()}>
          concurrent request
        </Button>
        <Button onClick={reset}>reset</Button>
      </div>
      <List
        size="small"
        header={<div>list</div>}
        style={{ width: "80vw" }}
        bordered
        dataSource={show}
        renderItem={item => (
          <List.Item>
            {item.show.name}{" "}
            <img style={{ height: "5rem" }} src={item.show.image.medium} />
          </List.Item>
        )}
      />
    </Container>
  );
}
