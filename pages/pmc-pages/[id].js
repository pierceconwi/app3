import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { getAllIds, getData } from '../../lib/data';
import { getSortedList } from '../../lib/data';
import { getSortedList2 } from '../../lib/data';
import Layout from '../../components/layout.js';
import $ from 'jquery';

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
export default function Entry( { itemData, firstData, secondData } ) {
    // find friend value (corresponds to otherpeople.json) for current person selected in people.json and bind it to variable
    const abc1 = itemData.friends;
    console.log(abc1);
    return (
        <main class="card col-6">
            <div class="card-body">
                <h5 class="card-title">{itemData.name}</h5>
                <a href={'mailto:'+itemData.email} class="card-link">{itemData.email}</a>
            </div>
                    <a class="btn btn-primary mt-3" href='../'>Back to Home</a>
            <div className="list-group col-6">
            <p>Associates:</p>
            {/* check for friends within people.json and map related data */}
                {itemData.friends.map(
                        ({ id, name }) => {
                            <Link key={id} href={'/${id}'}>
                                <a className="list-group-item list-group-item-action">{name}</a>
                            </Link>
                        }
                    )
                }
            </div>
            </main>
    );
}