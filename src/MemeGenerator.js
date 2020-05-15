import react, { useState, useEffect } from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
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

  function downloadHandler() {
    const url = newUrl;
    const name = newUrl.replace('https://memegen.link/', '');
    // name.toString(); geht auch wenn sie separat mache
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, name.toString());
        } else {
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = name.toString();
          a.click();
        }
      });
  }

  console.log(select);
  return (
    <div css={flexStyle}>
      <form>
        <select onChange={e => setImage(e.target.value)}>
          value={image}
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
        <button
          data-name={newUrl.toString}
          data-url={newUrl}
          //ok the whole thing downloads but name/format issue plus datei type schaut lustig aus
          onClick={downloadHandler}
          // download
        >
          Download the image
        </button>
      </form>
      <a href={newUrl}>
        <img css={imageStyle} src={newUrl} alt='Your meme here' download></img>
      </a>
    </div>
  );
}
