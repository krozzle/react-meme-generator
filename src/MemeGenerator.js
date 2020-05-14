import react, { useState, useEffect } from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';

const flexStyle = css`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  text-align: center;
`;

const imageStyle = css`
  height: 1fr;
  width: 1fr;
`;

export default function CreateMeme() {
  const [image, setImage] = useState('bihw');
  const [topText, setTopText] = useState('it aint much');
  const [bottomText, setBottomText] = useState('but its honest work');
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  const [newUrl, setNewUrl] = useState(
    'https://memegen.link/' +
      image +
      '/' +
      topText +
      '/' +
      bottomText +
      '/.jpg?watermark=none',
  );

  useEffect(() => {
    fetch('https://memegen.link/api/templates/', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        const imgData = Object.keys(data);
        setSelect(imgData);
      })
      .catch(e => console.log(e));
  }, []);
  console.log(select);

  return (
    <div css={flexStyle}>
      <form>
        <select>
          {select.map((name, i) => {
            return (
              <option key={i} value={name}>
                {name}
              </option>
            );
          })}
        </select>

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
        <button
          type='button'
          onClick={() =>
            setNewUrl(
              'https://memegen.link/' +
                image +
                '/' +
                topText +
                '/' +
                bottomText +
                '/.jpg?watermark=none',
            )
          }
        >
          Submit
        </button>
      </form>

      <div>
        <img css={imageStyle} src={newUrl} alt='Your meme here' />
      </div>
    </div>
  );
}
