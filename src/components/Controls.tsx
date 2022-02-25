import { DeleteOutlined, DownOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu } from 'antd';
import { fabric } from 'fabric';
import React, { useEffect, useState } from 'react';

function Controls() {
  const [color, setColor] = useState('#000000');

  let canvas: fabric.Canvas;
  useEffect(() => {
    canvas = new fabric.Canvas('canvas', {
      width: 1000,
      height: 600,
      backgroundColor: '#ffffff',
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 1;
    canvas.isDrawingMode = true;
  }, []);

  const handleSizeBrush = (size: number) => {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = size;
    canvas.renderAll();
  };

  const handleDrawShape = (type: string) => {
    canvas.isDrawingMode = false;
    switch (type) {
      case 'rectangle':
        const rect = new fabric.Rect({
          width: 100,
          height: 100,
          fill: '#fff',
          stroke: '#000',
        });
        canvas.add(rect);
        canvas.renderAll();
        break;
      case 'elipse':
        const elipse = new fabric.Ellipse({
          rx: 100,
          ry: 50,
          fill: 'white',
          stroke: '#000',
        });
        canvas.add(elipse);
        canvas.renderAll();
        break;
      case 'circle':
        const circle = new fabric.Circle({
          radius: 50,
          fill: 'white',
          stroke: '#000',
        });
        canvas.add(circle);
        canvas.renderAll();
        break;
      case 'line':
        const line = new fabric.Line([0, 0, 100, 150], {
          fill: '#000',
          stroke: '#000',
          strokeWidth: 2,
        });
        canvas.add(line);
        canvas.renderAll();
        break;
      case 'triangle':
        const triangle = new fabric.Triangle({
          width: 50,
          height: 50,
          fill: '#fff',
          stroke: '#000',
        });
        canvas.add(triangle);
        canvas.renderAll();
        break;
      default:
        break;
    }
  };

  const createText = () => {
    canvas.isDrawingMode = false;
    const text = new fabric.IText('Text here', {
      fontSize: 18,
      fill: '#000',
    });
    canvas.add(text);
  };

  const deleteObject = () => {
    canvas.isDrawingMode = false;
    const activeObj = canvas.getActiveObject();
    const activeGr = canvas.getActiveObjects();

    if (activeObj) {
      canvas.remove(activeObj);
    }
    if (activeGr) {
      activeGr.forEach((object: any) => {
        canvas.remove(object);
      });
    }
  };

  const handlePickColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    console.log(canvas);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    canvas.isDrawingMode = false;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageEl = new Image();
      imageEl.src = e.target?.result as string;
      imageEl.onload = () => {
        const img = new fabric.Image(imageEl);
        img.scaleToWidth(200);
        canvas.add(img).renderAll();
      };
    };
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const menuSizeBar = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<MinusOutlined />}
        onClick={() => handleSizeBrush(1)}
      >
        1px
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<MinusOutlined />}
        onClick={() => handleSizeBrush(2)}
      >
        2px
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<MinusOutlined />}
        onClick={() => handleSizeBrush(3)}
      >
        3px
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<MinusOutlined />}
        onClick={() => handleSizeBrush(4)}
      >
        4px
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="controls">
        <div className="col">
          <Dropdown overlay={menuSizeBar}>
            <Button>
              Size <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="col">
          <div className="shapes">
            <div
              onClick={() => handleDrawShape('rectangle')}
              className="shapes-item rectangle"
            ></div>
            <div
              onClick={() => handleDrawShape('elipse')}
              className="shapes-item elipse"
            ></div>
            <div
              onClick={() => handleDrawShape('circle')}
              className="shapes-item circle"
            ></div>
            <div
              onClick={() => handleDrawShape('line')}
              className="shapes-item line"
            ></div>
            <div
              onClick={() => handleDrawShape('triangle')}
              className="shapes-item triangle"
            ></div>
          </div>
        </div>

        <div className="col">
          <div className="text" onClick={createText}>
            <p>A</p>
          </div>
        </div>
        <div className="col">
          <div className="trash" onClick={deleteObject}>
            <p>
              <DeleteOutlined />
            </p>
          </div>
        </div>
        <div className="col">
          <Input
            type={'file'}
            onChange={handleUploadImage}
            placeholder="Upload an image"
          />
        </div>
        <div className="col">
          <input
            className="color-picker"
            type="color"
            value={color}
            onChange={handlePickColor}
          />
        </div>
      </div>
      <canvas id="canvas"></canvas>
    </>
  );
}

export default Controls;
