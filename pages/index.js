import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import firebase from "firebase";
import DocumentRow from "../components/DocumentRow";

import { getSession, useSession } from "next-auth/client";
import { useState } from "react";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {
  const [session] = useSession(); // Fonctionne grâce au <Provider> dans "_app.js"
  if (!session) return <Login />;

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollection(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  function createDocument() {
    if (!input || input.toString().trim() === "") return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    setShowModal(false);
  }

  function deleteDocument(id) {
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id)
      .delete();
  }

  const modal = (
    <Modal active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline-none"
          placeholder="Enter name of the document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {modal}

      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between py-6">
            <h2 className="text-gray-700 text-lg mx-2">Start a new document</h2>

            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0 rounded-full"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700 transition-colors duration-300"
              onClick={() => setShowModal(true)}
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>

            <p className="ml-2 mt-2 font-semibold text-sm text-gray-600">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px:10 md:px-0">
        <div className="max-w-3xl mx-auto pt-8 text-gray-700">
          <div className="flex items-center justify-between pb-5 pr-5">
            <h2 className="font-medium flex-grow px-5">My Documents</h2>
            <p className="mr-4"> Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-gray-700">
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
              onDelete={deleteDocument}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
