import { IUnit } from 'app/shared/model/unit.model';

export interface IGrammar {
  id?: number;
  title?: string;
  contentMarkdown?: string;
  exampleUsage?: string | null;
  orderIndex?: number;
  unit?: IUnit;
}

export const defaultValue: Readonly<IGrammar> = {
  title: '',
  contentMarkdown: '',
  exampleUsage: '',
  orderIndex: 0,
};
