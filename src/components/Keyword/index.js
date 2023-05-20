import React from 'react';

function Keyword({ keyword, seoText, onRemove }) {
  const keyword_style = 'flex mb-1 pr-1.5 self-start ';
  const _active = 'font-medium text-green-700';
  let className = keyword_style;

  // change keyword-style to 'keyword_active' if keyword match to the seo text
  seoText
    .toString()
    .toLowerCase()
    .split(' ')
    .map((seoPlainText) => {
      return (seoPlainText === keyword.toString().toLowerCase()) &
        (className !== '_active')
        ? (className += ' ' + _active)
        : seoText;
    });

  return (
    <div className={className}>
      <span>{keyword}</span>

      {/* remove keyword */}
      <button
        className='text-xs mb-2 ml-0.5 border-0 cursor-pointer text-red-900'
        onClick={onRemove}
      >
        x
      </button>
    </div>
  );
}
export default Keyword;
