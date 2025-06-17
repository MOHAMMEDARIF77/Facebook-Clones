// pages/index.js
import Head from "next/head";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import SideBar from "@/components/SideBar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";

export default function Home({ posts }) {
  const { data: clientSession, status: nextAuthStatus } = useSession();

  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setIsAuthReady(true); 
    });

    return () => unsubscribe();
  }, []);

  const isLoading = nextAuthStatus === "loading" || !isAuthReady;
  const isLoggedIn = clientSession || firebaseUser;

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!isLoggedIn) return <Login />;

  return (
      <div className="bg-gray-100 h-screen overflow-hidden">
      <Head>
        <title>Facebook Clone</title>
        <meta
          name="description"
          content="A sample Next.js app with Geist fonts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />

      <main className="flex fle-col md:flex-row">
        {/* Sidebar */}
        <SideBar/>
        {/* Feed */}
        <Feed posts={posts}/>
        {/* Widget */}
        <Widgets/>
      </main>
    </div>
  );
}

// Keep server-side rendering for posts
export async function getServerSideProps() {
  const postsRef = db.collection("posts").orderBy("timestamp", "desc");
  const postsSnap = await postsRef.get();

  const posts = postsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate().toISOString() || null,
  }));

  return {
    props: {
      posts,
    },
  };
}
