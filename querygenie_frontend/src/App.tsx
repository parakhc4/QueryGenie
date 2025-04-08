import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [sql, setSql] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setSql('');
    setResult(null);

    try {
      const res = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      console.log("🔁 API response:", data); 
      setSql(data.sql);
      setResult(data.response); // ✅ match what the backend sends      
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🧞‍♂️ QueryGenie</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask a question like: show all books after 2020"
        rows={4}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Thinking...' : 'Generate & Run SQL'}
      </button>

      {sql && (
        <>
          <h3>🧠 SQL:</h3>
          <pre>{sql}</pre>
        </>
      )}

      {result && (
        <>
          <h3>📄 Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;