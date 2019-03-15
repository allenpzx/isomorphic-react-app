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
  const urls = Array(20).fill("http://api.tvmaze.com/search/shows?q=batman");

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
    function* format_urls() {
      for (const url of urls) {
        yield fetch(url).then(res => res.json());
      }
    }
    const g = format_urls();
    let current = 0;
    let list = [];

    return function loop() {
      if (current > limit) {
        return;
      }
      current++
      console.log('current: ', current);
      const { value, done } = g.next();
      
      if (done) {
        console.log("finished!", list);
        return;
      }
      value.then(res => {
        list.push(res);
        current--;
      });
    };
  }

  const reset = () => setShow([]);

  function callback(res) {
    console.log(res);
    setShow(res);
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
