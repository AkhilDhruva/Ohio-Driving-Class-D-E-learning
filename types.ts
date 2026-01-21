
export interface Package {
  id: string;
  name: string;
  price: number;
  lessons: number;
  features: string[];
  recommended?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface RoadSign {
  id: string;
  name: string;
  description: string;
  category: 'Regulatory' | 'Warning' | 'Guide';
  svgPath: string;
  color: string;
  shape: 'octagon' | 'triangle' | 'diamond' | 'rectangle' | 'shield';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
}

export interface DrivingScenario {
  id: string;
  context: string;
  imageDescription: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}
