import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getSortedList } from '../lib/data';
import { getSortedList2 } from '../lib/data';
import Link from 'next/link';
import Layout from '../components/layout.js';

export async function getStaticProps() {
  const firstData = getSortedList();
  const secondData = getSortedList2();
  return {
    props: {
      firstData,
      secondData
    }
  };
}

export default function Home({ firstData, secondData }) {
  return (
    <Layout>
    <h1>People Food</h1>
    <p>version 0.5.5</p>
    <p>by Pierce Conwi</p>
    <div>
      {firstData.map(({ id, name }) => (
        <Link key={id} href={`/pmc-pages/${id}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
        </Link>
      ))}
    </div>
    </Layout>
  )
}