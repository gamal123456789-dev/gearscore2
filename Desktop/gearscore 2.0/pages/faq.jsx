import Head from "next/head";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Gearscore - Frequently Asked Questions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    ...
</html>
` }} />
    </>
  );
}
