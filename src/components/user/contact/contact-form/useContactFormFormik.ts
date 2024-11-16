import { FormikHelpers, useFormik } from "formik";
import { toast } from "../../../../helpers/functions/swal";
import { sendMessage } from "../../../../api/contact-service";
import { contactFormValidationSchema } from "../../../../helpers/validationSchemas";
import { Message } from "../../../../entities/Message";
import { handleAxiosError } from "../../../../helpers/functions/handleAxiosError";

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
    values: Message,
    { resetForm }: FormikHelpers<Message>
  ) => {
    setLoading(true);

    try {
      await sendMessage(values);
      toast("Ihre Nachricht wurde erfolgreich gesendet.", "success");
      resetForm();
    } catch (err) {
      const { message, type } = handleAxiosError(err);
      toast(message, type);
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
