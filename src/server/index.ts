import express from 'express';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';

const app = express();
app.use(express.json());

const router = express.Router();

// Helper Type for our new Database Structure
type GameState = {
  words: string[];
  authors: string[];
};

// 1. GET THE DATA
router.get('/api/init', async (_req, res) => {
  try {
    const rawData = await redis.get('gameState');
    // If no data exists, start with the default intro
    const state: GameState = rawData ? JSON.parse(rawData) : { 
      words: ['Once', 'upon', 'a', 'time...'], 
      authors: ['System', 'System', 'System', 'System'] 
    };
    
    const username = await reddit.getCurrentUsername();

    res.json({
      words: state.words,
      authors: state.authors,
      username: username ?? 'anonymous',
    });
  } catch (error) {
    console.error('Init Error:', error);
    res.status(500).json({ error: 'Failed to load game' });
  }
});

// 2. SUBMIT WORD & AUTHOR
router.post('/api/submit-word', async (req, res) => {
  const { word } = req.body;
  const username = await reddit.getCurrentUsername() || 'Anonymous';

  if (!word || typeof word !== 'string') return res.status(400).json({ error: 'Invalid input' });
  if (word.includes(' ')) return res.status(400).json({ error: 'One word only!' });
  if (word.length > 20) return res.status(400).json({ error: 'Word too long!' });

  try {
    // 1. Get current state
    const rawData = await redis.get('gameState');
    const state: GameState = rawData ? JSON.parse(rawData) : { 
      words: ['Once', 'upon', 'a', 'time...'], 
      authors: ['System', 'System', 'System', 'System'] 
    };
    
    // 2. Add new data
    state.words.push(word);
    state.authors.push(username);
    
    // 3. Save it back as JSON
    await redis.set('gameState', JSON.stringify(state));
    
    res.json({ success: true, words: state.words, authors: state.authors });

  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).json({ error: 'Failed to save word' });
  }
});

// 3. POST CREATION (Standard)
router.post('/internal/on-app-install', async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ status: 'success', postId: post.id });
  } catch (error) {
    console.error('Install Error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.post('/internal/menu/post-create', async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}` });
  } catch (error) {
    console.error('Menu Error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.use(router);
const server = createServer(app);
server.listen(getServerPort());
