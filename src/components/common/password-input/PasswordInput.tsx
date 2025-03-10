import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  error: string;
}
const PasswordInput = (props: Props) => {
  const [type, setType] = useState("password");

  const handleType = () => {
    const newType = type === "password" ? "text" : "password";
    setType(newType);
  };

  return (
    <InputGroup className="">
      <Form.Control type={type} {...props} />
      <InputGroup.Text onClick={handleType}>
        {type === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
      </InputGroup.Text>
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
