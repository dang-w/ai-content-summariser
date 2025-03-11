import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const SummaryForm = ({ onSubmit }) => {
  const [inputType, setInputType] = useState('text'); // 'text' or 'url'
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [maxLength, setMaxLength] = useState(150);
  const [minLength, setMinLength] = useState(50);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [doSample, setDoSample] = useState(false);
  const [temperature, setTemperature] = useState(1.0);
  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    console.log(`Debounced text length: ${debouncedText.length}`);
  }, [debouncedText]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputType === 'text') {
      if (text.trim().length < 10) {
        alert('Please enter at least 10 characters to summarise');
        return;
      }

      onSubmit({
        type: 'text',
        content: text,
        options: {
          maxLength,
          minLength,
          doSample,
          temperature
        }
      });
    } else {
      if (!url.trim()) {
        alert('Please enter a valid URL');
        return;
      }

      onSubmit({
        type: 'url',
        content: url,
        options: {
          maxLength,
          minLength,
          doSample,
          temperature
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <div className="flex mb-4">
          <button
            type="button"
            className={`px-4 py-2 ${
              inputType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            } rounded-l-lg`}
            onClick={() => setInputType('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${
              inputType === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            } rounded-r-lg`}
            onClick={() => setInputType('url')}
          >
            URL
          </button>
        </div>

        {inputType === 'text' ? (
          <>
            <label htmlFor="text" className="block mb-2 font-medium">
              Enter text to summarise:
            </label>
            <textarea
              id="text"
              rows="8"
              className="w-full p-2.5 border rounded-lg"
              placeholder="Paste your article, document, or any text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required={inputType === 'text'}
            />
          </>
        ) : (
          <>
            <label htmlFor="url" className="block mb-2 font-medium">
              Enter URL to summarise:
            </label>
            <input
              id="url"
              type="url"
              className="w-full p-2.5 border rounded-lg"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required={inputType === 'url'}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="minLength" className="block mb-2 font-medium">
            Minimum Length: {minLength}
          </label>
          <input
            id="minLength"
            type="range"
            min="10"
            max="200"
            step="10"
            value={minLength}
            onChange={(e) => setMinLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="maxLength" className="block mb-2 font-medium">
            Maximum Length: {maxLength}
          </label>
          <input
            id="maxLength"
            type="range"
            min="30"
            max="500"
            step="10"
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => setAdvancedOpen(!advancedOpen)}
        >
          {advancedOpen ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>

        {advancedOpen && (
          <div className="mt-2 p-4 border rounded-lg">
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={doSample}
                  onChange={(e) => setDoSample(e.target.checked)}
                  className="mr-2"
                />
                Use sampling (more creative but less accurate)
              </label>
            </div>

            {doSample && (
              <div>
                <label htmlFor="temperature" className="block mb-2 font-medium">
                  Temperature: {temperature.toFixed(1)}
                </label>
                <input
                  id="temperature"
                  type="range"
                  min="0.7"  // Increased minimum to 0.7
                  max="2.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Recommended range:</strong> 0.7-2.0. Higher values produce more diverse summaries,
                  lower values are more focused. Values below 0.7 may cause errors with some texts.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
      >
        Summarise
      </button>
    </form>
  );
};

export default SummaryForm;
