import { Field, Formik, Form } from "formik";
import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import {
  Flex,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  VStack,
} from "@chakra-ui/react";

export const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const { signInGoogle, signed } = useContext(AuthGoogleContext);

  if (loading) {
    return <p>carregando...</p>;
  }
  if (user) {
    return <Navigate to="/Home" />;
  }

  async function handleLoginFromGoogle() {
    await signInGoogle();
  }

  if (!signed) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Box
          p={6}
          color={"white"}
          rounded="20px"
          w={"lg"}
          bg="var(--semi-dark-blue)"
        >
          <Heading mb={6} textAlign="left">
            Login
          </Heading>
          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            onSubmit={(values) => {
              signInWithEmailAndPassword(values.email, values.password);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="email">E-mail</FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <Field
                      as={Input}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="********************"
                    />
                  </FormControl>
                  <a href="#">Esqueceu sua senha ?</a>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "var(--red)" }}
                    color={"white"}
                    width="full"
                    size={"lg"}
                  >
                    Entrar
                  </Button>
                  <div className="footer">
                    <p>Você não tem uma conta?</p>
                    <Link to="/register">Crie a sua conta aqui</Link>
                  </div>
                  <Button size={"lg"} onClick={handleLoginFromGoogle}>
                    Logar com o Google
                  </Button>
                  ;
                </VStack>
              </Form>
            )}
          </Formik>
          {error && <p>{error.message}</p>}
        </Box>
      </Flex>
    );
  } else {
    return <Navigate to="/Home" />;
  }
};
