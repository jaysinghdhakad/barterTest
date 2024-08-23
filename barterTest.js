const axios = require("axios")
require("dotenv").config();

const main = async () => {
    const start = performance.now()
    const requestPayload0 = {
        'amount': "100000000000000000",
        'target': "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
        'source': "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    }

    const response0 = await axios({
        method: "post",
        url: "https://velvet.base.barterswap.xyz/getSwapRoute",
        data: requestPayload0,
        headers: {
            "Authorization": process.env.password,

        }
    })

    console.log(response0.data)
    const requestPayload =
    {
        'recipient': "0x8941516DbF170712458758FBE244D9Fd73C81B7C",
        'amount': "100000000000000000",
        'target': "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
        'source': "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        'targetTokenMinReturn': `${Math.ceil((response0.data.outputWithGasAmount/100)*99)}`,
        'deadline': `${Math.floor(Date.now() / 1000 + 300)}`
    }

    const response = await axios({
        method: "post",
        url: "https://velvet.base.barterswap.xyz/swap",
        data: requestPayload,
        headers: {
            "Authorization": process.env.password,

        }
    }

    )
    console.log("*************************************************************************")
    console.log(response.data)
    const end = performance.now()

    console.log("total_time:",end-start)
}

main()