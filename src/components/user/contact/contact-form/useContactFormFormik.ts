import { FormikHelpers, useFormik } from "formik";
import { toast } from "../../../../helpers/functions/swal";
import { sendMessage } from "../../../../api/contact-service";
import { contactFormValidationSchema } from "../../../../helpers/validationSchemas";
import { handleAxiosError } from "../../../../helpers/functions/handleAxiosError";
import MessageRequest from "../../../../entities/MessageRequest";

const useContactFormFormik = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  senderId: number
) => {
  const initialValues = {
    sender: senderId,
    title: "",
    text: "",
  };

  const onSubmit = async (
    values: MessageRequest,
    { resetForm }: FormikHelpers<MessageRequest>
  ) => {
    setLoading(true);

    try {
      await sendMessage(values);
      toast("Ihre Nachricht wurde erfolgreich gesendet.", "success");
      resetForm();
    } catch (err) {
      const { message } = handleAxiosError(err);
      toast(message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: contactFormValidationSchema,
    onSubmit,
  });
  return formik;
};

export default useContactFormFormik;
