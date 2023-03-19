import Head from "next/head";

const Meta = ({ title, keyword, desc }) => {
  return (
    <div>
      <Head>
        <title>
          {title} || Inscribe Bitcoin and Litecoin digital artefacts with ease
        </title>
        <link rel="icon" href="/favicon-new.ico" />
        <meta name="description" content={desc} />
        <meta name="keyword" content={keyword} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dhaa4hufy/image/upload/v1679216071/Screenshot_2023-03-19_at_2.24.08_PM_w7hrpe.png"
        />
        <meta
          name="twitter:title"
          content="OrdiNFT - Inscribe Bitcoin and Litecoin digital artefacts with ease"
        />
        <meta name="twitter:creator" content="@ordinft" />
        <meta name="twitter:site" content="@ordinft" />
        <meta
          name="twitter:description"
          content="Use our service to Inscribe NFTs on Bitcoin and Litecoin blockchain with ease. Create your account now and manage your insciption orders and payments."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dhaa4hufy/image/upload/v1679216071/Screenshot_2023-03-19_at_2.24.08_PM_w7hrpe.png"
        />
        <meta
          property="og:title"
          content="OrdiNFT - Inscribe Bitcoin and Litecoin digital artefacts with ease"
        />
        <meta
          property="og:description"
          content="Use our service to Inscribe NFTs on Bitcoin and Litecoin blockchain with ease. Create your account now and manage your insciption orders and payments."
        />
      </Head>
    </div>
  );
};

Meta.defaultProps = {
  title: "OrdiNFT || ",
  keyword:
    "bitcoin, blockchain, crypto, crypto collectibles, crypto makretplace, cryptocurrency, digital items, market, nft, nft marketplace, nft next js, NFT react, non-fungible tokens, virtual asset, wallet",
  desc: "The world's first bitcoin and litecoin inscription service with multiple payment processor.",
};

export default Meta;
