import { unstable_cache } from "next/cache";

const childFunction = unstable_cache(
  async () => {
    console.log("child function has been called");
    return "some string";
  },
  ["child-function"],
  {
    revalidate: 3600,
  }
);

const parentFunction = unstable_cache(
  async () => {
    console.log("parent funciton ahs been called");
    const data1 = await childFunction();
    const data2 = await childFunction();

    return [data1, data2];
  },
  ["parent-function"],
  {
    revalidate: 3600,
  }
);

export default async function Home() {
  const data = await parentFunction();
  return <main>{JSON.stringify(data)}</main>;
}
