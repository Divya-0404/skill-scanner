import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, BrainCircuit } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizGeneratorProps {
  onQuizGenerated: (questions: QuizQuestion[]) => void;
}

// Pregenerated quiz questions for different professions
const professionQuestions: Record<string, QuizQuestion[]> = {
  'Software Developer': [
    {
      id: 'sd1',
      question: 'Which programming paradigm emphasizes functions as first-class citizens?',
      options: ['Object-Oriented Programming', 'Functional Programming', 'Procedural Programming', 'Imperative Programming'],
      correctAnswer: 1,
      category: 'Programming Concepts',
      difficulty: 'medium'
    },
    {
      id: 'sd2',
      question: 'What does API stand for?',
      options: ['Advanced Programming Interface', 'Application Programming Interface', 'Automated Program Integration', 'Application Process Interface'],
      correctAnswer: 1,
      category: 'Web Development',
      difficulty: 'easy'
    },
    {
      id: 'sd3',
      question: 'In version control, what does "git merge" do?',
      options: ['Deletes a branch', 'Creates a new branch', 'Combines changes from different branches', 'Reverts to previous commit'],
      correctAnswer: 2,
      category: 'Version Control',
      difficulty: 'medium'
    },
    {
      id: 'sd4',
      question: 'What is Big O notation used for?',
      options: ['Memory usage only', 'Algorithm complexity analysis', 'Code documentation', 'Error handling'],
      correctAnswer: 1,
      category: 'Algorithms',
      difficulty: 'medium'
    },
    {
      id: 'sd5',
      question: 'Which SQL command is used to retrieve data?',
      options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
      correctAnswer: 2,
      category: 'Database',
      difficulty: 'easy'
    },
    {
      id: 'sd6',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 1,
      category: 'Algorithms',
      difficulty: 'medium'
    },
    {
      id: 'sd7',
      question: 'In object-oriented programming, what is encapsulation?',
      options: ['Creating multiple objects', 'Hiding internal details of a class', 'Inheriting from parent class', 'Overriding methods'],
      correctAnswer: 1,
      category: 'OOP',
      difficulty: 'medium'
    },
    {
      id: 'sd8',
      question: 'What does REST stand for in web services?',
      options: ['Representational State Transfer', 'Remote Estate Transfer', 'Relational State Transaction', 'Resource State Transfer'],
      correctAnswer: 0,
      category: 'Web Development',
      difficulty: 'medium'
    },
    {
      id: 'sd9',
      question: 'Which data structure uses LIFO (Last In, First Out)?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 1,
      category: 'Data Structures',
      difficulty: 'easy'
    },
    {
      id: 'sd10',
      question: 'What is a closure in programming?',
      options: ['A way to close programs', 'A function that has access to outer scope variables', 'A type of loop', 'A memory management technique'],
      correctAnswer: 1,
      category: 'Programming Concepts',
      difficulty: 'hard'
    },
    {
      id: 'sd11',
      question: 'In agile methodology, what is a sprint?',
      options: ['A fast coding session', 'A time-boxed development period', 'A type of testing', 'A deployment process'],
      correctAnswer: 1,
      category: 'Software Development',
      difficulty: 'easy'
    },
    {
      id: 'sd12',
      question: 'What does TDD stand for?',
      options: ['Total Driven Development', 'Test Driven Development', 'Type Driven Development', 'Task Driven Development'],
      correctAnswer: 1,
      category: 'Testing',
      difficulty: 'medium'
    },
    {
      id: 'sd13',
      question: 'Which HTTP status code indicates a successful request?',
      options: ['404', '500', '200', '302'],
      correctAnswer: 2,
      category: 'Web Development',
      difficulty: 'easy'
    },
    {
      id: 'sd14',
      question: 'What is polymorphism in OOP?',
      options: ['Having multiple constructors', 'Using multiple inheritance', 'Same interface for different data types', 'Creating abstract classes'],
      correctAnswer: 2,
      category: 'OOP',
      difficulty: 'hard'
    },
    {
      id: 'sd15',
      question: 'In database design, what is normalization?',
      options: ['Making data normal', 'Organizing data to reduce redundancy', 'Creating backup copies', 'Indexing tables'],
      correctAnswer: 1,
      category: 'Database',
      difficulty: 'medium'
    },
    {
      id: 'sd16',
      question: 'What is the purpose of a hash table?',
      options: ['Sorting data', 'Fast data retrieval using keys', 'Storing files', 'Network communication'],
      correctAnswer: 1,
      category: 'Data Structures',
      difficulty: 'medium'
    },
    {
      id: 'sd17',
      question: 'In Git, what does "git pull" do?',
      options: ['Pushes changes to remote', 'Fetches and merges changes from remote', 'Creates a new branch', 'Deletes local changes'],
      correctAnswer: 1,
      category: 'Version Control',
      difficulty: 'easy'
    },
    {
      id: 'sd18',
      question: 'What is the difference between == and === in JavaScript?',
      options: ['No difference', '== checks type and value, === checks value only', '=== checks type and value, == checks value only', 'Both are deprecated'],
      correctAnswer: 2,
      category: 'JavaScript',
      difficulty: 'medium'
    },
    {
      id: 'sd19',
      question: 'What is a microservice architecture?',
      options: ['Very small applications', 'Applications broken into small, independent services', 'A type of database', 'A programming language'],
      correctAnswer: 1,
      category: 'Architecture',
      difficulty: 'hard'
    },
    {
      id: 'sd20',
      question: 'What does CI/CD stand for?',
      options: ['Code Integration/Code Deployment', 'Continuous Integration/Continuous Deployment', 'Central Integration/Central Deployment', 'Custom Integration/Custom Deployment'],
      correctAnswer: 1,
      category: 'DevOps',
      difficulty: 'medium'
    }
  ],

  'Data Scientist': [
    {
      id: 'ds1',
      question: 'Which Python library is primarily used for data manipulation and analysis?',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
      correctAnswer: 1,
      category: 'Python Libraries',
      difficulty: 'easy'
    },
    {
      id: 'ds2',
      question: 'What does ETL stand for in data processing?',
      options: ['Extract, Transform, Load', 'Evaluate, Test, Launch', 'Export, Transfer, Link', 'Explore, Train, Learn'],
      correctAnswer: 0,
      category: 'Data Processing',
      difficulty: 'medium'
    },
    {
      id: 'ds3',
      question: 'In machine learning, what is overfitting?',
      options: ['Model performs well on all data', 'Model performs well on training data but poorly on new data', 'Model is too simple', 'Model has too few parameters'],
      correctAnswer: 1,
      category: 'Machine Learning',
      difficulty: 'medium'
    },
    {
      id: 'ds4',
      question: 'What is the purpose of cross-validation?',
      options: ['To increase model complexity', 'To evaluate model performance on unseen data', 'To clean data', 'To visualize results'],
      correctAnswer: 1,
      category: 'Model Evaluation',
      difficulty: 'medium'
    },
    {
      id: 'ds5',
      question: 'Which statistical measure indicates the middle value of a dataset?',
      options: ['Mean', 'Median', 'Mode', 'Standard Deviation'],
      correctAnswer: 1,
      category: 'Statistics',
      difficulty: 'easy'
    },
    {
      id: 'ds6',
      question: 'What is a p-value in hypothesis testing?',
      options: ['The probability of the hypothesis being true', 'The probability of observing results given the null hypothesis is true', 'The power of the test', 'The sample size needed'],
      correctAnswer: 1,
      category: 'Statistics',
      difficulty: 'hard'
    },
    {
      id: 'ds7',
      question: 'In supervised learning, what is the difference between regression and classification?',
      options: ['No difference', 'Regression predicts continuous values, classification predicts categories', 'Classification predicts continuous values, regression predicts categories', 'Both predict the same type of output'],
      correctAnswer: 1,
      category: 'Machine Learning',
      difficulty: 'medium'
    },
    {
      id: 'ds8',
      question: 'What is the curse of dimensionality?',
      options: ['Having too few features', 'Problems that arise when working with high-dimensional data', 'Computational limitations', 'Data storage issues'],
      correctAnswer: 1,
      category: 'Machine Learning',
      difficulty: 'hard'
    },
    {
      id: 'ds9',
      question: 'Which algorithm is commonly used for clustering?',
      options: ['Linear Regression', 'K-Means', 'Decision Tree', 'Logistic Regression'],
      correctAnswer: 1,
      category: 'Unsupervised Learning',
      difficulty: 'easy'
    },
    {
      id: 'ds10',
      question: 'What is feature engineering?',
      options: ['Building software features', 'Creating or transforming variables for better model performance', 'Engineering team management', 'Database design'],
      correctAnswer: 1,
      category: 'Data Preprocessing',
      difficulty: 'medium'
    },
    {
      id: 'ds11',
      question: 'In SQL, which function calculates the average of a column?',
      options: ['SUM()', 'AVG()', 'MEAN()', 'AVERAGE()'],
      correctAnswer: 1,
      category: 'SQL',
      difficulty: 'easy'
    },
    {
      id: 'ds12',
      question: 'What is a confusion matrix used for?',
      options: ['Data visualization', 'Evaluating classification model performance', 'Data cleaning', 'Feature selection'],
      correctAnswer: 1,
      category: 'Model Evaluation',
      difficulty: 'medium'
    },
    {
      id: 'ds13',
      question: 'Which technique is used to handle missing data?',
      options: ['Only delete rows with missing data', 'Imputation', 'Ignore missing values', 'Convert to text'],
      correctAnswer: 1,
      category: 'Data Preprocessing',
      difficulty: 'easy'
    },
    {
      id: 'ds14',
      question: 'What is the difference between Type I and Type II errors?',
      options: ['No difference', 'Type I: False positive, Type II: False negative', 'Type I: False negative, Type II: False positive', 'Both are the same type of error'],
      correctAnswer: 1,
      category: 'Statistics',
      difficulty: 'hard'
    },
    {
      id: 'ds15',
      question: 'In deep learning, what is backpropagation?',
      options: ['Moving data backwards', 'Algorithm for training neural networks by updating weights', 'A type of neural network', 'Data preprocessing technique'],
      correctAnswer: 1,
      category: 'Deep Learning',
      difficulty: 'hard'
    },
    {
      id: 'ds16',
      question: 'What is the purpose of regularization in machine learning?',
      options: ['To make models more complex', 'To prevent overfitting', 'To increase training speed', 'To visualize data'],
      correctAnswer: 1,
      category: 'Machine Learning',
      difficulty: 'medium'
    },
    {
      id: 'ds17',
      question: 'Which visualization is best for showing correlation between two continuous variables?',
      options: ['Bar chart', 'Scatter plot', 'Pie chart', 'Line chart'],
      correctAnswer: 1,
      category: 'Data Visualization',
      difficulty: 'easy'
    },
    {
      id: 'ds18',
      question: 'What is A/B testing?',
      options: ['Testing two different algorithms', 'Comparing two versions to determine which performs better', 'Testing data quality', 'Alphabetical testing'],
      correctAnswer: 1,
      category: 'Experimentation',
      difficulty: 'medium'
    },
    {
      id: 'ds19',
      question: 'In time series analysis, what is seasonality?',
      options: ['Random fluctuations', 'Predictable patterns that repeat over specific periods', 'Long-term trends', 'One-time events'],
      correctAnswer: 1,
      category: 'Time Series',
      difficulty: 'medium'
    },
    {
      id: 'ds20',
      question: 'What is the difference between supervised and unsupervised learning?',
      options: ['No difference', 'Supervised uses labeled data, unsupervised uses unlabeled data', 'Unsupervised uses labeled data, supervised uses unlabeled data', 'Both use the same type of data'],
      correctAnswer: 1,
      category: 'Machine Learning',
      difficulty: 'easy'
    }
  ],

  'UX Designer': [
    {
      id: 'ux1',
      question: 'What does UX stand for?',
      options: ['User Experience', 'User Exchange', 'Universal Experience', 'User Exploration'],
      correctAnswer: 0,
      category: 'Fundamentals',
      difficulty: 'easy'
    },
    {
      id: 'ux2',
      question: 'What is the purpose of user personas?',
      options: ['To represent real users and their needs', 'To create fictional stories', 'To test technical features', 'To design visual elements'],
      correctAnswer: 0,
      category: 'User Research',
      difficulty: 'easy'
    },
    {
      id: 'ux3',
      question: 'In design thinking, what comes after empathizing with users?',
      options: ['Prototype', 'Test', 'Define', 'Ideate'],
      correctAnswer: 2,
      category: 'Design Process',
      difficulty: 'medium'
    },
    {
      id: 'ux4',
      question: 'What is a wireframe?',
      options: ['Final visual design', 'Low-fidelity structural blueprint of a page', 'User testing results', 'Marketing material'],
      correctAnswer: 1,
      category: 'Design Tools',
      difficulty: 'easy'
    },
    {
      id: 'ux5',
      question: 'Which principle states that similar elements should be grouped together?',
      options: ['Proximity', 'Alignment', 'Contrast', 'Repetition'],
      correctAnswer: 0,
      category: 'Design Principles',
      difficulty: 'medium'
    },
    {
      id: 'ux6',
      question: 'What is the difference between UX and UI?',
      options: ['No difference', 'UX focuses on overall experience, UI focuses on visual interface', 'UI focuses on overall experience, UX focuses on visual interface', 'They are the same thing'],
      correctAnswer: 1,
      category: 'Fundamentals',
      difficulty: 'easy'
    },
    {
      id: 'ux7',
      question: 'What is A/B testing in UX?',
      options: ['Testing two different user groups', 'Comparing two versions of design to see which performs better', 'Testing accessibility features', 'Testing loading speed'],
      correctAnswer: 1,
      category: 'Testing',
      difficulty: 'medium'
    },
    {
      id: 'ux8',
      question: 'What is the purpose of user journey mapping?',
      options: ['To create travel routes', 'To visualize the user\'s experience across touchpoints', 'To map website architecture', 'To plan project timelines'],
      correctAnswer: 1,
      category: 'User Research',
      difficulty: 'medium'
    },
    {
      id: 'ux9',
      question: 'Which method is best for understanding user behavior through observation?',
      options: ['Surveys', 'Interviews', 'Ethnographic research', 'Analytics'],
      correctAnswer: 2,
      category: 'Research Methods',
      difficulty: 'medium'
    },
    {
      id: 'ux10',
      question: 'What is information architecture?',
      options: ['Building architecture for websites', 'Organizing and structuring content in a logical way', 'Technical system architecture', 'Visual design layout'],
      correctAnswer: 1,
      category: 'Information Architecture',
      difficulty: 'medium'
    },
    {
      id: 'ux11',
      question: 'What is the 10 Usability Heuristics referring to?',
      options: ['Jakob Nielsen\'s principles for interface design', 'Ten steps in design process', 'Ten types of users', 'Ten design tools'],
      correctAnswer: 0,
      category: 'Usability',
      difficulty: 'hard'
    },
    {
      id: 'ux12',
      question: 'What is the purpose of card sorting?',
      options: ['Organizing design files', 'Understanding how users categorize information', 'Prioritizing features', 'Testing visual hierarchy'],
      correctAnswer: 1,
      category: 'Information Architecture',
      difficulty: 'medium'
    },
    {
      id: 'ux13',
      question: 'In accessibility, what does WCAG stand for?',
      options: ['Web Content Accessibility Guidelines', 'World Content Access Group', 'Web Content Access Guide', 'World Cultural Access Guidelines'],
      correctAnswer: 0,
      category: 'Accessibility',
      difficulty: 'hard'
    },
    {
      id: 'ux14',
      question: 'What is the recommended minimum touch target size for mobile interfaces?',
      options: ['24px', '44px', '64px', '84px'],
      correctAnswer: 1,
      category: 'Mobile Design',
      difficulty: 'hard'
    },
    {
      id: 'ux15',
      question: 'What is progressive disclosure in UX design?',
      options: ['Gradually revealing information to avoid overwhelming users', 'Progressive web apps', 'Advance design techniques', 'Sequential user testing'],
      correctAnswer: 0,
      category: 'Design Patterns',
      difficulty: 'hard'
    },
    {
      id: 'ux16',
      question: 'What is the main goal of usability testing?',
      options: ['To test technical functionality', 'To identify usability problems and understand user behavior', 'To validate business requirements', 'To test visual design'],
      correctAnswer: 1,
      category: 'Testing',
      difficulty: 'easy'
    },
    {
      id: 'ux17',
      question: 'What is a design system?',
      options: ['Software for designing', 'Collection of reusable components and guidelines', 'Design process methodology', 'Team organization structure'],
      correctAnswer: 1,
      category: 'Design Systems',
      difficulty: 'medium'
    },
    {
      id: 'ux18',
      question: 'What is the purpose of affinity mapping?',
      options: ['Creating user personas', 'Grouping related insights from research', 'Mapping user journeys', 'Designing wireframes'],
      correctAnswer: 1,
      category: 'Research Methods',
      difficulty: 'medium'
    },
    {
      id: 'ux19',
      question: 'What is Fitts\' Law?',
      options: ['Law about responsive design', 'Time to reach a target depends on distance and size', 'Color theory principle', 'Typography guideline'],
      correctAnswer: 1,
      category: 'Interaction Design',
      difficulty: 'hard'
    },
    {
      id: 'ux20',
      question: 'What is the difference between qualitative and quantitative research?',
      options: ['No difference', 'Qualitative explores why/how, quantitative measures what/how much', 'Quantitative explores why/how, qualitative measures what/how much', 'Both measure the same things'],
      correctAnswer: 1,
      category: 'Research Methods',
      difficulty: 'medium'
    }
  ],

  'Marketing Manager': [
    {
      id: 'mm1',
      question: 'What does ROI stand for in marketing?',
      options: ['Return on Investment', 'Rate of Interest', 'Revenue of Investment', 'Return of Income'],
      correctAnswer: 0,
      category: 'Metrics',
      difficulty: 'easy'
    },
    {
      id: 'mm2',
      question: 'What are the 4 Ps of marketing?',
      options: ['Product, Price, Place, Promotion', 'Plan, Price, People, Promotion', 'Product, People, Place, Process', 'Price, Place, People, Process'],
      correctAnswer: 0,
      category: 'Marketing Mix',
      difficulty: 'easy'
    },
    {
      id: 'mm3',
      question: 'What is a customer persona?',
      options: ['A real customer', 'A fictional representation of ideal customer', 'A customer complaint', 'A customer survey'],
      correctAnswer: 1,
      category: 'Customer Research',
      difficulty: 'easy'
    },
    {
      id: 'mm4',
      question: 'What does CRM stand for?',
      options: ['Customer Relationship Management', 'Customer Revenue Management', 'Customer Retention Model', 'Customer Response Mechanism'],
      correctAnswer: 0,
      category: 'Customer Management',
      difficulty: 'easy'
    },
    {
      id: 'mm5',
      question: 'What is A/B testing in marketing?',
      options: ['Testing two different products', 'Comparing two versions of marketing material', 'Testing customer satisfaction', 'Testing market size'],
      correctAnswer: 1,
      category: 'Testing',
      difficulty: 'medium'
    },
    {
      id: 'mm6',
      question: 'What is the marketing funnel?',
      options: ['A tool for data analysis', 'The journey from prospect to customer', 'A budget allocation method', 'A team structure'],
      correctAnswer: 1,
      category: 'Customer Journey',
      difficulty: 'medium'
    },
    {
      id: 'mm7',
      question: 'What does CTR stand for in digital marketing?',
      options: ['Cost to Reach', 'Click Through Rate', 'Customer Retention Rate', 'Conversion Track Rate'],
      correctAnswer: 1,
      category: 'Digital Marketing',
      difficulty: 'medium'
    },
    {
      id: 'mm8',
      question: 'What is content marketing?',
      options: ['Selling content', 'Creating valuable content to attract customers', 'Analyzing content performance', 'Distributing press releases'],
      correctAnswer: 1,
      category: 'Content Strategy',
      difficulty: 'easy'
    },
    {
      id: 'mm9',
      question: 'What is the purpose of market segmentation?',
      options: ['To divide marketing budget', 'To group customers with similar characteristics', 'To separate competitors', 'To organize marketing team'],
      correctAnswer: 1,
      category: 'Market Analysis',
      difficulty: 'medium'
    },
    {
      id: 'mm10',
      question: 'What does KPI stand for?',
      options: ['Key Performance Indicator', 'Key Product Information', 'Key Process Integration', 'Key Personnel Instruction'],
      correctAnswer: 0,
      category: 'Metrics',
      difficulty: 'easy'
    },
    {
      id: 'mm11',
      question: 'What is brand positioning?',
      options: ['Physical location of brand', 'How brand is perceived in customer minds relative to competitors', 'Brand logo placement', 'Brand advertising schedule'],
      correctAnswer: 1,
      category: 'Branding',
      difficulty: 'medium'
    },
    {
      id: 'mm12',
      question: 'What is influencer marketing?',
      options: ['Marketing to executives', 'Partnering with individuals who have influence over target audience', 'Marketing through traditional media', 'Internal company marketing'],
      correctAnswer: 1,
      category: 'Digital Marketing',
      difficulty: 'easy'
    },
    {
      id: 'mm13',
      question: 'What does CAC stand for?',
      options: ['Customer Acquisition Cost', 'Customer Account Creation', 'Customer Activity Center', 'Customer Approval Code'],
      correctAnswer: 0,
      category: 'Metrics',
      difficulty: 'medium'
    },
    {
      id: 'mm14',
      question: 'What is the purpose of lead scoring?',
      options: ['Scoring marketing campaigns', 'Ranking leads based on likelihood to convert', 'Evaluating team performance', 'Measuring customer satisfaction'],
      correctAnswer: 1,
      category: 'Lead Management',
      difficulty: 'medium'
    },
    {
      id: 'mm15',
      question: 'What is omnichannel marketing?',
      options: ['Marketing on one channel only', 'Providing consistent experience across all channels', 'Marketing to all customers equally', 'Using only digital channels'],
      correctAnswer: 1,
      category: 'Channel Strategy',
      difficulty: 'hard'
    },
    {
      id: 'mm16',
      question: 'What is programmatic advertising?',
      options: ['Manual ad placement', 'Automated buying and selling of ad inventory', 'Programming advertisements', 'Ad creation software'],
      correctAnswer: 1,
      category: 'Digital Advertising',
      difficulty: 'hard'
    },
    {
      id: 'mm17',
      question: 'What is customer lifetime value (CLV)?',
      options: ['How long a customer lives', 'Total revenue a customer generates over relationship', 'Customer service response time', 'Customer satisfaction score'],
      correctAnswer: 1,
      category: 'Customer Value',
      difficulty: 'medium'
    },
    {
      id: 'mm18',
      question: 'What is attribution modeling in marketing?',
      options: ['Giving credit to team members', 'Determining which touchpoints contribute to conversions', 'Creating customer profiles', 'Modeling market trends'],
      correctAnswer: 1,
      category: 'Analytics',
      difficulty: 'hard'
    },
    {
      id: 'mm19',
      question: 'What is remarketing/retargeting?',
      options: ['Selling the same product again', 'Advertising to people who previously interacted with brand', 'Changing marketing strategy', 'Targeting new markets'],
      correctAnswer: 1,
      category: 'Digital Advertising',
      difficulty: 'medium'
    },
    {
      id: 'mm20',
      question: 'What is the difference between reach and impressions?',
      options: ['No difference', 'Reach is unique people, impressions is total views', 'Impressions is unique people, reach is total views', 'Both measure the same thing'],
      correctAnswer: 1,
      category: 'Metrics',
      difficulty: 'medium'
    }
  ],

  'Project Manager': [
    {
      id: 'pm1',
      question: 'What does PMI stand for?',
      options: ['Project Management Institute', 'Project Manager Information', 'Project Management Integration', 'Project Management Implementation'],
      correctAnswer: 0,
      category: 'Certification',
      difficulty: 'easy'
    },
    {
      id: 'pm2',
      question: 'Which methodology emphasizes iterative development and collaboration?',
      options: ['Waterfall', 'Agile', 'Prince2', 'Critical Path'],
      correctAnswer: 1,
      category: 'Methodologies',
      difficulty: 'easy'
    },
    {
      id: 'pm3',
      question: 'What is the critical path in project management?',
      options: ['Most expensive tasks', 'Longest sequence of dependent tasks', 'Most important stakeholders', 'Riskiest project elements'],
      correctAnswer: 1,
      category: 'Scheduling',
      difficulty: 'medium'
    },
    {
      id: 'pm4',
      question: 'What are the five process groups in PMBOK?',
      options: ['Plan, Design, Build, Test, Deploy', 'Initiating, Planning, Executing, Monitoring, Closing', 'Analyze, Design, Develop, Implement, Maintain', 'Start, Plan, Do, Check, End'],
      correctAnswer: 1,
      category: 'PMBOK',
      difficulty: 'medium'
    },
    {
      id: 'pm5',
      question: 'What is a work breakdown structure (WBS)?',
      options: ['Team organizational chart', 'Hierarchical decomposition of project work', 'Budget breakdown', 'Timeline visualization'],
      correctAnswer: 1,
      category: 'Planning',
      difficulty: 'medium'
    },
    {
      id: 'pm6',
      question: 'What does ROI stand for in project context?',
      options: ['Return on Investment', 'Risk of Implementation', 'Rate of Interest', 'Resource Optimization Index'],
      correctAnswer: 0,
      category: 'Financial Management',
      difficulty: 'easy'
    },
    {
      id: 'pm7',
      question: 'In Scrum, what is a sprint?',
      options: ['A quick meeting', 'A time-boxed iteration', 'A type of user story', 'A planning session'],
      correctAnswer: 1,
      category: 'Scrum',
      difficulty: 'easy'
    },
    {
      id: 'pm8',
      question: 'What is the purpose of a risk register?',
      options: ['Track team performance', 'Document and track project risks', 'Register project stakeholders', 'Log project meetings'],
      correctAnswer: 1,
      category: 'Risk Management',
      difficulty: 'medium'
    },
    {
      id: 'pm9',
      question: 'What is stakeholder management?',
      options: ['Managing project budget', 'Identifying and engaging people affected by project', 'Managing project timeline', 'Managing project resources'],
      correctAnswer: 1,
      category: 'Stakeholder Management',
      difficulty: 'easy'
    },
    {
      id: 'pm10',
      question: 'What does MVP stand for in product development?',
      options: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value Proposition', 'Minimum Value Product'],
      correctAnswer: 1,
      category: 'Product Management',
      difficulty: 'easy'
    },
    {
      id: 'pm11',
      question: 'What is the triple constraint in project management?',
      options: ['Budget, Team, Timeline', 'Scope, Time, Cost', 'Quality, Risk, Resources', 'Planning, Executing, Closing'],
      correctAnswer: 1,
      category: 'Constraints',
      difficulty: 'medium'
    },
    {
      id: 'pm12',
      question: 'What is earned value management (EVM)?',
      options: ['Employee reward system', 'Method for measuring project performance', 'Revenue tracking method', 'Customer value assessment'],
      correctAnswer: 1,
      category: 'Performance Measurement',
      difficulty: 'hard'
    },
    {
      id: 'pm13',
      question: 'In Kanban, what does WIP stand for?',
      options: ['Work in Progress', 'Work in Process', 'Work Implementation Plan', 'Work Instruction Procedure'],
      correctAnswer: 0,
      category: 'Kanban',
      difficulty: 'medium'
    },
    {
      id: 'pm14',
      question: 'What is a project charter?',
      options: ['Legal document for company', 'Document that formally authorizes project', 'Team contract', 'Budget approval form'],
      correctAnswer: 1,
      category: 'Initiation',
      difficulty: 'medium'
    },
    {
      id: 'pm15',
      question: 'What is the purpose of a retrospective in Agile?',
      options: ['Plan future sprints', 'Review what went well and what can be improved', 'Demonstrate completed work', 'Estimate user stories'],
      correctAnswer: 1,
      category: 'Agile',
      difficulty: 'medium'
    },
    {
      id: 'pm16',
      question: 'What is scope creep?',
      options: ['Adding team members', 'Uncontrolled expansion of project scope', 'Reducing project timeline', 'Increasing project budget'],
      correctAnswer: 1,
      category: 'Scope Management',
      difficulty: 'easy'
    },
    {
      id: 'pm17',
      question: 'What is a Gantt chart used for?',
      options: ['Financial analysis', 'Project scheduling and timeline visualization', 'Team performance tracking', 'Risk assessment'],
      correctAnswer: 1,
      category: 'Scheduling Tools',
      difficulty: 'easy'
    },
    {
      id: 'pm18',
      question: 'What is the difference between a risk and an issue?',
      options: ['No difference', 'Risk is potential future problem, issue is current problem', 'Issue is potential future problem, risk is current problem', 'Both are the same'],
      correctAnswer: 1,
      category: 'Risk Management',
      difficulty: 'medium'
    },
    {
      id: 'pm19',
      question: 'What is change management in projects?',
      options: ['Changing project managers', 'Process for managing changes to project scope/requirements', 'Managing team changes', 'Changing project methodology'],
      correctAnswer: 1,
      category: 'Change Management',
      difficulty: 'medium'
    },
    {
      id: 'pm20',
      question: 'What is a lessons learned session?',
      options: ['Training session', 'Meeting to capture what worked and what didn\'t', 'Performance review', 'Project kickoff meeting'],
      correctAnswer: 1,
      category: 'Closure',
      difficulty: 'easy'
    }
  ],

  'Financial Analyst': [
    {
      id: 'fa1',
      question: 'What does NPV stand for?',
      options: ['Net Present Value', 'Net Profit Value', 'Net Purchase Value', 'Net Performance Value'],
      correctAnswer: 0,
      category: 'Valuation',
      difficulty: 'easy'
    },
    {
      id: 'fa2',
      question: 'What is the formula for Return on Equity (ROE)?',
      options: ['Net Income / Total Assets', 'Net Income / Shareholders Equity', 'Total Revenue / Total Equity', 'Operating Income / Total Equity'],
      correctAnswer: 1,
      category: 'Financial Ratios',
      difficulty: 'medium'
    },
    {
      id: 'fa3',
      question: 'What does EBITDA stand for?',
      options: ['Earnings Before Interest, Taxes, Depreciation, and Amortization', 'Equity Before Interest, Taxes, Debt, and Assets', 'Earnings Before Income, Taxes, Debt, and Assets', 'Equity Before Income, Taxes, Depreciation, and Amortization'],
      correctAnswer: 0,
      category: 'Financial Metrics',
      difficulty: 'medium'
    },
    {
      id: 'fa4',
      question: 'What is the time value of money principle?',
      options: ['Money today is worth more than same amount in future', 'Money in future is worth more than today', 'Money value never changes', 'Money loses value over time'],
      correctAnswer: 0,
      category: 'Finance Theory',
      difficulty: 'easy'
    },
    {
      id: 'fa5',
      question: 'What is working capital?',
      options: ['Total assets', 'Current assets minus current liabilities', 'Total equity', 'Fixed assets minus depreciation'],
      correctAnswer: 1,
      category: 'Working Capital',
      difficulty: 'medium'
    },
    {
      id: 'fa6',
      question: 'What does P/E ratio measure?',
      options: ['Profit to Expense ratio', 'Price to Earnings ratio', 'Performance to Expectation ratio', 'Product to Equity ratio'],
      correctAnswer: 1,
      category: 'Valuation Ratios',
      difficulty: 'easy'
    },
    {
      id: 'fa7',
      question: 'In DCF analysis, what does the discount rate represent?',
      options: ['Sales discount rate', 'Required rate of return', 'Tax rate', 'Inflation rate'],
      correctAnswer: 1,
      category: 'Valuation',
      difficulty: 'medium'
    },
    {
      id: 'fa8',
      question: 'What is beta in finance?',
      options: ['Second version of financial model', 'Measure of systematic risk', 'Type of bond', 'Financial ratio'],
      correctAnswer: 1,
      category: 'Risk Management',
      difficulty: 'medium'
    },
    {
      id: 'fa9',
      question: 'What are the three main financial statements?',
      options: ['Income Statement, Balance Sheet, Cash Flow Statement', 'Profit & Loss, Assets, Liabilities', 'Revenue, Expenses, Equity', 'Budget, Forecast, Actual'],
      correctAnswer: 0,
      category: 'Financial Statements',
      difficulty: 'easy'
    },
    {
      id: 'fa10',
      question: 'What does IRR stand for?',
      options: ['Interest Rate Return', 'Internal Rate of Return', 'Investment Risk Ratio', 'Income Recognition Rule'],
      correctAnswer: 1,
      category: 'Investment Analysis',
      difficulty: 'easy'
    },
    {
      id: 'fa11',
      question: 'What is the debt-to-equity ratio?',
      options: ['Total debt divided by total equity', 'Total equity divided by total debt', 'Total assets divided by total debt', 'Total debt divided by total assets'],
      correctAnswer: 0,
      category: 'Leverage Ratios',
      difficulty: 'medium'
    },
    {
      id: 'fa12',
      question: 'What is the current ratio?',
      options: ['Current assets / Current liabilities', 'Current liabilities / Current assets', 'Current year / Previous year', 'Net income / Current assets'],
      correctAnswer: 0,
      category: 'Liquidity Ratios',
      difficulty: 'medium'
    },
    {
      id: 'fa13',
      question: 'What is WACC?',
      options: ['Weighted Average Cost of Capital', 'Working Assets Cost of Capital', 'Weighted Assets Cost of Capital', 'Working Average Cost of Capital'],
      correctAnswer: 0,
      category: 'Cost of Capital',
      difficulty: 'hard'
    },
    {
      id: 'fa14',
      question: 'What is variance analysis?',
      options: ['Analysis of different investments', 'Comparison of actual vs budgeted performance', 'Risk assessment technique', 'Market analysis method'],
      correctAnswer: 1,
      category: 'Budgeting',
      difficulty: 'medium'
    },
    {
      id: 'fa15',
      question: 'What is the difference between FIFO and LIFO?',
      options: ['No difference', 'FIFO: First In First Out, LIFO: Last In First Out', 'LIFO: First In First Out, FIFO: Last In First Out', 'Both are depreciation methods'],
      correctAnswer: 1,
      category: 'Inventory Accounting',
      difficulty: 'medium'
    },
    {
      id: 'fa16',
      question: 'What is sensitivity analysis?',
      options: ['Analysis of employee sensitivity', 'Testing how changes in variables affect outcomes', 'Customer sensitivity analysis', 'Market sensitivity research'],
      correctAnswer: 1,
      category: 'Financial Modeling',
      difficulty: 'hard'
    },
    {
      id: 'fa17',
      question: 'What is the quick ratio?',
      options: ['Current assets / Current liabilities', '(Current assets - Inventory) / Current liabilities', 'Cash / Current liabilities', 'Total assets / Total liabilities'],
      correctAnswer: 1,
      category: 'Liquidity Ratios',
      difficulty: 'hard'
    },
    {
      id: 'fa18',
      question: 'What is goodwill in accounting?',
      options: ['Positive company reputation', 'Intangible asset representing excess purchase price', 'Customer satisfaction measure', 'Employee morale metric'],
      correctAnswer: 1,
      category: 'Intangible Assets',
      difficulty: 'medium'
    },
    {
      id: 'fa19',
      question: 'What is the break-even point?',
      options: ['Maximum profit point', 'Point where total revenue equals total costs', 'Point of maximum sales', 'Point of minimum costs'],
      correctAnswer: 1,
      category: 'Cost Analysis',
      difficulty: 'easy'
    },
    {
      id: 'fa20',
      question: 'What is the difference between cash flow and profit?',
      options: ['No difference', 'Cash flow is actual money movement, profit is accounting measure', 'Profit is actual money movement, cash flow is accounting measure', 'Both measure the same thing'],
      correctAnswer: 1,
      category: 'Financial Concepts',
      difficulty: 'medium'
    }
  ]
};

export function QuizGenerator({ onQuizGenerated }: QuizGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const professionOptions = Object.keys(professionQuestions);

  const handleGenerate = async () => {
    if (!selectedProfession) return;

    setIsGenerating(true);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const allQuestions = professionQuestions[selectedProfession];
      
      // Filter by difficulty if not 'all'
      let filteredQuestions = allQuestions;
      if (difficulty !== 'medium') {
        filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
      }
      
      // If we don't have enough questions of the selected difficulty, use all questions
      if (filteredQuestions.length < numberOfQuestions) {
        filteredQuestions = allQuestions;
      }
      
      // Randomly select questions
      const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, numberOfQuestions);
      
      onQuizGenerated(selectedQuestions);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          Career Skills Quiz Generator
        </CardTitle>
        <CardDescription>
          Select your profession and test your knowledge with curated questions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profession">Choose Your Profession</Label>
            <Select value={selectedProfession} onValueChange={setSelectedProfession}>
              <SelectTrigger>
                <SelectValue placeholder="Select a profession..." />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(professionQuestions).map((profession) => (
                  <SelectItem key={profession} value={profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questions">Number of Questions</Label>
              <Select value={numberOfQuestions.toString()} onValueChange={(value) => setNumberOfQuestions(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleGenerate}
          disabled={!selectedProfession || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Quiz
            </>
          )}
        </Button>

        {selectedProfession && (
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <strong>Ready to test your {selectedProfession} skills!</strong> We have 20 curated questions covering various aspects of this profession.
          </div>
        )}
      </CardContent>
    </Card>
  );
}