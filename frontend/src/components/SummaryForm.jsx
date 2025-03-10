import { useState } from 'react';

const SummaryForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [maxLength, setMaxLength] = useState(150);
  const [minLength, setMinLength] = useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < 10) {
      alert('Please enter at least 10 characters to Summarise');
      return;
    }

    onSubmit(text, {
      maxLength,
      minLength,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="text" className="block mb-2 font-medium">
          Enter text to Summarise:
        </label>
        <textarea
          id="text"
          rows="8"
          className="w-full p-2.5 border rounded-lg"
          placeholder="Paste your article, document, or any text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
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