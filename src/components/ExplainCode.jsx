import { useState } from 'react';
import Button from './Button';

const ExplainCode = () => {
  const [code, setCode] = useState("");
  const [explain, setExplain] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myApiKey, setMyApiKey] = useState(import.meta.env.VITE_OPENAI_API_KEY);

  const handleOnChange = (event) => {
    setCode(event.target.value);
  };

  const handleApiKey = (event) => {
    setMyApiKey(event.target.value);
  };

  const handleCallOpenAIAPI = () => {
    setLoading(true);
    setError(null);
    setExplain("");
    fetch("https://api.openai.com/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myApiKey}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: "Explain me this code like a profesional: " + code,
          temperature: 0,
          max_tokens: 150,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
          stop: ['"""'],
        }),
      })
      .then((response) => {
        if (!response.ok)
        {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })

      .then((data) => {
        setExplain(data.choices[0].text);
      })

      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='container'>
      <h1>Explain my code - OpenAI React app</h1>
      <ul>
        <li>Please enter your code and OpenAI API key below, then click the submit button.</li>
        <li>The submit button won't function if the code text area is empty.</li>
        <li>Please avoid inserting lengthy text.</li>
      </ul>
      <textarea
        placeholder="Give me your code and I'll give you my answer 🧞‍♀️"
        className='textArea'
        onChange={ handleOnChange }></textarea>
      <input placeholder='insert your API Key' className='apiKeyInput'
        onChange={ handleApiKey } type="password" />
      <Button disabled={ code === "" } onClick={ handleCallOpenAIAPI } />
      { loading ? <p className='text'>Loading...</p> : null }
      { error ? <p className='text'>{ error }</p> : null }
      { explain !== "" ? <p className='text'>{ explain }</p> : null }
    </div>
  );
};

export default ExplainCode;