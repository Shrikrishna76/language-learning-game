import { Language } from "./language";
import { User } from "./user";

export interface Progress {
  email: string;
  user: User;
  languagename: Language;
  totalScore: number;
  totalPossibleScore: number;
  timestamp: Date;
}
