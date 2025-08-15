import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateIdeas = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setIdeas([]);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      setIdeas(data.ideas || []);
    } catch (err) {
      console.error(err);
      alert('Error generating ideas');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Conversation Starter Generator</h1>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g. sales, travel)"
        style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
      />
      <button onClick={generateIdeas} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      <ul style={{ marginTop: '1rem' }}>
        {ideas.map((idea, i) => (
          <li key={i}>{idea}</li>
        ))}
      </ul>
    </div>
  );
}
