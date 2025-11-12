export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  stars?: number;
  category: 'web' | 'ai' | 'mobile' | 'tool' | 'game';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  trending: boolean;
  popular: boolean;
  lastUpdated: string;
  score?: number;
}

export type SkillCategory = 'frontend' | 'backend' | 'ai' | 'tool' | 'soft';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number;
  experience: number;
  projects: number;
  trend: 'up' | 'down' | 'stable';
  lastUsed: string;
  relatedSkills: string[];
}

export interface SkillAnalysis {
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  learningPath: string[];
  careerSuggestions: string[];
}

export interface GeneratedTag {
  tag: string;
  relevance: number;
  category: 'technical' | 'trending' | 'audience' | 'seo';
  explanation: string;
}

export interface CodeIssue {
  line: number;
  type: 'error' | 'warning' | 'suggestion';
  message: string;
  suggestion: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export type LanguageKey = 'javascript' | 'typescript' | 'python' | 'react';
