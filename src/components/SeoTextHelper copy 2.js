import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ProgressBar from './ProgressBar';
import Keyword from './Keyword';

export default function SeoTextHelper() {
  const [copied, setCopied] = useState(false); // State for tracking copy to clipboard action
  // eslint-disable-next-line
  const [data, setData] = useState(''); // State for storing data
  const [count, setCount] = useState(0); // Count of characters
  const [maxCount, setMaxCount] = useState(130); // Maximum character count
  const [keywords, setKeywords] = useState([{ name: 'great product' }]); // Keywords list
  const [newKeyword, setNewKeyword] = useState(''); // New keyword input
  const [keywordExist, setKeywordExist] = useState(false); // Flag for checking if keyword already exists
  const [seoText, setSeoText] = useState(''); // SEO text input

  // Add keyword only if it doesn't exist (not case-sensitive)
  const add = (keyword) => {
    if (keywords.some((item) => item.name === keyword.name.toLowerCase())) {
      setKeywordExist(true);
      console.log('KEYWORD EXIST');
      return;
    }
    setKeywords([...keywords, keyword]);
  };

  // Remove keyword
  const remove = (index) => {
    setKeywords([...keywords.slice(0, index), ...keywords.slice(index + 1)]);
  };

  // Handle click on add keyword button
  const handleAddClick = () => {
    if (newKeyword === '') {
      return;
    }
    add({ name: newKeyword });
    setNewKeyword('');
    setKeywordExist(false);
    console.log('newKeyword: ', newKeyword);
  };

  // Handle adding new keyword when Enter is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddClick();
    }
  };

  // Generate array of unique keywords from the keyword list
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

  if (count > maxCount * 1) {
    barColor = 'orange';
  }

  if (count > maxCount * 1.2) {
    barColor = 'red';
  }

  if (count >= maxCount * 1.2) {
    countBarMax = 120;
  }

  const progressBar = [
    { bgcolor: barColor, completed: countBar, completedColor: countBarMax },
  ];

  return (
    <div className='flex w-[600px] justify-center'>
      <div className='max-w-4xl p-3 my-2 bg-gray-300 rounded-md sm:w-11/12 sm:mt-10 sm:p-8'>
        <h1 className='text-2xl font-semibold text-center uppercase'>
          SEO Text Helper
        </h1>

        {/* Keywords */}
        <div className='flex flex-col self-start mt-4'>
          <p className='text-sm font-bold uppercase'>Keywords:</p>

          {/* Keyword list */}
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

          {/* Keyword input */}
          <div className='flex justify-end text-center'>
            <input
              className='px-2 py-1 rounded'
              type='text'
              value={newKeyword}
              onChange={(event) => setNewKeyword(event.target.value.trim())}
              onKeyDown={handleKeyDown}
            />
            <button
              className='p-1 pl-2 pr-2 ml-2 bg-white border-gray-300 rounded border-sm hover:bg-green-500 hover:text-white'
              onClick={handleAddClick}
            >
              Add keyword
            </button>
            {/* Show error message if keyword already exists */}
            {keywordExist && (
              <span className='ml-2 text-sm text-red-500'>
                Keyword already exists
              </span>
            )}
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
            />
            <p className='flex flex-col text-sm pt-2 font-bold uppercase pl-1.5 '>
              Characters
              <span className='text-xs font-thin lowercase'>
                (only Numbers)
              </span>
            </p>
          </div>

          <div className='pt-2 pl-0.5 pb-0.5 text-xs uppercase'>
            {/* Show character count and limit information */}
            {count > maxCount * 1.2 ? (
              <p>
                Characters: {count} / Max: {maxCount} /{' '}
                <span className='text-red-500'>
                  Over Limit: {(maxCount - count).toString().replace('-', '')}
                </span>
              </p>
            ) : count > maxCount ? (
              <p>
                Characters: {count} / Max: {maxCount} /{' '}
                <span className='text-yellow-500'>
                  Over Limit: {(maxCount - count).toString().replace('-', '')}
                </span>
              </p>
            ) : (
              <p>
                Characters: {count} / Max: {maxCount} / Left: {maxCount - count}
              </p>
            )}
          </div>

          {/* Text field */}
          <textarea
            type='text'
            rows={4}
            className='w-full px-2 py-1 text-left border-gray-300 rounded shadow-sm h-60 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50'
            value={seoText}
            onChange={(event) => {
              setData(event.target.value);
              setCount(event.target.value.length);
              setCopied(false);
              setSeoText(event.target.value);
              setKeywordExist(false);
            }}
          ></textarea>
        </form>

        {/* Progress bar */}
        <ProgressBar
          bgcolor={progressBar[0].bgcolor}
          completed={progressBar[0].completed}
          completedColor={progressBar[0].completedColor}
        />

        {/* Copy to clipboard button */}
        <CopyToClipboard text={seoText} onCopy={() => setCopied(true)}>
          <button
            className='px-4 py-2 mt-2 text-white bg-green-500 rounded shadow-md hover:bg-green-600'
            disabled={seoText === ''}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
