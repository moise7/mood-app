import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, BookOpen, Lightbulb, Book, Headphones } from 'lucide-react';
import './App.css';

const MoodImprovementApp = () => {
  const [step, setStep] = useState('initial');
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [summary, setSummary] = useState('');
  const [name, setName] = useState('');

  const questions = [
    "What's your name?",
    "How would you rate your current mood on a scale of 1-10?",
    "What's the primary emotion you're feeling right now?",
    "Have you experienced any significant events recently that might be affecting your mood?",
    "How well did you sleep last night?",
    "Have you engaged in any activities today that usually make you feel good?"
  ];

  const handleNext = () => {
    if (currentAnswer.trim() !== '') {
      if (currentQuestion === 0) {
        setName(currentAnswer);
      }
      setAnswers({...answers, [currentQuestion]: currentAnswer});
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentAnswer('');
      } else {
        generateSummary();
        setStep('summary');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const handleDelete = () => {
    setCurrentAnswer('');
  };

  const generateSummary = () => {
    const moodScore = parseInt(answers[1]) || 5;
    const primaryEmotion = answers[2].toLowerCase();
    let summaryText = '';

    if (moodScore <= 4) {
      summaryText = `${name}, it seems you're having a challenging day, feeling ${primaryEmotion}. Remember, even in our lowest moments, God is with us. As Psalm 34:18 says, "The Lord is close to the brokenhearted and saves those who are crushed in spirit." Let's focus on uplifting your spirit and finding comfort in faith.`;
    } else if (moodScore <= 7) {
      summaryText = `${name}, you're in a moderate mood today, experiencing ${primaryEmotion}. This is a great opportunity for growth and reflection. Proverbs 3:5-6 reminds us, "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." Let's explore ways to deepen your faith and find more joy in your day.`;
    } else {
      summaryText = `${name}, it's wonderful to see you in high spirits, feeling ${primaryEmotion}! As James 1:17 says, "Every good and perfect gift is from above, coming down from the Father of the heavenly lights." Let's channel this positive energy into gratitude and spreading God's love to others.`;
    }

    setSummary(summaryText);
  };

  const generateRecommendations = () => {
    const moodScore = parseInt(answers[1]) || 5;
    const primaryEmotion = answers[2].toLowerCase();

    const getRandomItems = (array, count) => array.sort(() => 0.5 - Math.random()).slice(0, count);

    const lowMoodItems = {
      songs: ["'You Say' by Lauren Daigle", "'Reckless Love' by Cory Asbury", "'Way Maker' by Leeland", "'Even If' by MercyMe", "'Trust in You' by Lauren Daigle"],
      books: ["'The Purpose Driven Life' by Rick Warren", "'Anxious for Nothing' by Max Lucado", "'It's Not Supposed to Be This Way' by Lysa TerKeurst"],
      activities: ["Take a 15-minute prayer walk", "Journal your thoughts and prayers", "Call a friend from church for support", "Meditate on a comforting Bible verse"],
      bibleVerses: ["Philippians 4:13", "Isaiah 41:10", "Psalm 23:4", "2 Corinthians 1:3-4", "Matthew 11:28-30"],
      podcasts: ["'Pray Every Day' by Mary DeMuth", "'Glorify: Devotional & Meditation' by Glorify App", "'Daily Hope with Rick Warren'", "'Knowing Faith' by The Village Church"]
    };

    const mediumMoodItems = {
      songs: ["'Good Good Father' by Chris Tomlin", "'Oceans (Where Feet May Fail)' by Hillsong UNITED", "'Gracefully Broken' by Matt Redman", "'Build My Life' by Pat Barrett", "'Great Are You Lord' by All Sons & Daughters"],
      books: ["'Battlefield of the Mind' by Joyce Meyer", "'Mere Christianity' by C.S. Lewis", "'The Practice of the Presence of God' by Brother Lawrence"],
      activities: ["Practice gratitude by listing 5 blessings", "Memorize a new Bible verse", "Volunteer at a local charity", "Attend a Bible study group"],
      bibleVerses: ["Jeremiah 29:11", "Romans 8:28", "Proverbs 3:5-6", "Philippians 4:6-7", "Joshua 1:9"],
      podcasts: ["'The Bible Project' by Tim Mackie & Jon Collins", "'Solid Joys Daily Devotional' by John Piper", "'The Proverbs 31 Ministries Podcast'", "'Ask Pastor John' by Desiring God"]
    };

    const highMoodItems = {
      songs: ["'Joyful, Joyful, We Adore Thee' by Casting Crowns", "'My Testimony' by Elevation Worship", "'Alive' by Hillsong Young & Free", "'Happy Dance' by MercyMe", "'Chain Breaker' by Zach Williams"],
      books: ["'The Ragamuffin Gospel' by Brennan Manning", "'Love Does' by Bob Goff", "'Unstoppable' by Christine Caine"],
      activities: ["Share a positive testimony at church", "Write a thank-you note to someone who blessed you", "Organize a community prayer group", "Sing praises loudly and joyfully"],
      bibleVerses: ["James 1:17", "Psalm 100:1-5", "1 Thessalonians 5:16-18", "Nehemiah 8:10", "Colossians 3:23-24"],
      podcasts: ["'Your Move with Andy Stanley'", "'The Happy Hour with Jamie Ivey'", "'Jesus Over Everything' by Lisa Whittle", "'The Briefing' by Albert Mohler"]
    };

    let selectedItems = {};

    if (moodScore <= 4) {
      selectedItems = lowMoodItems;
    } else if (moodScore <= 7) {
      selectedItems = mediumMoodItems;
    } else {
      selectedItems = highMoodItems;
    }

    setRecommendations({
      songs: getRandomItems(selectedItems.songs, 5),
      books: getRandomItems(selectedItems.books, 3),
      activities: getRandomItems(selectedItems.activities, 4),
      bibleVerses: getRandomItems(selectedItems.bibleVerses, 5),
      podcasts: getRandomItems(selectedItems.podcasts, 4)
    });

    setStep('analysis');
  };

  const renderQuestion = () => (
    <Card className="bg-white bg-opacity-90">
      <CardHeader>
        <CardTitle>{questions[currentQuestion]}</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentQuestion > 0 && (
          <Button onClick={handlePrevious} className="mr-2">
            Previous
          </Button>
        )}
        <Button onClick={handleDelete} className="mr-2">
          Delete
        </Button>
        <Button onClick={handleNext}>
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderSummary = () => (
    <Card className="bg-white bg-opacity-90">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setStep('initial')}>Restart</Button>
        <Button onClick={generateRecommendations}>Get Recommendations</Button>
      </CardFooter>
    </Card>
  );

  const renderRecommendations = () => (
    <Card className="bg-white bg-opacity-90">
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="music">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="music"><Music className="mr-2 h-4 w-4" />Music</TabsTrigger>
            <TabsTrigger value="books"><BookOpen className="mr-2 h-4 w-4" />Books</TabsTrigger>
            <TabsTrigger value="activities"><Lightbulb className="mr-2 h-4 w-4" />Activities</TabsTrigger>
            <TabsTrigger value="verses"><Book className="mr-2 h-4 w-4" />Bible Verses</TabsTrigger>
            <TabsTrigger value="podcasts"><Headphones className="mr-2 h-4 w-4" />Podcasts</TabsTrigger>
          </TabsList>
          <TabsContent value="music">
            <ul>
              {recommendations.songs.map((song, index) => <li key={index}>{song}</li>)}
            </ul>
          </TabsContent>
          <TabsContent value="books">
            <ul>
              {recommendations.books.map((book, index) => <li key={index}>{book}</li>)}
            </ul>
          </TabsContent>
          <TabsContent value="activities">
            <ul>
              {recommendations.activities.map((activity, index) => <li key={index}>{activity}</li>)}
            </ul>
          </TabsContent>
          <TabsContent value="verses">
            <ul>
              {recommendations.bibleVerses.map((verse, index) => <li key={index}>{verse}</li>)}
            </ul>
          </TabsContent>
          <TabsContent value="podcasts">
            <ul>
              {recommendations.podcasts.map((podcast, index) => <li key={index}>{podcast}</li>)}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setStep('initial')}>Restart</Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-blue-500">
      {step === 'initial' && renderQuestion()}
      {step === 'summary' && renderSummary()}
      {step === 'analysis' && renderRecommendations()}
    </div>
  );
};

export default MoodImprovementApp;
