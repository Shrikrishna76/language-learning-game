export class Questions {
id: number;
  text: string;
  options: string[];
  correctOption: string;
  difficulty: number;
  marks: number;

  constructor(id: number, text: string, options: string[], correctOption: string, difficulty: number, marks: number) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctOption = correctOption;
    this.difficulty = difficulty;
    this.marks = marks;
  }
}
