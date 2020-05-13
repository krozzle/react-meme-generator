import react, { useState } from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const memeLink =
  'https://memegen.link/{image}/{topText}/{bottomText}.jpg?watermark=none';

export default function CreateMeme(props) {
  const [image, setImage] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [activeImage, setActiveImage] = useState('');
  return (
    <form>
      <input
        type='text'
        name='image'
        placeholder='your picture'
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <input
        type='text'
        name='Line 1'
        placeholder='upper line'
        value={topText}
        onChange={e => setTopText(e.target.value)}
      />
      <input
        type='text'
        name='Line 2'
        placeholder='bottom line'
        value={bottomText}
        onChange={e => setBottomText(e.target.value)}
      />
      <button onClick={() => {}}>Submit</button>
    </form>
  );
}
