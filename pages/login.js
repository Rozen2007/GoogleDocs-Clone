import Button from "@material-tailwind/react/Button";
import Image from "next/image";

import { providers, signIn, getSession, csrfToken } from "next-auth/client";

function signin({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="https://links.papareact.com/1ui"
        width={550}
        height={300}
        objectFit="contain"
      />
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <Button
              onClick={() => signIn(provider.id)}
              className="w-44 mt-10"
              color="blue"
              buttonType="filled"
              ripple="light"
            >
              Sign in
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}
