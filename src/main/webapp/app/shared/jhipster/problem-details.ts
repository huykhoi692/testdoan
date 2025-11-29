export type FieldErrorVM = {
  objectName: string;
  field: string;
  message: string;
};

export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  message: string;
  params: string;
  fieldErrors?: FieldErrorVM[];
};

export const isProblemWithMessage = (data: any): data is ProblemDetails => {
  return data && typeof data === 'object' && 'message' in data;
};
