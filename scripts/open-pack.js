import { sdk } from "./helpers.js";

async function main() {
    const packModuleAddress = '0x870f469a820d15348617821c640c67DEf0BF45dc'; // your pack module address
    const packModule = sdk.getPackModule(packModuleAddress);

    console.log('Opening the pack...');
    const opened = await packModule.open('0');
    console.log('Opened the pack!');
    console.log(opened);
}

try {
    await main();
} catch (error) {
    console.error("Error opening the pack", error);
    process.exit(1);
}
