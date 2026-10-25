export type Category = 'R16' | 'R8' | 'R4';

export type Runner = {
  id: string;
  name: string;
  category: Category;
  photo: string;
  finishTime?: string;
  reflection: string;
  leg?: string;
};
