import React from "react";
import { Button, Upload, Icon, message } from "antd";
import styled from "styled-components";

const Layout = styled.div`
  position: relative;
  width: 100vw;
  margin: 0 auto;
  paddinh: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  #exportAddMark {
    border: 1px solid red;
  }
  #exportToImg {
    border: 1px solid blue;
  }

  .canvas-container{
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items; center;
      box-shadow: 0 0 1px 1px #cccccc;
  }
  .waterMark{
      border: 1px solid red;
    z-index: -1;
    background: #fff;
  }
`;

export default class WaterMark extends React.Component {
  state = {
    loading: false,
    imageUrl: null,
    img: null
  };

  handleWaterMark = () => {
    const _canvas = document.createElement("canvas");
    _canvas.setAttribute("width", "160px");
    _canvas.setAttribute("height", "100px");
    const _ctx = _canvas.getContext("2d");
    const { _width, _height } = _canvas.getBoundingClientRect();
    _ctx.clearRect(0, 0, _width, _height);
    _ctx.font = "20px 黑体";
    _ctx.rotate((-20 * Math.PI) / 180);
    _ctx.fillStyle = "#cccccc";
    _ctx.fillText("这是水印", -20, 80);
    _ctx.rotate("20*Math.PI/180");
    
    const canvas = document.getElementById("waterMark");
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas.getBoundingClientRect();
    const bg = document.querySelector("#previewImage");
    ctx.drawImage(bg, 0, 0, width, height);
    const pat = ctx.createPattern(_canvas, "repeat");
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, width, height);
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Image must smaller than 10MB!");
    }

    return false;
    // return isJPG && isLt10M;
  };

  previewFile = () => {
    var preview = document.querySelector("#img_container");
    var file = document.querySelector("#img_input").files[0];
    this.setState({ loading: true });
    let imgBase64 = null;

    // if you need convert image to data:base64 format below is ok
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function(event) {
        preview.src = reader.result;
        imgBase64 = reader.result;
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }

    preview.addEventListener(
      "load",
      e => {
        this.setState({ img: imgBase64 });
      },
      false
    );
  };

  handleChange = detail => {
      console.log(detail.file.status);
      console.log(detail.file.originFileObj);
      if(detail.file.status === "uploading"){
        this.setState({ loading: true });
        return;
      }else{
        this.getBase64(detail.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }));
        return;
      }

  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <Layout>
        <h1>Water Mark</h1>
        <div className="canvas-container">
          <canvas id="waterMark" />
          {this.state.imageUrl && (
            <Button onClick={this.handleWaterMark} style={{ margin: "20px" }}>
              加水印
            </Button>
          )}
        </div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={this.handleChange}
        >
          {imageUrl ? <img id='previewImage' src={imageUrl} style={{width: '200px', height: '200px'}} alt="avatar" /> : uploadButton}
        </Upload>
        <br />
        <img
          id="img_container"
          src={this.state.img}
          height="200"
          alt="Image preview..."
          style={{ display: this.state.img ? "block" : "none" }}
        />
      </Layout>
    );
  }
}
