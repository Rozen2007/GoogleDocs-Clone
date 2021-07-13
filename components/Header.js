import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";
import { useEffect } from "react";

function Header() {
  const [session] = useSession();

  return (
    <div className="flex items-center sticky top-0 z-50 px-4 py-2 shadow-md bg-white w-full">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="md:inline-flex border-0"
        style={{ width: "3.4rem", height: "3.4rem" }}
      >
        <Icon name="menu" size="3xl" />
      </Button>

      <Icon name="description" size="5xl" color="blue" />

      <h1 className="md:inline-flex ml-3 text-gray-700 text-xl">Docs</h1>

      <div className="flex flex-grow items-center mx-5 p-5 py-2 bg-gray-100 rounded-md md:mx-20 focus-within:text-gray-600 focus-within:shadow-md">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow focus:outline-none bg-transparent text-gray-800 ml-2"
        />
      </div>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="ml-5 md:ml-20 h-20 w-20 border-0"
        style={{ width: "3.1rem", height: "3.1rem" }}
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>
      <img
        onClick={signOut}
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src={session?.user?.image}
        alt=""
      />
    </div>
  );
}

export default Header;
