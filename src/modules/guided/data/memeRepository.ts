import { MemeItem } from '../types/guided.types';

export const memeRepository: MemeItem[] = [
  {
    id: 'meme-01',
    subreddit: 'r/ProgrammerHumor',
    author: 'u/async_dev',
    timeAgo: '3h ago',
    caption: 'Git commit logs throughout a Friday sprint:',
    codeLines: [
      { label: '10:00 AM:', text: 'feat: add initial product router setup', color: '#4ADE80' },
      { label: '11:30 AM:', text: 'fix: resolve router export typo', color: '#FBBF24' },
      { label: '01:15 PM:', text: 'fix: why is this request null in production', color: '#FB7185' },
      { label: '02:00 PM:', text: 'fix: PLEASE WORK FOR THE LOVE OF GOD', color: '#F43F5E' },
      { label: '02:05 PM:', text: 'refactor: clean up comments and pretend it was intentional', color: '#38BDF8' },
    ],
    upvotes: '2.8k upvotes',
    commentsCount: 142,
  },
  {
    id: 'meme-02',
    subreddit: 'r/WebDevHumor',
    author: 'u/fullstack_warrior',
    timeAgo: '5h ago',
    caption: 'Debugging asynchronous JavaScript without console.log:',
    codeLines: [
      { label: 'Code:', text: 'const data = fetchData();', color: '#38BDF8' },
      { label: 'Expectation:', text: 'data = { id: 1, title: "Task" }', color: '#4ADE80' },
      { label: 'Reality:', text: 'Promise { <pending> }', color: '#FB7185' },
      { label: 'Reaction:', text: 'await await await await async please()', color: '#FBBF24' },
    ],
    upvotes: '4.1k upvotes',
    commentsCount: 215,
  },
  {
    id: 'meme-03',
    subreddit: 'r/ProgrammerHumor',
    author: 'u/mern_master',
    timeAgo: '1d ago',
    caption: 'Senior Developer reviewing junior PR with 47 modified files:',
    codeLines: [
      { label: 'PR Title:', text: '"Quick typo fix in README.md"', color: '#A855F7' },
      { label: 'Changed:', text: '+4,821 lines  -2,901 lines (includes node_modules)', color: '#F43F5E' },
      { label: 'Comment:', text: '"Looks good to me, merging straight to main 🚀"', color: '#4ADE80' },
    ],
    upvotes: '5.9k upvotes',
    commentsCount: 389,
  },
];
