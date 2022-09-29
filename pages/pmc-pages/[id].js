import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { getAllIds, getData, getSortedList, getSortedList2 } from '../../lib/data';
import Layout from '../../components/layout.js';

// create an instance of the getStaticProps() to return data for one person
export async function getStaticProps({ params }) {
    const firstData = getSortedList();
    const secondData = getSortedList2();
    const itemData = await getData(params.id);
    return {
        props: {
            itemData,
            firstData,
            secondData
        }
    };
}

// create instance of getStaticPaths() to report to next.js all possible dynamic urls
export async function getStaticPaths() {
    const paths = getAllIds();
    return {
        paths,
        fallback: false
    };
}

// make a React.js component to display all details about a person when a dynamic route matches
export default function Entry( { itemData, secondData, firstData } ) {
    return (
        <main class="card col-6">
            <div class="card-body">
                <h5 class="card-title">{itemData.name}</h5>
                <a href={'mailto:'+itemData.email} class="card-link">{itemData.email}</a>
                <p>Best friend: {secondData[itemData.id-1].friend_name}</p>
                <p class="text-center">---</p>

                {/* use map method to render associated data from otherpeople.json */}
                <h6>Attempt To Map Best Friend:</h6>
                <br></br>
         
                { 
                    secondData.map(({ friend_name }) => (
                        <p>{friend_name}</p>
                    ))
                    }
        
            </div>
                    <a class="btn btn-primary mt-3" href='../'>Back to Home</a>
            </main>
    );
}