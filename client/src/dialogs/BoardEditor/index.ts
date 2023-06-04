import * as Yup from "yup";
import BoardEditorForm from "./BoardEditorForm";

export const validationSchema = Yup.object({
  name: Yup.string().max(25, "board name is too long").required("field is required"),
  description: Yup.string().max(400, "description is too long"),
});

export type submitType = "Update" | "Create";

export interface BoardEditorProps {
  boardId?: string;
  initialValues?: {
    name: string;
    description: string;
    estimatedTime: string; // Thêm trường estimatedTime với kiểu dữ liệu là number

  };
}

export interface BoardEditorFormProps {
  boardId?: string;
  submitType: submitType;
}

export interface FormValues {
  name: string;
  description: string;
  estimatedTime: string; // Thêm trường estimatedTime với kiểu dữ liệu là number

}

export default BoardEditorForm;
