import { readFileSync } from 'fs';
import { sdk } from './helpers.js';

async function main() {
    const bundleModuleAddress = '0x8E392C3F25c0dd3ACf742A325aFECA18B4BCF761';
    const bundleModule = sdk.getBundleModule(bundleModuleAddress);

    const packModuleAddress = '0x870f469a820d15348617821c640c67DEf0BF45dc'; // your pack module address
    const packModule = sdk.getPackModule(packModuleAddress);

    console.log('Getting all NFTs from bundle...');
    const nftsInBundle = await bundleModule.getAll();

    console.log('NFTs in bundle:');
    console.log(nftsInBundle);

    console.log('Creating a pack containing the NFTs from bundle...');
    const created = await packModule.create({
        assetContract: bundleModuleAddress,
        metadata: {
            name: 'Fancy Cars Pack!',
            image: readFileSync('./assets/fancy-cars.png'),
        },
        assets: nftsInBundle.map(nft => ({
            tokenId: nft.metadata.id,
            amount: nft.supply,
        })),
    });

    console.log('Pack created!')
    console.log(created);
}

try {
    await main();
} catch (error) {
    console.error("Error minting the NFTs", error);
    process.exit(1);
}
