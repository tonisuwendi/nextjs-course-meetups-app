import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetailPage = ({ meetupData }) => {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://tonsuwendi:kYAaxlRMq96AnPvx@cluster0-shard-00-00.xscsd.mongodb.net:27017,cluster0-shard-00-01.xscsd.mongodb.net:27017,cluster0-shard-00-02.xscsd.mongodb.net:27017/meetups?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  const client = await MongoClient.connect(
    "mongodb://tonsuwendi:kYAaxlRMq96AnPvx@cluster0-shard-00-00.xscsd.mongodb.net:27017,cluster0-shard-00-01.xscsd.mongodb.net:27017,cluster0-shard-00-02.xscsd.mongodb.net:27017/meetups?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetup = await meetupsCollections.findOne({ _id: ObjectId(meetupId) });

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetailPage;
