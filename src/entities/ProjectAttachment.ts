export interface ProjectAttachment {
  id?: number;
  file?: string | FormData;
  file_name?: string;
  file_extension?: string;
  project?: number;
}
