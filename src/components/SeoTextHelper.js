import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ProgressBar from './ProgressBar';
import Keyword from './Keyword';

export default function SeoTextHelper() {
  // Copy To Clipboard State
  // eslint-disable-next-line
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line
  const [data, setData] = useState('');
  // eslint-disable-next-line
  const handleData = (event) => {
    setCopied(false);
    setData(event.target.value);
  };

  // Counts
  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(130);

  // Keywords
  const [keywords, setKeywords] = useState([{ name: 'great product' }]);
  const [newKeyword, setNewKeyword] = useState('');
  const [keywordExist, setKeywordExist] = useState(false);

  // Text
  const [seoText, setSeoText] = useState('');

  // Add keyword only if it doesn't exist not case sensitive
  const add = (keyword) => {
    if (keywords.some((item) => item.name === keyword.name.toLowerCase())) {
      setKeywordExist(true);
      console.log('KEYWORD EXIST ');
      return;
    }
    setKeywords([...keywords, keyword]);
  };

  // Remove keyword
  const remove = (index) => {
    setKeywords([...keywords.slice(0, index), ...keywords.slice(index + 1)]);
  };

  const handleAddClick = () => {
    if (newKeyword === '') {
      return;
    }
    /* if new keyword exist set a span with message */

    add({ name: newKeyword });
    setNewKeyword('');
    setKeywordExist(false);
    console.log('newKeyword: ', newKeyword);
  };

  // Handle add newKeyword when enter is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddClick();
    }
  };

  // Add keyword to seoKeywordGroup if keywordExist is false
  let seoKeywordGroup = [];

  if (keywordExist === false) {
    seoKeywordGroup = [...new Set(keywords.map((keyword) => keyword.name))];
  }

  // Search and compare Keywords with Textfield
  let searchString = seoKeywordGroup;
  let seoPlainTextField = seoText.toString().toLowerCase().split(',');

  // eslint-disable-next-line
  let result = seoPlainTextField.filter((seoKeywordGroup) => {
    let containsAtLeastOneWord = false;
    // console.log('result: ', result);

    // If a word is matched return it
    searchString.forEach((word) => {
      if (seoKeywordGroup.toString().toLowerCase().includes(word))
        containsAtLeastOneWord = true;
    });

    if (containsAtLeastOneWord) return seoKeywordGroup;
  });

  // Progressbar count and color
  let barColor = 'green';
  let countBar = ((count / maxCount) * 100).toFixed(0);
  let countBarMax = (count / maxCount) * 100;

  // if count is 70% of maxCount set barColor to orange
  if (count > maxCount * 1) {
    barColor = 'orange';
  }

  // if count is 100% of maxCount set barColor to red
  if (count > maxCount * 1.2) {
    barColor = 'red';
  }

  // if count 120% of maxCount set max color bar width value to 120
  if (count >= maxCount * 1.2) {
    countBarMax = 120;
  }

  const progressBar = [
    { bgcolor: barColor, completed: countBar, completedColor: countBarMax },
  ];
  // End Search and compare Keywords with Textfield
  return (
    // Wrapper
    <div className='flex w-[600px] justify-center'>
      <div className='max-w-4xl p-3 my-2 bg-gray-300 rounded-md sm:w-11/12 sm:mt-10 sm:p-8'>
        {/* Headline */}
        <h1 className='text-2xl font-semibold text-center uppercase'>
          SEO Text Helper
        </h1>

        {/* Keywords */}
        <div className='flex flex-col self-start mt-4'>
          <p className='text-sm font-bold uppercase'> Keywords: </p>

          {/* Keyword-list */}
          <div className='flex flex-wrap self-start pb-5 '>
            {seoKeywordGroup.map((keyword, index) => {
              return (
                <Keyword
                  key={index}
                  keyword={keyword}
                  seoText={seoText}
                  onRemove={() => remove(index)}
                />
              );
            })}
          </div>

          {/* Keyword-input */}
          <div className='flex justify-end text-center'>
            <input
              className='px-2 py-1 rounded '
              type='text'
              value={newKeyword}
              onChange={(event) => setNewKeyword(event.target.value.trim())}
              // if press enter add keyword
              onKeyDown={handleKeyDown}
            />
            {/* Button add keyword */}
            <button
              className='p-1 pl-2 pr-2 ml-2 bg-white border-gray-300 rounded border-sm hover:bg-green-500 hover:text-white'
              onClick={handleAddClick}
            >
              Add keyword
            </button>
            {keywordExist &&
              (console.log('keywordExist: ', keywordExist),
              (
                <span className='ml-2 text-sm text-red-500'>
                  Keyword already exist
                </span>
              ))}
          </div>
        </div>

        <form>
          <div className='flex'>
            {/* Input keyword characters */}
            <input
              className='px-2 mt-2 text-center border-gray-300 rounded shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50'
              type='text'
              pattern='[0-9]*'
              size='3'
              value={maxCount}
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) {
                  return;
                } else {
                  setMaxCount(e.target.value.trim());
                }
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                }
              }}
            />{' '}
            <p className='flex flex-col text-sm pt-2 font-bold uppercase pl-1.5 '>
              Characters
              <span className='text-xs font-thin lowercase'>
                (only Numbers)
              </span>
            </p>
          </div>

          <div className='pt-2 pl-0.5 pb-0.5 text-xs uppercase'>
            {/* if count is 20% greater than maxCount change text line */}
            {count > maxCount * 1.2 ? (
              <p>
                Characters: {count} / Max: {maxCount} /{' '}
                <span className='text-red-500'>
                  Over Limit: {(maxCount - count).toString().replace('-', '')}
                </span>
              </p>
            ) : // if count is greater than maxCount change "over limit" text to orange
            count > maxCount ? (
              <p>
                Characters: {count} / Max: {maxCount} /{' '}
                <span className='text-yellow-500'>
                  Over Limit:
                  {(maxCount - count).toString().replace('-', '')}
                </span>
              </p>
            ) : (
              <p>
                Characters: {count} / Max: {maxCount} / Left: {maxCount - count}
              </p>
            )}{' '}
          </div>

          {/* Text field */}
          <textarea
            type='text'
            rows={4} // eslint-disable-next-line
            className='w-full px-2 py-1 text-left border-gray-300 rounded shadow-sm h-60 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50'
            onChange={(e) => {
              const inputValue = e.target.value;
              // allow only one space in between words
              let formattedValue = '';
              let previousChar = '';
              for (let i = 0; i < inputValue.length; i++) {
                const currentChar = inputValue[i];

                if (currentChar !== ' ' || previousChar !== ' ') {
                  formattedValue += currentChar;
                }
                previousChar = currentChar;
              }
              setCount(formattedValue.length);
              setSeoText(formattedValue);
              setCopied(false);
            }}
          />
        </form>

        {/* Copy to clipboard */}
        <div className='flex justify-end pt-2'>
          <CopyToClipboard text={seoText} onCopy={() => setCopied(true)}>
            <button className='p-1 px-2 bg-white border-gray-300 rounded border-sm hover:bg-green-500 hover:text-white'>
              Copy Text
            </button>
          </CopyToClipboard>
          {/* if copied and seoText exists show copy symbol after click on button */}
          {copied ? <span className='pl-2 text-green-500'>✓</span> : null}
        </div>

        {/*Progress Bar */}
        <div className='pr-1'>
          {progressBar.map((item, id) => (
            <ProgressBar
              key={id}
              bgcolor={item.bgcolor}
              completed={item.completed}
              completedColor={item.completedColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
