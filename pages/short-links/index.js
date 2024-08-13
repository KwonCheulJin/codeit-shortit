import Button from '@/components/Button';
import Link from '@/components/Link';
import ShortLinkList from '@/components/ShortLinkList';
import dbConnect from '@/db/dbConnect';
import ShortLink from '@/db/models/ShortLink';
import axios from '@/lib/axios';
import styles from '@/styles/ShortLinkListPage.module.css';
import Head from 'next/head';
import { useState } from 'react';

export async function getServerSideProps() {
  await dbConnect();
  const shortLinks = await ShortLink.find();

  return {
    props: {
      shortLinks: JSON.parse(JSON.stringify(shortLinks)),
    },
  };
}
export default function ShortLinkListPage({ shortLinks: initialShortLinks }) {
  const [shortLinks, setShortLinks] = useState(initialShortLinks);

  async function handleDelete(id) {
    await axios.delete(`/short-links/${id}`);
    setShortLinks(prev => prev.filter(shortLink => shortLink._id !== id));
  }
  return (
    <>
      <Head>
        <title>주소 줄이기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>주소 줄이기</h1>
          <Button as={Link} href="/short-links/new">
            새로 만들기
          </Button>
        </header>
        <ShortLinkList items={shortLinks} onDelete={handleDelete} />
      </div>
    </>
  );
}
