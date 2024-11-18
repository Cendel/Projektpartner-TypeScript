import { useEffect, useState } from "react";
import { getUser } from "./api/user-service";
import { encryptedLocalStorage } from "./helpers/functions/encrypt-storage";
import LoadingPage from "./pages/common/LoadingPage";
import CustomRoutes from "./router/CustomRoutes";
import { useAppDispatch } from "./store/hooks";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const loadData = async () => {
    try {
      const token = encryptedLocalStorage.getItem("token");
      if (token) {
        const resp = await getUser();
        dispatch(loginSuccess(resp.data));
      }
    } catch (err) {
      dispatch(loginFailed());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return <div>{loading ? <LoadingPage /> : <CustomRoutes />}</div>;
};

export default App;
